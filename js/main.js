"use strict";

$(function(){

	// Определение геолокации
	// function getURLParameter(name) {return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;}
	// function run_geo(geo_url){
	//  $.ajax({type: 'GET',url: geo_url,dataType: 'xml',
	//    success: function(xml) {$(xml).find('ip').each(function(){
	//      var city = $(this).find('city').text();
	//      var region = $(this).find('region').text();
	//      if(city!=region){var ipg = city+', '+region;}else{var ipg = city;}
	//      $('<input type="hidden" />').attr({name: 'location', class: 'location', value:ipg}).appendTo("form");
	//      console.log(city + ' - '+ region);
	//      console.log(ipg);
	//    });}});
	// }


	$(document).ready(function(e){

		// Определение геолокации
		// $.get("https://ipinfo.io", function(response) {
		//  var geo_url='https://ipgeobase.ru:7020/geo?ip='+response.ip; run_geo(geo_url);
		// }, "jsonp");

		// $(window).on('resize', function() {
		// 	if (screen.width <= 800) {
		// 		document.location = "/mobile/" + document.location.search;
		// 	}
		// });

		setTimeout(function() {
			$('.pre-loader').fadeOut(1000);
		}, 2000);


		// Показываем боковые колл-трекеры только на втором экране
		var s1_height = $('.s1').height();

		$(window).scroll(function() {
			var scr_top = $(window).scrollTop();
			if (scr_top > s1_height+100) {
				if(!$('.ws-quiz-container, .callbackkiller').hasClass('scrollShowBlock')) {
					$('.ws-quiz-container, .callbackkiller').addClass('scrollShowBlock');
				}
			} else {
				$('.ws-quiz-container, .callbackkiller').removeClass('scrollShowBlock');
			}
		});

		// иницилизируем показ попапа об уходе только после 3го экрана
		$(window).scroll(function() {
			var scr_top = $(window).scrollTop();
			if (scr_top > 2600) {
				waitPopupInit();
			}
		});



		// Показываем попап при unhover window
		function waitPopupInit() {
			if (!$.cookie('modalOkno')) {

				var dateExp = new Date();
				var minutesExp = 120;
				dateExp.setTime(dateExp.getTime() + (minutesExp * 60 * 1000));

				setTimeout(function() {
					$(document).mouseleave(function (e) {
						function getWindow() {
							$('#wait-modal').arcticmodal();
							$(document).off('mouseleave');
						};
						setTimeout(getWindow, 1);
						$.cookie('modalOkno', true, {
							expires: dateExp,
							path: '/'
						});
					});
				}, 60000);

			}
		}




		// КВИЗ, ответы на вопросы
		// ==================================================

		var question_text = [
		'Где будет происходить установка?',
		'Выберите печь-барбекю',
		'Выберете вид дымохода',
		'Какими изделиями дополнить Печь-Барбекю?',
		'Чем дополнить Вашу зону барбекю?',
		'Когда планируете начать пользоваться комплексом?'
		];
		var skidka_text = [
		'Начнем!',
		'Неплохо!',
		'Так держать!',
		'Отлично!',
		'Супер!',
		'Еще чуть-чуть!'
		];
		// var $quest_num = $('.quiz__quest-num');
		// var $quest_text = $('.quiz__h2');
		// var $quiz__skidka = $('.quiz__skidka');
		// var $quiz__center_text = $('.quiz__center-text');
		// var $quiz__prev = $('.quiz__footer-prevquest');

		function quizOprosnik(currentStep = 1) {
			$('.quiz__step').hide();
			switch (currentStep) {
				case 1:
				$('.quiz__step1').show();
				$('.quiz__quest-num').html(1);
				$('.quiz__h2').html(question_text[0]);
				$('.quiz__skidka').html(500);
				$('.quiz__center-text').html(skidka_text[0]);
				$('.quiz__footer-prevquest').hide();
				$('.quiz__footer').removeClass().addClass('quiz__footer quiz__foot-step1');
				break;
				case 2:
				$('.quiz__step2').show();
				$('.quiz__quest-num').html(2);
				$('.quiz__h2').html(question_text[1]);
				$('.quiz__skidka').html(1000);
				$('.quiz__center-text').html(skidka_text[1]);
				$('.quiz__footer-prevquest').show();
				$('.quiz__footer').removeClass().addClass('quiz__footer quiz__foot-step2');
				break;
				case 3:
				$('.quiz__step3').show();
				$('.quiz__quest-num').html(3);
				$('.quiz__h2').html(question_text[2]);
				$('.quiz__skidka').html(1500);
				$('.quiz__center-text').html(skidka_text[2]);
				$('.quiz__footer-prevquest').show();
				$('.quiz__footer').removeClass().addClass('quiz__footer quiz__foot-step3');
				break;
				case 4:
				$('.quiz__step4').show();
				$('.quiz__quest-num').html(4);
				$('.quiz__h2').html(question_text[3]);
				$('.quiz__skidka').html(2000);
				$('.quiz__center-text').html(skidka_text[3]);
				$('.quiz__footer-prevquest').show();
				$('.quiz__footer').removeClass().addClass('quiz__footer quiz__foot-step4');
				break;
				case 5:
				$('.quiz__step5').show();
				$('.quiz__quest-num').html(5);
				$('.quiz__h2').html(question_text[4]);
				$('.quiz__skidka').html(2500);
				$('.quiz__center-text').html(skidka_text[4]);
				$('.quiz__footer-prevquest').show();
				$('.quiz__footer').removeClass().addClass('quiz__footer quiz__foot-step5');
				break;
				case 6:
				$('.quiz__step6').show();
				$('.quiz__quest-num').html(6);
				$('.quiz__h2').html(question_text[5]);
				$('.quiz__skidka').html(3000);
				$('.quiz__center-text').html(skidka_text[5]);
				$('.quiz__footer-prevquest').show();
				$('.quiz__footer').removeClass().addClass('quiz__footer quiz__foot-step6');
				break;
			}
		}
		quizOprosnik(1);

		function controlCheckInputs(stepName) {
			var theCheck = false;
			$(stepName).find("input").each(function(){
				if ($(this).prop('checked') == true){ theCheck = true; }
			});
			if(theCheck != true) {
				$('#modal_not_check').arcticmodal();
				return false;
			}
		}

		// Обработка клика кнопки "СЛЕДУЮЩИЙ ВОПРОС"
		$(document).on('click', '.quiz__footer-nextquest', function () {
			var thisStep = $(this).parents('.quiz__inner').data('step');
			var newStep = thisStep + 1;

			// проверяем, отмечен ли чекбокс
			switch (thisStep) {
				case 1:
				if(controlCheckInputs(".quiz__step1") == false) {
					return; // прерываем выполнение всей функции click
				}
				break;
				case 2:
				if(controlCheckInputs(".quiz__step2") == false) {return;}
				break;
				case 3:
				if(controlCheckInputs(".quiz__step3") == false) {return;}
				break;
				case 4:
				if(controlCheckInputs(".quiz__step4") == false) {return;}
				break;
				case 5:
				if(controlCheckInputs(".quiz__step5") == false) {return;}
				break;
				case 6:
				if(controlCheckInputs(".quiz__step6") == false) {return;}
				break;
			}

			// проверка на последний шаг квиза
			if(newStep > 6) {
				$('.quiz__inner').hide();
				$('.quiz__final').fadeIn();
				$('.quiz__form').css('paddingTop', '50px');
				return;
			}
			$('.quiz__inner').data('step', newStep);

			quizOprosnik(newStep); //вызываем функцию отрисовки блоков опросника с новым шагом
		});

		// Обработка клика кнопки "НАЗАД"
		$(document).on('click', '.quiz__footer-prevquest', function () {
			var thisStep = $(this).parents('.quiz__inner').data('step');
			var newStep = thisStep - 1;
			$('.quiz__inner').data('step', newStep)
			quizOprosnik(newStep);
		});

		// Отмечаем инпуты при клике на элемент
		$(document).on('click', '.quiz__item', function () {
			var thisCheckbox = $(this).find('input');
			var thisName = $(this).find('input').attr('name');
			var thisValue = $(this).find('input').val();

			if($(this).find('input').attr('checked') == 'checked') {
				$(this).find('input').attr('checked', false);
				// Ищем такой же инпут, и снимаем отметку
				$('.quiz__item input').each(function() {
					if($(this).attr('name') == thisName && $(this).val() == thisValue) {
						$(this).attr('checked', false);
					}
				});
			} else {
				$(this).find('input').attr('checked', true);
				// Ищем такой же инпут, и отмечаем его тоже
				$('.quiz__item input').each(function() {
					if($(this).attr('name') == thisName && $(this).val() == thisValue) {
						$(this).attr('checked', true);
					}
				});
			}

		});


		// Подгружаем контент КВИЗА в попап
		$('.quiz__form').clone().appendTo('.quiz-modal');





		// КОНЕЦ КВИЗА, ответы на вопросы
		// ==================================================



		var s2Slider = $('.s2__slider').owlCarousel({
			loop: true,
			center: true,
			margin: 500,
			nav: false,
			mouseDrag: false,
			touchDrag: false,
			items: 1,
			onInitialized: customPager1
		});
		$('.s2__tabs-prev').click(function() {
			s2Slider.trigger('prev.owl.carousel');
		});
		$('.s2__tabs-next').click(function() {
			s2Slider.trigger('next.owl.carousel');
		});

		function customPager1() {
			var tabNames = {
				'0' : 'Сборка за <br>15-20 мин.',
				'1' : 'Высокая <br>надежность',
				'2' : 'Не нужен <br>фундамент',
				'3' : 'Дизайн <br>и внешний вид',
				'4' : 'Высокое качество <br>приготовления'
			};
			$.each($('.s2__slider .owl-item'), function (i) {
				var titleData = tabNames[i];
				var paginationLinks = $('.s2__slider .owl-dots .owl-dot span');
				$(paginationLinks[i]).append(titleData);
			});

			$('.s2__slider .owl-dot').each(function(i, elem) {
				$(this).data('numb', i);
			});
		}


		var s3Slider = $('.s3__slider').owlCarousel({
			loop: true,
			center: true,
			margin: 500,
			nav: false,
			mouseDrag: false,
			touchDrag: false,
			items: 1,
			onInitialized: customPager2
		});
		$('.s3__tabs-prev').click(function() {
			s3Slider.trigger('prev.owl.carousel');
		});
		$('.s3__tabs-next').click(function() {
			s3Slider.trigger('next.owl.carousel');
		});

		function customPager2() {
			var tabNames = {
				'0' : 'Доставим быстрее, <br>чем ТК, на ~5 дней',
				'1' : 'Почему мы <br>упаковываем груз сами',
				'2' : 'Ваш груз <br>застрахован',
				'3' : 'Свой экспедитор <br>сопровождает груз'
			};
			$.each($('.s3__slider .owl-item'), function (i) {
				var titleData = tabNames[i];
				var paginationLinks = $('.s3__slider > .owl-dots .owl-dot span');
				$(paginationLinks[i]).append(titleData);
			});

			$('.s3__slider .owl-dot').each(function(i, elem) {
				$(this).data('numb', i);
			});
		}




		var s3InnerSlider = $('.s3__innerslider').owlCarousel({
			loop: true,
			center: true,
			margin: 0,
			nav: true,
			items: 1
		});
		$('.s3__innerslider-prev').click(function() {
			s3InnerSlider.trigger('prev.owl.carousel');
		});
		$('.s3__innerslider-next').click(function() {
			s3InnerSlider.trigger('next.owl.carousel');
		});

		s3InnerSlider.on('changed.owl.carousel', function (e) {
			var count = e.item.count;
			var offset = Math.floor((count + 1) / 2);
			var currentSlide = e.item.index;
			if (currentSlide > 0) { currentSlide -= offset; }
			if (currentSlide >= count) { currentSlide -= count; }
			if (currentSlide == -1) { currentSlide = 4; }

			$('.s3__innerslider-itemtext').each(function(i, elem) {
				var currentText = $(this).data('item_id');
				if(currentSlide == currentText) {
					$('.s3__innerslider-itemtext').removeClass('active');
					$(this).addClass('active');
				}
			});

		});

		$('.s3__innerslider-itemtext').each(function(i, elem) {
			$(this).data('item_id', i);
		});
		$('.s3__innerslider-itemtext:first-child').addClass('active');


		//////////////////////////////////
		// ПАРАЛЛАКС ЭФФЕКТ ЭЛЕМЕНТОВ ЛЕГО
		//////////////////////////////////
		$(document).on('mousemove', function (e) {
			$('.s2__slide-lego_item1').css({
				left: -e.pageX / 50 - 100,
				top: -e.pageY / 30 + 300
			});
			$('.s2__slide-lego_item2').css({
				left: -e.pageX / 60 + 700,
				top: e.pageY / 60 + 110
			});
		});




		//отмена перетаскивания картинок
		$("img, a").on("dragstart", function(e) { e.preventDefault(); });

		// вызов всплывающего окна
		$('.examples_popup').click(function(e) {
			e.preventDefault();
			$('#examples_popup').arcticmodal();
		});
		$('.sertificate_popup').click(function(e) {
			e.preventDefault();
			$('#sertificate_popup').arcticmodal();
		});
		$('.sborka_popup').click(function(e) {
			e.preventDefault();
			$('#sborka_popup').arcticmodal();
		});
		$('.razrez_popup').click(function(e) {
			e.preventDefault();
			$('#razrez_popup').arcticmodal();
		});
		$('.gotovka_popup').click(function(e) {
			e.preventDefault();
			$('#gotovka_popup').arcticmodal();
		});


		$('.s1__text3').click(function(e) {
			e.preventDefault();
			$('#opt-modal').arcticmodal();
		});
		$('.zayavka_modal_btn').click(function(e) {
			e.preventDefault();
			$('#zayavka-modal').arcticmodal();
		});
		$('.footer__callback-btn').click(function(e) {
			e.preventDefault();
			$('#callback-modal').arcticmodal();
		});
		$('.footer__tinkoff-btn').click(function(e) {
			e.preventDefault();
			$('#oplata-modal').arcticmodal();
		});

		$('.s4__btn-rassrochka').click(function(e) {e.preventDefault();$('#rassrochka-modal').arcticmodal();});
		$('.pech_tandyr').click(function(e) {e.preventDefault();$('#tovar6-modal').arcticmodal();});
		$('.kostrovische_3v1').click(function(e) {e.preventDefault();$('#tovar10-modal').arcticmodal();});
		$('.pech_pod_kazan').click(function(e) {e.preventDefault();$('#tovar5-modal').arcticmodal();});

		$('.s4__promo-btn').click(function(e) {e.preventDefault();$('#promo3in1-modal').arcticmodal();});

		// $('#buy-tovar1-modal').arcticmodal();



		// ===================================
		// ПЕРЕКЛЮЧЕНИЕ ФОТО ТОВАРОВ В ПОПАПАХ
		// ===================================
		$('.prodpopup__thumb-item').on('click', function () {
			var thisBgSrc = $(this).data('srcbg');
			$(this).parents('.prodpopup__left').find('.prodpopup__mainphoto').css('background-image', 'url(' + thisBgSrc + ')');
			$(this).parents('.prodpopup__left').find('.prodpopup__thumb-item').removeClass('active');
			$(this).addClass('active');
		});


		// Добавим активный класс на первое фото-миниатюру и активируем первое фото
		$('.prodpopup__thumb').each(function() {
			var firstBgUrl = $(this).find('.prodpopup__thumb-item:first-child').data('srcbg');
			$(this).find('.prodpopup__thumb-item:first-child').addClass('active');
			$(this).parents('.prodpopup__left').find('.prodpopup__mainphoto').css('background-image', 'url(' + firstBgUrl + ')');
		});

		// Показываем скрытые блоки внутри попапа Товара
		$('.prodpopup__main-links-descr').on('click', function () {
			$(this).parents('.prodpopup__right').find('.prodpopup__descr').addClass('active');
		});
		$('.prodpopup__descr-close').on('click', function () {
			$(this).parents('.prodpopup__right').find('.prodpopup__descr').removeClass('active');
		});

		$('.prodpopup__main-links-komplekt').on('click', function () {
			$(this).parents('.prodpopup__right').find('.prodpopup__komplekt').addClass('active');
			$(this).parents('.prodpopup').find('.prodpopup__komplektphoto').addClass('active');
		});
		$('.prodpopup__komplekt-close').on('click', function () {
			$(this).parents('.prodpopup__right').find('.prodpopup__komplekt').removeClass('active');
			$(this).parents('.prodpopup').find('.prodpopup__komplektphoto').removeClass('active');
		});

		// Вызов нужногго попапа при клике кнопки "ПОДРОБНЕЕ" в блоке "Выберите свою печь-барбекю"
		$('.s4__btn-prodabout, .s4__other-btn').on('click', function () {
			var thisPopapUrl = '#' + $(this).data('morepopup');
			$(thisPopapUrl).arcticmodal();
		});

		// Открываем попап "Покупка" и меняем надпись кнопки попкупки
		$('.prodpopup__btn-dopskidka').on('click', function () {
			var thisFormId = $(this).parents('.prodpopup').parent().attr('id');
			var thisBuyForm = '#buy-' + thisFormId;
			$(thisBuyForm).arcticmodal();
			$(thisBuyForm).find('.prodpopup__typebuyform-hidden').val('Получить дополнительную скидку');
			$(thisBuyForm).find('.prodpopup__btn-buy-wrap').html('Узнайте размер вашей доп. скидки');
			$(thisBuyForm).find('.prodpopup__price-rassrochka').hide();
			$(thisBuyForm).find('.prodpopup__price-skidka').show();
		});
		$('.prodpopup__btn-rassrochka').on('click', function () {
			var thisFormId = $(this).parents('.prodpopup').parent().attr('id');
			var thisBuyForm = '#buy-' + thisFormId;
			$(thisBuyForm).arcticmodal();
			$(thisBuyForm).find('.prodpopup__typebuyform-hidden').val('Купить товар в рассрочку');
			$(thisBuyForm).find('.prodpopup__btn-buy-wrap').html('Купить товар в <br>рассрочку');
			$(thisBuyForm).find('.prodpopup__price-skidka').hide();
			$(thisBuyForm).find('.prodpopup__price-rassrochka').show();
		});




		var examples_ppsldr = $('.examples_popupslider').owlCarousel({
			loop: true,
			center: true,
			margin: 0,
			nav: false,
			items: 1,
			autoHeight: true
		});
		$('.examples_popup-prev').click(function() {examples_ppsldr.trigger('prev.owl.carousel');});
		$('.examples_popup-next').click(function() {examples_ppsldr.trigger('next.owl.carousel');});


		$(".s1__scroll").click(function() {
			$([document.documentElement, document.body]).animate({
				scrollTop: $(".s2").offset().top
			}, 1000);
		});
		$(".s1__btn").click(function() {
			$('#quiz-modal').arcticmodal();
			// $([document.documentElement, document.body]).animate({
			// 	scrollTop: $(".quiz").offset().top - 50
			// }, 1000);
		});
		$(".s1__catalog").click(function(e) {
			e.preventDefault();
			$('#catalog-modal').arcticmodal();
			// $([document.documentElement, document.body]).animate({
			// 	scrollTop: $(".catalog").offset().top - 50
			// }, 1000);
		});


		// Запишем во все формы инпут с городом и будем записывать туда название города
		$('form').append('<input type="hidden" name="client_city" class="client_city_input"/>');


		// Выводим все города с JSON файла
		$.getJSON("../files/russia_cities.json", function(json) {
			for (var i = 0; i < json.length; i++) {
				$('.cities-modal__citylist').append('<div class="cities-modal__city" data-region="'+ json[i].region +'"><span class="span-city">' + json[i].city + '</span><span class="cities-modal__city-region"> ('+ json[i].region +')</span></div>');
			}
			$(".cities-modal__citylist").mCustomScrollbar({scrollInertia: 400});
		});


		$('.prodpopup__thumb').mCustomScrollbar({axis:"x", scrollInertia: 400});





		// Позываем окно "Это ваш город?"\
		var $cityDetect = $('.city-detect');
		setTimeout(function() {
			$cityDetect.addClass('active');
		}, 4000);
		$('.city-detect__btn-yes').on('click', function () {
			$('.client_city_input').val($('.s1__text1 .s1__city').text());
			$cityDetect.removeClass('active');
		});
		$('.city-detect__btn-no').on('click', function () {
			$cityDetect.removeClass('active');
			$('#cities-modal').arcticmodal();
		});
		$(document).on('click', '.cities-modal__city:not(.cities-modal__bukva)', function () {
			$cityDetect.removeClass('active');
			var thisCity1 = $(this).find('.span-city').text();
			var thisCity2 = $(this).text();
			$('.s1__city').text(thisCity1);
			$('.cities-modal__input input').val(thisCity2);
			$('#cities-modal').arcticmodal('close');
			$('.client_city_input').val(thisCity2);
		});

		// Покажем вопрос при клике на город
		$('.s1__city').on('click', function () {
			$('#cities-modal').arcticmodal();
		});
		$(document).on('click', '.eac-item', function () {
			$('#cities-modal').arcticmodal('close');
			$('.client_city_input').val($(this).text());
		});






		var options = {
			url: "../files/russia_cities.json",
			getValue: "city",
			list: {
				match: { enabled: true }
			}
		};

		$(".cities-modal__input input").easyAutocomplete(options);

		$(document).on("change keyup", ".input_for_city", function(e) {
			var theCity = $(this).val();
			if(theCity != '' && theCity.length > 2) {
				$('.s1__city').text(theCity);
			}
			$('.client_city_input').val(theCity);
			if(e.keyCode === 13) {
				$('#cities-modal').arcticmodal('close');
			}
		});







		//исправление бага ArcticModal в Firefox
		$('.arcticmodal-close').click(function() {
			$('body').css({'overflow-y': 'scroll'});
		});
		$("body").click(function(){$(this).css('overflow-y','visible')});



		// проверка инпута
		$('button[type=submit], input[type=submit]').on('click', function(e) {
			var tel_input = $(this).parent().parent().find('input[type=tel]');
			if(tel_input.val() == '' || tel_input.val().length < 17) {
				e.preventDefault();
				$('#modal_error').arcticmodal();
				tel_input.addClass('error-input');
			}
		});

		$('form input').focus(function() {
			if($(this).hasClass('error-input')) {
				$(this).removeClass('error-input');
			}
		});


		// скрытие placeholder
		$('input, textarea').on('focus', function () {
			var $this = $(this);
			var placehold = $this.attr('placeholder');
			$this.attr('data-placeholder', placehold);
			$this.attr('placeholder', '');
			// $this.data($this, 'placeholder', placehold);
		});
		$('input, textarea').on('blur', function () {
			var $this = $(this);
			$this.attr('placeholder', $this.data('placeholder'));
		});


		var $phoneInput = $('input[type="tel"]');
		$phoneInput.mask("+7 (999) 999-99-99");
		$phoneInput.focus(function() {
			if ( $(this).val() == '' ) { $(this).val('+7 ('); }
		});


		//AJAX email send
		$('form').submit(function(event) {
			event.preventDefault();
			var data = $(this).serialize();
			var type_form = $.trim($(this).find('input[name="type_form"]').val());
			var theCatalog = false;
			if($(this).hasClass('form__catalog-skidka30') || $(this).hasClass('quiz__form')) {
				theCatalog = true;
			}
			$.ajax({
				url       : '/sendEmail.php',
				data      : data,
				type      : 'post',
				success   : function() {
					$('.hidden-block input[type=text], .hidden-block input[type=tel], .hidden-block textarea').val('');
					$.arcticmodal('close');
					if(theCatalog == true) {
						$('#modal_thank_catalog').arcticmodal();
						var linkDownload = document.createElement('a');
						linkDownload.setAttribute('href','/files/catalog_bbq.pdf');
						linkDownload.setAttribute('download','Catalog BBQ');
						linkDownload.click();
					} else {
						$('#modal_thank').arcticmodal();
					}
					
				},
				error     : function(){
					$.arcticmodal('close');
					alert('Ошибка! Что-то пошло не так...');
				}
			});
		});





	//==========EoF==============
});
});

