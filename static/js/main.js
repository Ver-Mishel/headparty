

$(function () {
	var answer = $('.talking-jack.jack-answer');
	if (!answer.size()) {
		return;
	}
	var pointer = answer.siblings('.touch-place'),
		ask = answer.siblings('.jack-ask');
	pointer.on('mousemove', move);
	var counter = 0,
		max = 100;
	function move(e) {
		if (++counter >= max) {
			answer.addClass('active');
			ask.addClass('active');
			pointer.off('mousemove', move);
			setTimeout(function () {
				counter = 0;
				answer.removeClass('active');
				ask.removeClass('active');
				pointer.on('mousemove', move);
			}, 5000);
		}
	}
});


/*

 HW Slider - простой слайдер на jQuery.

 Настройки скрипта:

 hwSlideSpeed - Скорость анимации перехода слайда.
 hwTimeOut - время до автоматического перелистывания слайдов.
 hwNeedLinks - включает или отключает показ ссылок "следующий - предыдущий". Значения true или false

 Подробнее на http://heavenweb.ru/

 */
(function ($) {
	var hwSlideSpeed = 700;
	var hwTimeOut = 7000;
	var hwNeedLinks = false;

	$(document).ready(function(e) {
		$('.slide').css(
			{"position" : "absolute",
				"top":'0', "left": '0'}).hide().eq(0).show();
		var slideNum = 0;
		var slideTime;
		slideCount = $("#slider .slide").size();
		var animSlide = function(arrow){
			clearTimeout(slideTime);
			$('.slide').eq(slideNum).fadeOut(hwSlideSpeed);
			if(arrow == "next"){
				if(slideNum == (slideCount-1)){slideNum=0;}
				else{slideNum++}
			}
			else if(arrow == "prew")
			{
				if(slideNum == 0){slideNum=slideCount-1;}
				else{slideNum-=1}
			}
			else{
				slideNum = arrow;
			}
			$('.slide').eq(slideNum).fadeIn(hwSlideSpeed, rotator);
			$(".control-slide.active").removeClass("active");
			$('.control-slide').eq(slideNum).addClass('active');
		}
		if(hwNeedLinks){
			var $linkArrow = $('<a id="prewbutton" href="#">&lt;</a><a id="nextbutton" href="#">&gt;</a>')
				.prependTo('#slider');
			$('#nextbutton').click(function(){
				animSlide("next");
				return false;
			})
			$('#prewbutton').click(function(){
				animSlide("prew");
				return false;
			})
		}
		var $adderSpan = '';
		/*$('.slide').each(function(index) {
		 $adderSpan += '<span class = "control-slide">' + index + '</span>';
		 });
		 $('<div class ="sli-links">' + $adderSpan +'</div>').appendTo('#slider-wrap');
		 $(".control-slide:first").addClass("active");
		 $('.control-slide').click(function(){
		 var goToNum = parseFloat($(this).text());
		 animSlide(goToNum);
		 });*/
		var pause = false;
		var rotator = function(){
			if(!pause){slideTime = setTimeout(function(){animSlide('next')}, hwTimeOut);}
		}
		$('#slider-wrap').hover(
			function(){clearTimeout(slideTime); pause = true;},
			function(){pause = false; rotator();
			});
		rotator();
	});
})(jQuery);

$(function () {
	// Calc main slider height
	/*(function () {
	 var slider = $('.main-slider');
	 if (!slider.size()) {
	 return;
	 }
	 var images = slider.find('img');
	 calc();
	 $(window).resize(calc);
	 function calc() {
	 slider.css({ height: images/!*.filter(':visible')*!/.height() + 'px' });
	 }
	 })();*/
	// Animate url
	$('.main-slider__info_slide-bot').click(function () {
		var related = $('#' + this.href.split('#')[1]);
		if (related.size()) {
			$('html, body').animate({ scrollTop: related.offset().top + 'px' }, 500);
			return false;
		}
	});
	// Работа с модалками
	$('.btn-menu, .short-menu .btn-close').click(function () {
		$('.short-menu').fadeToggle();
	});
	$('.modal-block .btn-close').click(function () {
		$(this).parents('.modal-block').animate({opacity: 0}, 500, function () {
			$(this).removeClass('modal-active');
		});
	});
	$('.feedback__get-form, .url-more.url-callback').click(function () {
		$('.modal-block.modal-feedback').addClass('modal-active').animate({opacity: 1}, 500);
		return false;
	});
	$('.url-more.url-about').click(function () {
		$('.modal-block.modal-about').addClass('modal-active').animate({opacity: 1}, 500);
		return false;
	});
	//	Анимация страницы помощи
	$(".block-help-item h3").click(function () {
		$(this).next().slideToggle();
	});
	// Slider галереи
	$('.slider-block').each(
		function () {
			var slider = $(this),
				list = slider.find('.slider-content').css({ position: 'relative' }),
				flag = false,
				duration = 200;
			slider.find('.arrows').click(function () {
				if (!flag) {
					flag = true;
					var items = list.find('> div');
					var item;
					if ($(this).hasClass('arr-right')) {
						list.append(items.first().clone(true)).animate({ left: (-1 * items.first().width()) + 'px' }, duration, function () {
							flag = false;
							items.first().remove();
							list.css({ left: 0 });
						});
						item = list.find('.item').eq(1);
					} else {
						list
							.css({ left: (-1 * items.first().width()) + 'px' })
							.prepend(items.last().clone(true))
							.animate({ left: 0 }, duration, function () {
								flag = false;
								items.last().remove();
							});
						item = list.find('.item').eq(0);
					}
				}
			});
		}
	);


});


$(document).click(function (e) {
	var target = $(e.target);
	if (!target.hasClass('modal-body') && !target.closest('.modal-body').size()) {
		$('.modal-block').animate({opacity: 0}, 500, function () {
			$(this).removeClass('modal-active');
		});
	}
});