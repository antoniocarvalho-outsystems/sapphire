$(document).ready(function () {


  var regex = RegExp("Layout");
  var wordList = $('.Page').attr('class').split(" ").filter((elem, index) => {
    return regex.test(elem);
  })
  $('.ViewStateCounter > div').append(' ' + wordList);


  var isDesktop = $(".Page").hasClass("desktop");
  var isPhone = $(".Page").hasClass("phone");
  var UseSidebar = $(".Sidebar").css("display") != "none";

  if (isPhone) $(".Others_Menu ").detach().prependTo(".Application_Menu");

  // open responsive menu
  $("a.Header_ButtonMenu").click(function () {

    // if opened
    if ($(".Page").hasClass("active")) {
      $(".Page").removeClass("active");
    } else {
      $(".Page").addClass("active");
    }

    return false;
  });


  // close resposive menu when click out
  $(".Page.tablet > .Content").click(function () {
    $(".Page").removeClass("active");
  });

  // Open sidebar
  $("a.Header_ButtonSidebar").click(function () {

    // if open
    if ($(".Sidebar").hasClass("open")) {
      $(".Sidebar").removeClass("open");
    } else {
      $(".Sidebar").addClass("open");
    }

    return false;
  });


  // if sidebar
  if (UseSidebar) {
    $(".Page").addClass("UseSidebar");
  } else {

    // if fade active
    if ($(".Page").hasClass("UseHeaderFade")) {

      $header = $('.Header');
      $titleHeight = $(".Title_Section").outerHeight();
      var $headerBackground = $('.Header_background');

      var alpha = 0;
      var lastComma = "";
      $(window).scroll(function () {
        if ($(this).scrollTop() > $headerHeight) {
          $headerBackground.fadeIn();
        } else {
          $headerBackground.fadeOut();
        }
      });

    }
  }

  $(window).scroll(function () {
    /*     $('.Page thead th').css('top',$('.MainContent_others').outerHeight());
         $('.MainContent_others').css('padding-top','20px');*/

  });

  $('.Menu_TopMenu').on('click', 'a', function () {
    $(this).blur();
  });



  /* caj: solves the * in mandatory 
  $('input.Mandatory, select.Mandatory').parent().addClass('ListInputMandatory');*/

});