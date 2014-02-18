
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

		var instance 			= this;
		
		this.opts				= opts;
		this.el 				= el;
		this.$el 				= $(el);
		this.$wrap				= false;
		
		this.wrapW  			= 0;
		this.wrapH 				= 0;
		
		this.$ctrlWrap    		= false;
		this.$ctrlSlider      	= false;
		this.$ctrlMagnify		= false;
		this.$ctrlMinify  		= false;
		
		this.imgOrgW  			= 0;
		this.imgOrgH 			= 0;
		

		var _initElements = function(){
			instance.$wrap 		  = instance.$el.parent('.' + instance.opts.wrapperCls);
			instance.$ctrlWrap	  = instance.$wrap.find('.' + instance.opts.controlsWrapperCls).first();
			instance.$ctrlSlider  = instance.$ctrlWrap.find('.' + instance.opts.controlSliderCls).first();
			instance.$ctrlMagnify = instance.$ctrlWrap.find('.' + instance.opts.controlScaleUpCls).first();
			instance.$ctrlMinify  = instance.$ctrlWrap.find('.' + instance.opts.controlScaleDownCls).first();

			return (instance.$wrap.length > 0 && instance.$ctrlWrap.length > 0);
		}
		
		this.updateInstanceVars = function(){
			this.wrapW = instance.$wrap.width();
			this.wrapH = instance.$wrap.height();
			this.updateControlPosition();
			
			return instance;
		};
		

		this.updateControlPosition = function(){
			
			var controlH   = instance.$ctrlWrap.outerHeight();
			var controlHH  = Math.round(controlH/2,2);
			var wrapperHH  = Math.round(instance.wrapH/2,2);
			var controlTop = wrapperHH - controlHH;
			
			this.$ctrlWrap.css('top',controlTop);
			
			return instance;
		};
		
		var _setOriginalDimensions = function(){

			//Bind on-load for the image
			instance.imgOrgW  = instance.$el.width();
			instance.imgOrgH  = instance.$el.height();
			instance.updateInstanceVars();

			//Update variables on window resize
			$(window).resize(function(){
				instance.updateInstanceVars();
			});
			
			return instance;
		};
		
		var _setImageCenterZoom = function(){
			instance.$el.width('100%');
		};

		var _initControls = function(){
			//Initialize the slider
			instance.$ctrlSlider.slider({
				orientation: "vertical",
				range:'min',
				min: 0,
				max: 100,
				value: 50,
				slide: function( event, ui ) {
					console.log(ui);
				}
			});
			instance.$ctrlWrap.addClass('visible');
			
			return false;
		};
		
		this.init = function(){
			$el = $(this.el);
			if($el.prop("tagName") !== 'IMG'){
				return false;
			}
			
			var initialized = _initElements();
			if(initialized === true){
				_setOriginalDimensions();
				_initControls();
				_setImageCenterZoom();
				return true;
			}

			return false;
		};
	};

	$.fn.fnfpanzoom = function(options){

		var defaults = {
			wrapperCls			:'panzoom-wrapper',
			controlsWrapperCls	:'panzoom-controls',
			controlSliderCls	:'panzoom-control--slider',
			controlScaleUpCls	:'panzoom-control--scale-up',
			controlScaleDownCls	:'panzoom-control--scale-down'
			
		};
		
		var settings = $.extend(defaults,options,true);
		
		return this.each(function(){
			var panZoomInstance = new fnfPanZoom(this,settings);
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
