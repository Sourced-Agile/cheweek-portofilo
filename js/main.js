AOS.init({
  duration: 800,
  easing: 'slide',
});

(function ($) {
  'use strict';

  $(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll',
  });

  var fullHeight = function () {
    $('.js-fullheight').css('height', $(window).height());
    $(window).resize(function () {
      $('.js-fullheight').css('height', $(window).height());
    });
  };
  fullHeight();

  // Scrollax
  $.Scrollax();

  var burgerMenu = function () {
    $('.js-colorlib-nav-toggle').on('click', function (event) {
      event.preventDefault();
      var $this = $(this);

      if ($('body').hasClass('offcanvas')) {
        $this.removeClass('active');
        $('body').removeClass('offcanvas');
      } else {
        $this.addClass('active');
        $('body').addClass('offcanvas');
      }
    });
  };
  burgerMenu();

  // Click outside of offcanvass
  var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
      var container = $('#sw-aside, .js-colorlib-nav-toggle');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('offcanvas')) {
          $('body').removeClass('offcanvas');
          $('.js-colorlib-nav-toggle').removeClass('active');
        }
      }
    });

    $(window).scroll(function () {
      if ($('body').hasClass('offcanvas')) {
        $('body').removeClass('offcanvas');
        $('.js-colorlib-nav-toggle').removeClass('active');
      }
    });
  };
  mobileMenuOutsideClick();

  var contentWayPoint = function () {
    var i = 0;
    $('.ftco-animate').waypoint(
      function (direction) {
        if (
          direction === 'down' &&
          !$(this.element).hasClass('ftco-animated')
        ) {
          i++;

          $(this.element).addClass('item-animate');
          setTimeout(function () {
            $('body .ftco-animate.item-animate').each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data('animate-effect');
                  if (effect === 'fadeIn') {
                    el.addClass('fadeIn ftco-animated');
                  } else if (effect === 'fadeInLeft') {
                    el.addClass('fadeInLeft ftco-animated');
                  } else if (effect === 'fadeInRight') {
                    el.addClass('fadeInRight ftco-animated');
                  } else {
                    el.addClass('fadeInUp ftco-animated');
                  }
                  el.removeClass('item-animate');
                },
                k * 50,
                'easeInOutExpo'
              );
            });
          }, 100);
        }
      },
      { offset: '95%' }
    );
  };
  contentWayPoint();

  $('.product-single-carousel')
    .on('initialized.owl.carousel changed.owl.carousel', function (e) {
      if (!e.namespace) {
        return;
      }
      $('.product-single-item-numbers').text(
        e.relatedTarget.relative(e.item.index) + 1 + ' / ' + e.item.count
      );
    })
    .owlCarousel({
      loop: false,
      rewind: true,
      items: 1,
      margin: 15,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayHoverPause: true,
      smartSpeed: 300,
      autoplayTimeout: 8000,
      animateOut: 'fadeOut',
      navText: [
        "<i class='fa fa-chevron-left'></i>",
        "<i class='fa fa-chevron-right'></i>",
      ],
    });

  // DIV BOX ANCHOR ID

  $('.cat-click').click(function () {
    $('html, body').animate({ scrollTop: $('#portfolio').offset().top }, 500);
  });

  /* Toggle Video Modal
  -----------------------------------------*/
  function toggle_video_modal() {
    $('.js-trigger-video-modal').on('click', function (e) {
      e.preventDefault();

      var id = $(this).attr('data-youtube-id');

      // Autoplay when the modal appears
      // Note: this is intetnionally disabled on most mobile devices
      // If critical on mobile, then some alternate method is needed
      var autoplay = '?mute=0&autoplay=1';

      // Don't show the 'Related Videos' view when the video ends
      var related_no = '&rel=0';

      // String the ID and param variables together
      var src = '//www.youtube.com/embed/' + id + autoplay + related_no;

      // Pass the YouTube video ID into the iframe template...
      // Set the source on the iframe to match the video ID
      $('#youtube').attr('src', src);

      // Add class to the body to visually reveal the modal
      $('body').addClass('show-video-modal noscroll');
    });

    // Close and Reset the Video Modal
    function close_video_modal() {
      event.preventDefault();

      // re-hide the video modal
      $('body').removeClass('show-video-modal noscroll');

      // reset the source attribute for the iframe template, kills the video
      $('#youtube').attr('src', '');
    }
    // if the 'close' button/element, or the overlay are clicked
    $('body').on(
      'click',
      '.close-video-modal, .video-modal .overlay',
      function (event) {
        // call the close and reset function
        close_video_modal();
      }
    );
    // if the ESC key is tapped
    $('body').keyup(function (e) {
      if (e.keyCode == 27) {
        close_video_modal();
      }
    });
  }
  toggle_video_modal();

  $('body').on('click', '.skin-btn', function (event) {
    $(this).find('i').toggleClass('fa-sun fa-moon');
    $(this).toggleClass('light-theme dark-theme');
    $('#skin-link-id').remove();
    var a = $('#skin-theme');

    if ($(this).hasClass('light-theme')) {
      a.after(
        '<link rel="stylesheet" id="skin-link-id" href="css/light-skin.css" />'
      );
    } else {
      a.after(
        '<link rel="stylesheet" id="skin-link-id" href="css/dark-skin.css" />'
      );
    }
  });
})(jQuery);
