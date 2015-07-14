(function(global) {

  "use strict";

  var Slider = function(element, config) {

    config = $.extend({
      canPlay: false,
      canPause: false
    }, config);

    var buttonTemplate = '<button type="button" class="slick-{{:action}}" aria-label="{{:action}}">{{:action}}</button>';

    var play = function() { element.slick("slickPlay"); };

    var pause = function() { element.slick("slickPause"); };

    var addPlayButton = function() {
      var button = $(buttonTemplate.replace(/{{:action}}/g, "play"));
      button.on("click", play);
      element.append(button);
    };

    var addPauseButton = function() {
      var button = $(buttonTemplate.replace(/{{:action}}/g, "pause"));
      button.on("click", pause);
      element.append(button);
    };

    var init = function() {

      if (!config.slidesToShow){
        config.slidesToShow = 1;
      }

      var toSlick = $(element);
      if (config.slidesToShow === 1){
        toSlick.addClass("OnlyPane");
      }

      if (toSlick.hasClass("slick-initialized")){
        toSlick.slick("destroy");
      }

      toSlick.slick(config);
      if(config.canPlay) {
        addPlayButton();
      }
      if(config.canPause) {
        addPauseButton();
      }
    };

    init();
  };

  $(function() {
    var ftwSliderInit = function(){
      $(".sliderWrapper").each(function() {
        var slider = new Slider($(".sliderPanes", this), $(this).data("settings"));
      });
    };
    var ftwSliderUpdate = function() {
      $(".sliderWrapper").each(function() {
        if($("> div.slick-initialized", this).length < 1) {
          var slider = new Slider($(".sliderPanes", this), $(this).data("settings"));
        }
      });
    };
    ftwSliderInit();
    global.ftwSliderInit = ftwSliderInit;
    global.ftwSliderUpdate = ftwSliderUpdate;
  });

})(window);
