  function collectionPage() {
    return {
      products: [],
      filteredProducts: [],
      filters: {
        brands: [],
        sizes: [],
        colors: [],
        priceRange: null,
        inStoreOnly: false,
        sortBy: 'featured'
      },
      gridView: 4,
      loading: true,
      
      init() {
        this.loadFiltersFromURL();
        this.loadProducts();
      },
      
      loadFiltersFromURL() {
        const params = new URLSearchParams(window.location.search);
        
        // Load brands
        if (params.has('brands')) {
          this.filters.brands = params.get('brands').split(',');
        }
        
        // Load sizes
        if (params.has('sizes')) {
          this.filters.sizes = params.get('sizes').split(',');
        }
        
        // Load colors
        if (params.has('colors')) {
          this.filters.colors = params.get('colors').split(',');
        }
        
        // Load price range
        if (params.has('price_min')) {
          const min = parseFloat(params.get('price_min'));
          const max = params.has('price_max') ? parseFloat(params.get('price_max')) : null;
          this.filters.priceRange = [min, max];
        }
        
        // Load in-store only
        if (params.has('in_store')) {
          this.filters.inStoreOnly = params.get('in_store') === 'true';
        }
        
        // Load sort
        if (params.has('sort_by')) {
          this.filters.sortBy = params.get('sort_by');
        }
        
        // Load grid view
        if (params.has('grid')) {
          this.gridView = parseInt(params.get('grid'));
        }
      },
      
      updateURL() {
        const params = new URLSearchParams();
        
        // Add brands
        if (this.filters.brands.length > 0) {
          params.set('brands', this.filters.brands.join(','));
        }
        
        // Add sizes
        if (this.filters.sizes.length > 0) {
          params.set('sizes', this.filters.sizes.join(','));
        }
        
        // Add colors
        if (this.filters.colors.length > 0) {
          params.set('colors', this.filters.colors.join(','));
        }
        
        // Add price range
        if (this.filters.priceRange) {
          params.set('price_min', this.filters.priceRange[0]);
          if (this.filters.priceRange[1]) {
            params.set('price_max', this.filters.priceRange[1]);
          }
        }
        
        // Add in-store only
        if (this.filters.inStoreOnly) {
          params.set('in_store', 'true');
        }
        
        // Add sort
        if (this.filters.sortBy !== 'featured') {
          params.set('sort_by', this.filters.sortBy);
        }
        
        // Add grid view
        if (this.gridView !== 4) {
          params.set('grid', this.gridView);
        }
        
        // Update URL without page reload
        const newURL = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
        window.history.pushState({}, '', newURL);
      },
      
      formatMoney(cents) {
        if (typeof cents === 'string') cents = parseFloat(cents);
        const value = (cents / 100).toFixed(2);
        // Use Shopify's money format - handle both {{amount}} and {{ amount }}
        let format = '{{ shop.money_format }}';
        // Replace the placeholder with the actual value
        return format.replace(/\{\{\s*amount\s*\}\}/g, value);
      },
      
      getImageUrl(product) {
        if (product.featured_image) {
          // If it's already a full URL, return it
          if (product.featured_image.startsWith('http')) {
            return product.featured_image;
          }
          // Otherwise, it might be a CDN path
          return product.featured_image;
        }
        // Fallback to featured_media
        return product.featured_media?.preview_image?.src || '';
      },
      
      getHoverImageUrl(product) {
        if (product.images && product.images.length > 1) {
          const img = product.images[1];
          if (typeof img === 'string') {
            return img.startsWith('http') ? img : img;
          }
          return img?.src || img;
        }
        return null;
      },
      
      loadProducts() {
        this.products = [
          {% for product in current_collection.products %}
          {
            id: {{ product.id }},
            title: {{ product.title | json }},
            handle: '{{ product.handle }}',
            url: '{{ product.url }}',
            vendor: {{ product.vendor | json }},
            price: {{ product.price }},
            price_max: {{ product.price_max }},
            price_min: {{ product.price_min }},
            compare_at_price: {{ product.compare_at_price | default: 0 }},
            compare_at_price_max: {{ product.compare_at_price_max | default: 0 }},
            compare_at_price_min: {{ product.compare_at_price_min | default: 0 }},
            available: {{ product.available }},
            featured_image: '{{ product.featured_image | image_url: width: 800 }}',
            images: [
              {% for image in product.images limit: 2 %}
                '{{ image | image_url: width: 800 }}'{% unless forloop.last %},{% endunless %}
              {% endfor %}
            ],
            variants: {{ product.variants | json }},
            created_at: '{{ product.created_at }}'
          }{% unless forloop.last %},{% endunless %}
          {% endfor %}
        ];
        this.filteredProducts = this.products;
        this.loading = false;
      },
      
      toggleFilter(type, value) {
        const index = this.filters[type].indexOf(value);
        if (index > -1) {
          this.filters[type].splice(index, 1);
        } else {
          this.filters[type].push(value);
        }
        this.applyFilters();
      },
      
      isFilterActive(type, value) {
        return this.filters[type].includes(value);
      },
      
      applyFilters() {
        let filtered = [...this.products];
        
        // Brand filter
        if (this.filters.brands.length > 0) {
          filtered = filtered.filter(p => 
            this.filters.brands.some(brand => 
              p.vendor.toLowerCase().includes(brand.toLowerCase())
            )
          );
        }
        
        // Size filter
        if (this.filters.sizes.length > 0) {
          filtered = filtered.filter(p =>
            p.variants.some(v =>
              this.filters.sizes.some(size =>
                v.option1?.toLowerCase() === size.toLowerCase() ||
                v.option2?.toLowerCase() === size.toLowerCase() ||
                v.option3?.toLowerCase() === size.toLowerCase()
              )
            )
          );
        }
        
        // Color filter
        if (this.filters.colors.length > 0) {
          filtered = filtered.filter(p =>
            p.variants.some(v =>
              this.filters.colors.some(color =>
                v.option1?.toLowerCase().includes(color) ||
                v.option2?.toLowerCase().includes(color) ||
                v.option3?.toLowerCase().includes(color)
              )
            )
          );
        }
        
        // Price filter
        if (this.filters.priceRange) {
          const [min, max] = this.filters.priceRange;
          filtered = filtered.filter(p => {
            const price = p.price / 100;
            return max ? (price >= min && price <= max) : (price >= min);
          });
        }
        
        // In-store availability
        if (this.filters.inStoreOnly) {
          filtered = filtered.filter(p => p.available);
        }
        
        // Sort
        this.sortProducts(filtered);
        
        this.filteredProducts = filtered;
        
        // Update URL with current filters
        this.updateURL();
      },
      
      sortProducts(products) {
        switch(this.filters.sortBy) {
          case 'best_selling':
            // Shopify doesn't provide sales data, so we'll keep original order
            break;
          case 'price_low_high':
            products.sort((a, b) => a.price - b.price);
            break;
          case 'price_high_low':
            products.sort((a, b) => b.price - a.price);
            break;
          case 'title_asc':
            products.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'title_desc':
            products.sort((a, b) => b.title.localeCompare(a.title));
            break;
          case 'created_desc':
            products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            break;
          case 'created_asc':
            products.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            break;
        }
      },
      
      setPriceRange(min, max = null) {
        this.filters.priceRange = [min, max];
        this.applyFilters();
      },
      
      clearPriceRange() {
        this.filters.priceRange = null;
        this.applyFilters();
      },
      
      setGridView(view) {
        this.gridView = view;
        this.updateURL();
      },
      
      get productCount() {
        return this.filteredProducts.length;
      }
    };
  }