$(document).ready(function () {
  $('.carousel_inner').slick({
    speed: 1500,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_arrow.svg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right_arrow.svg"></button>',
    responsive: [{
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        arrows: false
      }
    }]
  });
  $('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function () {
    $(this)
      .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
      .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
  });

  function ToggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog_item__content').eq(i).toggleClass('catalog_item__content_active');
        $('.catalog_item__list').eq(i).toggleClass('catalog_item__list_active');


      });
    });
  }

  ToggleSlide('.catalog_item_link');
  ToggleSlide('.catalog_item_back');

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn();
  });

  $('.modal_close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut();
  });

  // $('[data-modal=buy]').on('click', function() {
  //   $('.overlay, #order').fadeIn();
  // });

  $('.button_buy').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal_descr').text($('.catalog_item__title').eq(i).text());
      $('.overlay, #order').fadeIn();
    });
  });

  ValidateForm('#consultation-form');
  ValidateForm('#order form');
  ValidateForm('#consultation form');

  function ValidateForm(form) {
    $(form).validate({
      errorClass: "error",
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        number: 'required',
        email: {
          email: true,
          required: true
        }
      },
      messages: {
        name: {
          required: 'Пожалуйста введите ваше имя!',
          minlength: jQuery.validator.format("Минимальное количество символов {0} !")
        },
        number: "Пожалуйста введите ваш телефон!",
        email: {
          email: 'Не верно указан адрес электронной почты!',
          required: 'Укажите адрес электронной почты!'
        }
      }
    });
  }

  $("input[name=number]").mask("+7(999) 999-99-99");


  $('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize()
    }).done(function () {
      $(this).find('input').val('');
      $('#consultation, #order').hide();
      $('.overlay, #thanks').show();
      $('form').trigger('reset');

    });
    return false;

  });

  $(window).scroll(function () {

    if ($(this).scrollTop() > 1600) {
      $('.page_up').show();
    } else {
      $('.page_up').hide();
    }
  });

  $(function () {
    $("a[href^='#']").click(function () {
      var _href = $(this).attr("href");
      $("html, body").animate({
        scrollTop: $(_href).offset().top + "px"
      });
      return false;
    });
  });




});