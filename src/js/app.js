'use strict';
import 'bootstrap/dist/js/bootstrap';
import 'owl.carousel2/dist/owl.carousel';
import '@fancyapps/fancybox/dist/jquery.fancybox';
$(function () {

  // menu scrool

  // nav scroll fixed
  window.onscroll = function () {
    myFunction()
  };

  var nav = document.getElementById("nav-line");
  var sticky = nav.offsetTop;

  function myFunction() {
    if (window.pageYOffset >= sticky) {
      nav.classList.add("sticky")

    } else {
      nav.classList.remove("sticky");
    }
  }
  // nav scroll
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 450) {
      $("#homepage-section .first-menu-toggle").addClass("nav-active");
    } else {
      $("#homepage-section .first-menu-toggle").removeClass("nav-active");
    }
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 450) {
      $("#homepage-section .nav-company-button").addClass("nav-active");
    } else {
      $("#homepage-section .nav-company-button").removeClass("nav-active");
    }
  });



  // nav menu
  $('.nav-button-mob').click(function () {
    $('.nav').toggleClass('active');
    $('.nav-layer').slideToggle();
  })
  $('.nav-layer').click(function () {
    $('.nav-layer').slideUp();
    $('.nav').toggleClass('active');

  })

  $('.sidebar-header').click(function () {
    $('.first-menu-toggle').toggleClass("nav-active");
    $(".nav-company-button").toggleClass("nav-active");
  })


  // carousel
  $('#homepage-first-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    navText: ["<img src='../assets/png/left.png'>", "<img src='../assets/png/right.png'>"],

    responsive: {
      0: {
        items: 1
      }
    }
  })

  // product items  price
  $(document).on('click', '.increase', function () {
    console.log($(this));
    console.log($(this).siblings('#amount'))
    $(this).siblings('#amount').val(function (i, oldval) {
      return ++oldval;
    });

  });

  $(document).on('click', '.decrease', function () {
    if ($(this).siblings('#amount').val() > 0) {
      $(this).siblings('#amount').val(function (i, oldval) {
        return --oldval;
      });
    }
  });

  $(document).on('keydown', ' #amount', function (e) {
    if ((e.keyCode === 189) || (e.keyCode === 187)) {
      return false;
    }
  });

});



// product owl carousel 

$('.product-section').owlCarousel({
  loop: true,
  items: 4,
  margin: 10,
  nav: true,
  dots: false,
  navText: ["<img src='../assets/png/left.png'>", "<img src='../assets/png/right.png'>"],
  responsive: {
    0: {
      items: 1.5
    },

    767: {
      items: 3.5
    },
    1000: {
      items: 4
    }
  }

})

// product like button  

$('.product-like i').click(function () {
  $(this).toggleClass("active");
})

//  pop up

// pop up filter
$('.popup-layer').click(function () {
  $('#popup-filter .popup').removeClass('active');
})
$('.close').click(function () {
  $('#popup-filter .popup').removeClass('active');
})
$('.popup-filter-open').click(function () {
  $('#popup-filter .popup').addClass('active')
})


// pop up sign in forgotten
$('.popup-layer').click(function () {
  $('#popup-sign').removeClass('active');
})
$('.forgotten-password-close').click(function () {
  $('#popup-sign').removeClass('active');
})
$('.forgotten-password').click(function () {
  $('#popup-sign').addClass('active')
})


// pop up sign in
$('.popup-layer').click(function () {
  $('#signin-content .popup').removeClass('active');
})
$('#signin-content .close').click(function () {
  $('#signin-content .popup').removeClass('active');
})
$('#signin-content .forgotten-password').click(function(){
  $('#signin-content .popup').removeClass('active');
})
$('.sign-pop-up-button').click(function () {
  $('#signin-content .popup').addClass('active')
})


// pop up register

$('.popup-layer').click(function () {
  $('#register-content .popup').removeClass('active');
})
$('#register-content .close').click(function () {
  $('#register-content .popup').removeClass('active');
})
$('.register-pop-up-button').click(function () {
  $('#register-content .popup').addClass('active')
})





// $('.popup-layer').click(function(){
//     $('.popup').fadeOut();
//   })
//   $('.close').click(function(){
//     $('.popup').fadeOut();
//   })
//   $('.open').click(function(){
//     $('.popup').fadeIn();
//   })



// Product item page carousel

$(document).ready(function () {

  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  var slidesPerPage = 4; //globaly define number of elements per page
  var syncedSecondary = true;

  sync1.owlCarousel({
    items: 1,
    nav: false,
    dots: true,
    loop: true,
    responsiveRefreshRate: 200,
    // navText: ["<img src='../assets/png/left.png'>","<img src='../assets/png/right.png'>"],
  }).on('changed.owl.carousel', syncPosition);

  sync2
    .on('initialized.owl.carousel', function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
      items: slidesPerPage,
      dots: false,
      nav: false,

    }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - (el.item.count / 2) - .5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }

    //end block

    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();

    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }

  sync2.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });


  /*Scroll to top when arrow up clicked BEGIN*/
  $(window).scroll(function () {
    var height = $(window).scrollTop();
    if (height > 100) {
      $('#backTop').fadeIn();
    } else {
      $('#backTop').fadeOut();
    }
  });
  $(document).ready(function () {
    $("#backTop").click(function (event) {
      event.preventDefault();
      $("html, body").animate({
        scrollTop: 0
      }, "slow");
      return false;
    });

  });
  /*Scroll to top when arrow up clicked END*/

// input hide show icon

  $(".toggle-password").click(function() {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });


  //responsive menu toggle
  $("#menutoggle").click(function() {
    $('.xs-menu-cont').toggleClass('active');
    $(this).toggleClass('active');
    $('.xs-menu').toggleClass('active');
    });

      $(".nav-tabs a").click(function(){
        $(this).tab('show');
      });
});
