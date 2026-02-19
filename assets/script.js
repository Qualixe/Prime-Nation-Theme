$(document).ready(function () {
  "use strict";
  // navbar js start ---
  $(window).on("load scroll", function () {
    var scrolling = $(this).scrollTop();
    if (scrolling > 10) {
      $(".navbar").addClass("nav-fixed");
    } else {
      $(".navbar").removeClass("nav-fixed");
    }
  });

  $(".ham-menu").click(function (event) {
    event.stopPropagation();
    $(".navbar-links-wrapper").toggleClass("active");
    $(".ham-menu").toggleClass("active");
    $(".navbar-links-inner").toggleClass("active");
    $("body").toggleClass("active");
  });

  $(".mobile-menu-close-window-btn").click(function (event) {
    event.stopPropagation();
    $(".navbar-links-wrapper").removeClass("active");
    $(".ham-menu").removeClass("active");
    $(".navbar-links-inner").removeClass("active");
    $("body").removeClass("active");
  });

  $(".search-bar-open-btn").click(function (event) {
    event.stopPropagation();
    $(".search-bar-overlay").addClass("active");
    $(".search-bar-close-window-btn").addClass("active");
    $("body").addClass("active");
  });

  $(".search-bar-close-window-btn").click(function (event) {
    event.stopPropagation();
    $(".search-bar-overlay").removeClass("active");
    $(this).removeClass("active");
    $("body").removeClass("active");
  });

  $(".search-close-btn").click(function (event) {
    event.stopPropagation();
    $(".search-bar-overlay").removeClass("active");
    $(".search-bar-close-window-btn").removeClass("active");
    $("body").removeClass("active");
  });

  // navbar js end ---

  // collection-grid js start---
  $(".grid2-btn").click(function (event) {
    event.stopPropagation();
    $(".collection-items").addClass("grid2");
    $(".collection-items").removeClass("grid3");
    $(".collection-items").removeClass("grid4");
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
  });

  $(".grid3-btn").click(function (event) {
    event.stopPropagation();
    $(".collection-items").addClass("grid3");
    $(".collection-items").removeClass("grid2");
    $(".collection-items").removeClass("grid4");
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
  });

  $(".grid4-btn").click(function (event) {
    event.stopPropagation();
    $(".collection-items").addClass("grid4");
    $(".collection-items").removeClass("grid2");
    $(".collection-items").removeClass("grid3");
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
  });
  // collection-grid js end---

  // --grid-tab js start--
  $(".grid-tab-btn").click(function () {
    $(this).parent().siblings(".tab-nav-item").removeClass("active");
    $(this).parent().addClass("active");
    $(".grid-tab-content-item").hide();
    var activeTab = $(this).attr("href");
    $(activeTab).fadeIn();
    return false;
  });
  // --grid-tab js end--

  // product-slider modal js start--
  $(".product-slider .swiper-wrapper").click(function (event) {
    event.stopPropagation();
    $(".product-slider-modal").addClass("active");
  });

  $(".product-slider-modal-close").click(function (event) {
    event.stopPropagation();
    $(".product-slider-modal").removeClass("active");
  });

  $(".product-slider-modal").click(function (event) {
    event.stopPropagation();
    $(".product-slider-modal").removeClass("active");
  });
  // product-slider modal js end--

  // size-chart-sidebar js start---
  $(".size-sidebar-btn").click(function (event) {
    event.stopPropagation();
    $(".size-chart-sidebar").addClass("active");
    $(".size-chart-sidebar-inner").addClass("active");
    $("body").addClass("active");
  });

  $(".size-chart-sidebar-close-window-btn").click(function (event) {
    event.stopPropagation();
    $(".size-chart-sidebar").removeClass("active");
    $(".size-chart-sidebar-inner").removeClass("active");
    $("body").removeClass("active");
  });

  $(".size-chart-close-btn").click(function (event) {
    event.stopPropagation();
    $(".size-chart-sidebar").removeClass("active");
    $(".size-chart-sidebar-inner").removeClass("active");
    $("body").removeClass("active");
  });
  // size-chart-sidebar js end---

  // product-details-modal js start--
  document.addEventListener("click", function (event) {
    const openBtn = event.target.closest(".product-details-modal-btn");
    const windowCloseBtn = event.target.closest(
      ".product-details-modal-window-close-btn"
    );
    const closeBtn = event.target.closest(".product-details-modal-close-btn");

    if (openBtn) {
      event.stopPropagation();
      const nextElement = openBtn.nextElementSibling;
      if (nextElement) nextElement.classList.add("active");
    }

    if (windowCloseBtn) {
      event.stopPropagation();
      const parent = windowCloseBtn.parentElement;
      if (parent) parent.classList.remove("active");
    }

    if (closeBtn) {
      event.stopPropagation();
      const grandParent = closeBtn.parentElement?.parentElement;
      if (grandParent) grandParent.classList.remove("active");
    }
  });
  // product-details-modal js end--

  // cart-sidebar js start---
  $(".side-cart-btn").click(function (event) {
    event.stopPropagation();
    $(".cart-sidebar").addClass("active");
    $("body").addClass("active");
  });

  $(".cart-sidebar-close-window-btn").click(function (event) {
    event.stopPropagation();
    $(".cart-sidebar").removeClass("active");
    $("body").removeClass("active");
  });

  $(".side-cart-close-btn").click(function (event) {
    event.stopPropagation();
    $(".cart-sidebar").removeClass("active");
    $("body").removeClass("active");
  });
  // cart-sidebar js end---

  // collection filter sidebar js start--
  $(".filter-open-btn").click(function (event) {
    event.stopPropagation();
    $(".collection-filter").addClass("active");
    $("body").addClass("active");
  });

  $(".filter-window-close-btn").click(function (event) {
    event.stopPropagation();
    $(".collection-filter").removeClass("active");
    $("body").removeClass("active");
  });

  $(".filter-close-btn").click(function (event) {
    event.stopPropagation();
    $(".collection-filter").removeClass("active");
    $("body").removeClass("active");
  });
  // collection filter sidebar js end--

  // **..collection filter-accordion js start..**
  $(".accordion-toggle-btn").on("click", function () {
    $(this).next().slideToggle();
    $(this).parent().toggleClass("active");
  });
  // **..collection filter-accordion js end..**

  // **..product-accordion js start..**
  $(".product-accordion-toggle-btn").on("click", function () {
    $(this).next().slideToggle();
    $(this).parent().toggleClass("active");
    $(this)
      .parent()
      .siblings()
      .removeClass("active")
      .find(".product-accordion-item-content")
      .slideUp();
  });
  // **..product-accordion js end..**

  // sticky-add-to-cart-section js start--
  $(window).on("load scroll", function () {
    var scrolling = $(this).scrollTop();
    if (scrolling > 1100) {
      $(".sticky-add-to-cart-section").addClass("fixed");
    } else {
      $(".sticky-add-to-cart-section").removeClass("fixed");
    }
  });
  // sticky-add-to-cart-section js end--

  // **..faq-accordion js start..**
  $(".faq-accordion-toggle-btn").on("click", function () {
    $(this).next().slideToggle();
    $(this).parent().toggleClass("active");
    $(this)
      .parent()
      .siblings()
      .removeClass("active")
      .find(".faq-accordion-item-content")
      .slideUp();
  });
  // **..faq-accordion js end..**

  // datepicker js start--
  $("#date").datepicker({
    showButtonPanel: true,
    showOtherMonths: true,
  });
  // datepicker js end--
});

// btn js ---
// primary btn---
$(function () {
  $(".primary-btn")
    .on("mouseenter", function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find("span").css({
        top: relY,
        left: relX,
      });
    })
    .on("mouseout", function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find("span").css({
        top: relY,
        left: relX,
      });
    });
});

// secondary btn--
$(function () {
  $(".secondary-btn")
    .on("mouseenter", function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find("span").css({
        top: relY,
        left: relX,
      });
    })
    .on("mouseout", function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find("span").css({
        top: relY,
        left: relX,
      });
    });
});
// btn js ---

// card-slider js start--
var swiper = new Swiper(".card-slider", {
  slidesPerView: 4,
  spaceBetween: 5,
  grabCursor: true,
  loop: false,
  navigation: {
    nextEl: ".card-slider-btn-next",
    prevEl: ".card-slider-btn-prev",
  },
  breakpoints: {
    // when window width is >= 1px
    1: {
      slidesPerView: 1.7,
    },
    // when window width is >= 430px
    576: {
      slidesPerView: 2.3,
    },
    // when window width is >= 767px
    768: {
      slidesPerView: 3.2,
    },
    // when window width is >= 767px
    993: {
      slidesPerView: 4,
    },
  },
});
// card-slider js end--

// product-slider js start---
var swiper = new Swiper(".product-slider-thumb", {
  direction: "vertical",
  loop: false,
  spaceBetween: 20,
  slidesPerView: 5,
  freeMode: true,
  mousewheel: true,
  breakpoints: {
    // when window width is >= 320px
    1: {
      direction: "horizontal",
      spaceBetween: 10,
      slidesPerView: 4,
    },
    // when window width is >= 576px
    576: {
      direction: "horizontal",
      spaceBetween: 20,
      slidesPerView: 5,
    },
    // when window width is >= 767px
    768: {
      direction: "vertical",
      spaceBetween: 20,
      slidesPerView: 5,
    },
    // when window width is >= 767px
    993: {
      direction: "vertical",
    },
  },
});
var swiper2 = new Swiper(".product-slider", {
  loop: true,
  // autoHeight: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".product-slider-pagination",
    clickable: true,
  },
  thumbs: {
    swiper: swiper,
  },
});
// product-slider js end---

// progesss-bar js start--
const progress = document.querySelector(".progress");
progress.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right,rgb(133 168 104) 0%,rgb(133 168 104) ${value}%,rgb(216, 216, 216) ${value}%)`;
});
// progesss-bar js end--
