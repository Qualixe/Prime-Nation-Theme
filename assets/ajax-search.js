$(function () {
  const $input = $('#ajax-search-input');
  const $box = $('.search-results-box');
  const $results = $('.search-results');
  const $loading = $('.search-loading');
  const $viewAll = $('.search-view-all');

  let debounce;

  $('.search-close-btn, .search-bar-window-close-btn').on('click', function () {
    $box.removeClass('active');
    $input.val('');
  });

  $input.on('input', function () {
    clearTimeout(debounce);

    debounce = setTimeout(() => {
      const query = $.trim($input.val());

      if (query.length < 2) {
        $box.removeClass('active');
        return;
      }

      $box.addClass('active');
      $loading.show();
      $results.empty();

      $.getJSON('/search/suggest.json', {
        q: query,
        'resources[type]': 'product',
        'resources[limit]': 6,
      }).done((data) => {
        $loading.hide();

        const products = data?.resources?.results?.products || [];

        if (!products.length) {
          $results.html('<p style="padding:12px">No products found</p>');
          $viewAll.hide();
          return;
        }

        $results.html(
          products
            .map(
              (p) => `
          <a href="${p.url}" class="search-result-item">
            <div class="search-result-image">
              ${p.featured_image?.url ? `<img src="${p.featured_image.url}&width=80">` : ''}
            </div>
            <div>
              <p class="search-result-title">${highlight(p.title, query)}</p>
              <div class="search-result-price">TK${formatMoney(p.price_min)}</div>
            </div>
          </a>
        `
            )
            .join('')
        );

        $viewAll.attr('href', `/search?q=${encodeURIComponent(query)}&type=product`).show();
      });
    }, 300);
  });

  function highlight(text, query) {
    const r = new RegExp(`(${query})`, 'gi');
    return text.replace(r, '<mark>$1</mark>');
  }

  function formatMoney(cents) {
    return Shopify?.formatMoney ? Shopify.formatMoney(cents) : cents;
  }
});