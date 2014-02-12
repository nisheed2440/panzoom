
/*!
 * panzoom.js
 * 
 * @project   PAN ZOOM FULLSCREEN
 * @date      2014-02-12 
 * @author    Nisheed Jagadish<nisheed2016@gmail.com>
 * @licensor  SapientNitro
 * @site      FNF
 *
 * @dependencies:jQuery,jQuery UI,jQuery Lazy Load
 * @dependencies-touch: Hammer.js
 */
(function(){

	var fnfPanZoom = function(el,opts){

		var instance = this;
		this.el = el;
		this.elWrapper = $(this.el).parent('.panzoom-wrapper');
		this.controls = $(this.elWrapper).find('.panzoom-controls')[0];
		this.imgOriginalWidth  = 0;
		this.imgOriginalHeight = 0;
		this.wrapperWidth  = 0;
		this.wrapperHeight = 0;

		this.setOriginalDimensions = function(){

			//Bind on-load for the image
			instance.imgOriginalWidth  = $(instance.el).width();
			instance.imgOriginalHeight = $(instance.el).height();
			instance.updateInstanceVars();

			//Update variables on window resize
			$(window).resize(function(){
				instance.updateInstanceVars();
			});

			return true;
		};

		this.initControls = function(){
			var slider  = $(this.controls).find('.panzoom-control.slider')[0],
			$slider = $(slider);
			//Initialize the slider
			$slider.slider({
				orientation: "vertical",
				range:'min',
				min: 0,
				max: 100,
				value: 50,
				slide: function( event, ui ) {
					console.log(ui);
				}
			});
			$(this.controls).addClass('visible');
		};

		this.updateControlPosition = function(){
			var $control  = $(this.controls);
			var controlH  = $control.outerHeight();
			var controlHH = Math.round(controlH/2,2);
			var wrapperHH = Math.round(this.wrapperHeight/2,2);
			var controlTop = wrapperHH - controlHH;

			$control.css('top',controlTop);
		};

		this.updateInstanceVars = function(){
			this.wrapperWidth = $(instance.elWrapper).width();
			this.wrapperHeight = $(instance.elWrapper).height();
			this.updateControlPosition();
			console.log(instance);
		};

		this.setImgCenteredZoom = function(){

		};

		this.init = function(){
			$el = $(this.el);
			if($el.prop("tagName") !== 'IMG'){
				return false;
			}
			this.setOriginalDimensions();
			this.initControls();

			return true;
		};
	};

	$.fn.fnfpanzoom = function(){

		return this.each(function(){
			var panZoomInstance = new fnfPanZoom(this);
			panZoomInstance.init();
		});
	}

})(jQuery);

$(document).ready(function(){
	$('.panzoom-image').lazyload({
		effect:'fadeIn',
		load:function(){
			$(this).fnfpanzoom();
		}
	});
});
