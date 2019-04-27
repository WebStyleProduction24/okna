"use strict";

$(function(){


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

		
});

