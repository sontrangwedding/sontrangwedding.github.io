(function ($) {
  "use strict";

  setTimeout(function () {
    var boxHeightOne = $(".invitation-box.calendar-box").parent().height();
    var boxHeightTwo = $(".invitation-box.left").parent().height();
    $(".invitation-box").css("height", Math.max(boxHeightOne, boxHeightTwo));
  }, 300);

  /*------------------------------------------
        = ALL ESSENTIAL FUNCTIONS
    -------------------------------------------*/
  // Animated scroll specific section
  if ($("#scroll").length) {
    $("#scroll").on("click", function (e) {
      e.preventDefault();
      $("html,body").animate(
        { scrollTop: $(this.hash).offset().top },
        1000,
        "easeInOutExpo"
      );
      return false;
    });
  }

  // Toggle mobile navigation
  function toggleMobileNavigation() {
    var navbar = $(".navigation-holder");
    var openBtn = $(".navbar-header .open-btn");
    var closeBtn = $(".navigation-holder .close-navbar");
    var body = $(".page-wrapper");

    openBtn.on("click", function () {
      if (!navbar.hasClass("slideInn")) {
        navbar.addClass("slideInn");
      }
      return false;
    });

    closeBtn.on("click", function () {
      if (navbar.hasClass("slideInn")) {
        navbar.removeClass("slideInn");
      }
      return false;
    });
  }

  toggleMobileNavigation();

  // Function for toggle class for small menu
  function toggleClassForSmallNav() {
    var windowWidth = window.innerWidth;
    var mainNav = $("#navbar > ul");

    if (windowWidth <= 991) {
      mainNav.addClass("small-nav");
    } else {
      mainNav.removeClass("small-nav");
    }
  }

  toggleClassForSmallNav();

  // Function for small menu
  function smallNavFunctionality() {
    var windowWidth = window.innerWidth;
    var mainNav = $(".navigation-holder");
    var smallNav = $(".navigation-holder > .small-nav");
    var subMenu = smallNav.find(".sub-menu");
    var megamenu = smallNav.find(".mega-menu");
    var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");

    if (windowWidth <= 991) {
      subMenu.hide();
      megamenu.hide();
      menuItemWidthSubMenu.on("click", function (e) {
        var $this = $(this);
        $this.siblings().slideToggle();
        e.preventDefault();
        e.stopImmediatePropagation();
      });
    } else if (windowWidth > 991) {
      mainNav.find(".sub-menu").show();
      mainNav.find(".mega-menu").show();
    }
  }

  smallNavFunctionality();

  // SLIDER
  var menu = [];
  jQuery(".swiper-slide").each(function (index) {
    menu.push(jQuery(this).find(".slide-inner").attr("data-text"));
  });
  var interleaveOffset = 0.5;
  var swiperOptions = {
    loop: true,
    speed: 1000,
    parallax: true,
    autoplay: {
      delay: 6500,
      disableOnInteraction: false,
    },
    watchSlidesProgress: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    on: {
      progress: function () {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          var slideProgress = swiper.slides[i].progress;
          var innerOffset = swiper.width * interleaveOffset;
          var innerTranslate = slideProgress * innerOffset;
          swiper.slides[i].querySelector(".slide-inner").style.transform =
            "translate3d(" + innerTranslate + "px, 0, 0)";
        }
      },

      touchStart: function () {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = "";
        }
      },

      setTransition: function (speed) {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = speed + "ms";
          swiper.slides[i].querySelector(".slide-inner").style.transition =
            speed + "ms";
        }
      },
    },
  };

  var swiper = new Swiper(".swiper-container", swiperOptions);

  // DATA BACKGROUND IMAGE
  var sliderBgSetting = $(".slide-bg-image");
  sliderBgSetting.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
    }
  });

  // set two coloumn height equial
  function setTwoColEqHeight($col1, $col2) {
    var firstCol = $col1,
      secondCol = $col2,
      firstColHeight = $col1.innerHeight(),
      secondColHeight = $col2.innerHeight();

    if (firstColHeight > secondColHeight) {
      secondCol.css({
        height: firstColHeight + 1 + "px",
      });
    } else {
      firstCol.css({
        height: secondColHeight + 1 + "px",
      });
    }
  }

  /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
  function preloader() {
    if ($(".preloader").length) {
      $(".preloader")
        .delay(100)
        .fadeOut(500, function () {
          //active wow
          wow.init();
        });
    }
  }

  /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
  var wow = new WOW({
    boxClass: "wow", // default
    animateClass: "animated", // default
    offset: 0, // default
    mobile: true, // default
    live: true, // default
  });

  /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
  if ($(".fancybox").length) {
    $(".fancybox").fancybox({
      openEffect: "elastic",
      closeEffect: "elastic",
      wrapCSS: "project-fancybox-title-style",
    });
  }

  /*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
  function sortingGallery() {
    if ($(".sortable-gallery .gallery-filters").length) {
      var $container = $(".gallery-container");
      $container.isotope({
        filter: "*",
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });

      $(".gallery-filters li a").on("click", function () {
        $(".gallery-filters li .current").removeClass("current");
        $(this).addClass("current");
        var selector = $(this).attr("data-filter");
        $container.isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: "linear",
            queue: false,
          },
        });
        return false;
      });
    }
  }

  sortingGallery();

  /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
  function masonryGridSetting() {
    if ($(".masonry-gallery").length) {
      var $grid = $(".masonry-gallery").masonry({
        itemSelector: ".grid-item",
        columnWidth: ".grid-item",
        percentPosition: true,
      });

      $grid.imagesLoaded().progress(function () {
        $grid.masonry("layout");
      });
    }
  }

  masonryGridSetting();

  /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/
  // Function for clone an element for sticky menu
  function cloneNavForSticyMenu($ele, $newElmClass) {
    $ele
      .addClass("original")
      .clone()
      .insertAfter($ele)
      .addClass($newElmClass)
      .removeClass("original");
  }

  // clone home style 1 navigation for sticky menu
  if ($(".site-header .navigation").length) {
    cloneNavForSticyMenu($(".site-header .navigation"), "sticky-header");
  }

  var lastScrollTop = "";

  function stickyMenu($targetMenu, $toggleClass) {
    var st = $(window).scrollTop();
    var mainMenuTop = $(".site-header .navigation");

    if ($(window).scrollTop() > 1000) {
      if (st > lastScrollTop) {
        // hide sticky menu on scroll down
        $targetMenu.removeClass($toggleClass);
      } else {
        // active sticky menu on scroll up
        $targetMenu.addClass($toggleClass);
      }
    } else {
      $targetMenu.removeClass($toggleClass);
    }

    lastScrollTop = st;
  }

  /*------------------------------------------
        = COUNTDOWN CLOCK
    -------------------------------------------*/
  if ($("#clock").length) {
    function timeElapse(date) {
      var current = Date();
      var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
      var days = Math.floor(seconds / (3600 * 24));
      if (days < 10) {
        days = "0" + days;
      }
      seconds = seconds % (3600 * 24);
      var hours = Math.floor(seconds / 3600);
      if (hours < 10) {
        hours = "0" + hours;
      }
      seconds = seconds % 3600;
      var minutes = Math.floor(seconds / 60);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      seconds = seconds % 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      var html =
        '<div class="box"><div>' +
        days +
        "</div> <span>" +
        $("#clock").data("text-day") +
        '</span></div><div class="box"><div>' +
        hours +
        "</div> <span>" +
        $("#clock").data("text-hour") +
        '</span> </div><div class="box"><div>' +
        minutes +
        "</div> <span>" +
        $("#clock").data("text-minute") +
        '</span> </div><div class="box"><div>' +
        seconds +
        "</div> <span>" +
        $("#clock").data("text-second") +
        "</span></div>";
      $("#clock").html(html);
    }
    var time = $("#clock").data("date");
    $("#clock").countdown(time.replace(/-/g, "/"), function (event) {
      if (event.type == "stoped") {
        var together = new Date($("#clock").data("date"));
        together.setHours(0);
        together.setMinutes(0);
        together.setSeconds(0);
        together.setMilliseconds(0);
        setInterval(function () {
          timeElapse(together);
        }, 1000);
      } else {
        var $this = $(this).html(
          event.strftime(
            "" +
              '<div class="box"><div>%D</div> <span>' +
              $("#clock").data("text-day") +
              "</span> </div>" +
              '<div class="box"><div>%H</div> <span>' +
              $("#clock").data("text-hour") +
              "</span> </div>" +
              '<div class="box"><div>%M</div> <span>' +
              $("#clock").data("text-minute") +
              "</span> </div>" +
              '<div class="box"><div>%S</div> <span>' +
              $("#clock").data("text-second") +
              "</span> </div>"
          )
        );
      }
    });
  }
  /*------------------------------------------
        = FUNFACT
    -------------------------------------------*/
  if ($(".odometer").length) {
    $(".odometer").appear();
    $(document.body).on("appear", ".odometer", function (e) {
      var odo = $(".odometer");
      odo.each(function () {
        var countNumber = $(this).attr("data-count");
        $(this).html(countNumber);
      });
    });
  }

  /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
  $(window).on("load", function () {
    preloader();

    toggleMobileNavigation();

    smallNavFunctionality();

    //set the couple section groom bride two col equal height
    if ($(".couple-section").length) {
      setTwoColEqHeight(
        $(".couple-section .img-holder"),
        $(".couple-section .details")
      );
    }

    sortingGallery();
  });

  /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
  $(window).on("scroll", function () {
    if ($(".site-header").length) {
      stickyMenu($(".site-header .navigation"), "sticky-on");
    }
  });

  /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
  $(window).on("resize", function () {
    toggleClassForSmallNav();

    clearTimeout($.data(this, "resizeTimer"));

    $.data(
      this,
      "resizeTimer",
      setTimeout(function () {
        smallNavFunctionality();
      }, 200)
    );
  });
})(window.jQuery);
