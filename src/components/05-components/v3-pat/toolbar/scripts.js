/* Component HorizontalToolbar */
function ScrollToolbarIntoView() {
	$('.MenuItemWrapper.Active')[0].scrollIntoView({
		behavior: 'auto',
		block: 'end',
	});
}

$(document).ready(function() {
	ScrollToolbarIntoView();

	var $item = $('.MenuItemWrapper');
	var initWidth = $('.Toolbar__Items .ListRecords')[0].scrollWidth;

	$('.Toolbar__Items').scroll(function() {
		var currentScroll = $('.Toolbar__Items').scrollLeft();
		var maxScrolll = $('.Toolbar__Items .ListRecords').width() - $('.Toolbar__Items').width();

		if (currentScroll == 0) {
			$('.Toolbar__leftBtn').addClass('Disabled');
		} else {
			$('.Toolbar__leftBtn').removeClass('Disabled');
		}

		if (currentScroll >= maxScrolll) {
			$('.Toolbar__rightBtn').addClass('Disabled');
		} else {
			$('.Toolbar__rightBtn').removeClass('Disabled');
		}
	});

	$('.Toolbar__rightBtn').click(function() {
		var currentScroll = $('.Toolbar__Items').scrollLeft();
		var maxScrolll = $('.Toolbar__Items .ListRecords').width() - $('.Toolbar__Items').width();
		var sideWidth = maxScrolll - 50;
		$('.Toolbar__Items').scrollLeft(currentScroll + 50);
		if (currentScroll == sideWidth) {
			$('.Toolbar__rightBtn').addClass('Disabled');
		}
		if (currentScroll != 50) {
			$('.Toolbar__leftBtn').removeClass('Disabled');
		}
	});

	$('.Toolbar__leftBtn').click(function() {
		var currentScroll = $('.Toolbar__Items').scrollLeft();
		var maxScrolll = $('.Toolbar__Items .ListRecords').width() - $('.Toolbar__Items').width();
		var sideWidth = maxScrolll - 50;
		$('.Toolbar__Items').scrollLeft(currentScroll - 50);
		if (currentScroll != sideWidth) {
			$('.Toolbar__rightBtn').removeClass('Disabled');
		}
		if (currentScroll == 50) {
			$('.Toolbar__leftBtn').addClass('Disabled');
		}
	});

	/*
  $(window).scroll(function () {
      if ($('.ClinicianWorkArea____subMenu').length > 0) {
          var distanceTop;
          var menuHeight = $('.PatientDetails_Header').outerHeight(true) || 0;
          var patientHeaderHeight = $('.PatientHeader').outerHeight(true) || 0;
          var sapphireHeaderHeight = $('.SapphireHeader-body').outerHeight(true) || 0;
          var toolHeight = $('.EmergencyTabs').outerHeight(true) || 0;

          if ($('.ClinicianWorkArea__emergencyMenu .CTTASLevelAssessmentMainContainer').length > 0) {
              
              console.log('scroll WITH emergency menu');

              var emergencyMenuHeight = $('.CTTASLevelAssessmentMainContainer').outerHeight(true);
              
              var distanceTop = menuHeight + patientHeaderHeight + sapphireHeaderHeight + emergencyMenuHeight;
              var distanceTopEmergencyBar = menuHeight + patientHeaderHeight + sapphireHeaderHeight;

              if ($(document).scrollTop() + toolHeight > distanceTopEmergencyBar) {
                  

                  if ($('.SSD-Wrapper.Positioned.Selected').length > 0) {
                      ssdComponent.resize();
                  }

                  $(".Toolbar").addClass("Fix");

                  if (!$('body').hasClass('LayoutBase')) {
                      $(".Toolbar").css({
                          'top': distanceTop,
                          'width': $('.Toolbar').closest('.ColFirst').width()
                      });
                      $(".CTTASLevelAssessmentMainContainer ").addClass("Fix");
                      $(".CTTASLevelAssessmentMainContainer ").css({
                          'top': distanceTopEmergencyBar,
                          'width': $('.MainContent').outerWidth()
                      });
                      $('.WorkItems').css('padding-top', '200px');
                  }
                  
              } else {
                  $(".CTTASLevelAssessmentMainContainer").removeClass("Fix");
                  $(".Toolbar").removeClass("Fix");
                  $(".Toolbar").css({
                      'top': 'auto',
                      'width': '100%'
                  });
                  $('.WorkItems').css('padding-top', 'unset');
              }

          } else {

              console.log('scroll WITHOUT emergency menu');
              var distanceTop = $('.FullScreenTabsWrapper').outerHeight();

              if ($(document).scrollTop() > distanceTop) {
                  $(".Toolbar").addClass("Fix");
                  if ($('.SSD-Wrapper.Positioned.Selected').length > 0) {
                      ssdComponent.resize();
                  }
                  $(".Toolbar").css({
                      'top': menuHeight + patientHeaderHeight + sapphireHeaderHeight,
                      'width': $('.Toolbar').closest('.ColFirst').width()
                  });
                  
                  if (!$('body').hasClass('LayoutBase')) {
                      $('.WorkItems').css('padding-top', '80px');
                  }
                  
              } else {
                  $(".Toolbar").removeClass("Fix");
                  if ($('.SSD-Wrapper.Positioned.Selected').length > 0) {
                      ssdComponent.resize();
                  }
                  $(".Toolbar").css({
                      'top': 'auto',
                      'width': '100%'
                  });
                  $('.WorkItems').css('padding-top', 'unset');
              }
          }
      }
  });
  */
});
