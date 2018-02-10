window.onload = function(e){

	function menu (arguments) {
		var menu = document.querySelector('.menu');
		menu.classList.remove('js-menu--nojs');
		var navButton = document.querySelector('.navigation__btn');
		var menuItem = document.querySelectorAll('.menu__item');

		menuItem.forEach(function(elem) {
			elem.onclick = function() {
				menuToggle();
			}
		});
		
		navButton.onclick = function () {
			menuToggle();
		}

		function menuToggle () {
			navButton.classList.toggle('js-navigation__btn--open');
			menu.classList.toggle('js-menu--closed');
		}
	}
	

	function advantagesSlider (arguments) {
		var trigger = document.querySelector('.advantages__pointers-wrap');
		var advantages = document.querySelectorAll('.advantages__item');

		var counter = 0;
		advantages.forEach(function(elem) {
			trigger.insertAdjacentHTML('beforeEnd',' <button type="button" data-value="'+counter+'" class="advantages__pointer"></button> ');
			counter++
		});

		var pointer = document.querySelectorAll('.advantages__pointer');
		pointer[0].classList.add('advantages__pointer--selected');

		pointer.forEach(function(elem) {
			elem.onclick = function () {
				advantages.forEach(function(elem) {
					elem.classList.remove('advantages__item--selected');
				});
				pointer.forEach(function(elem) {
					elem.classList.remove('advantages__pointer--selected');
				});
				var elementNumber = this.getAttribute('data-value');
				advantages[elementNumber].classList.add('advantages__item--selected');
				pointer[elementNumber].classList.add('advantages__pointer--selected');
			}
		});
	}


	function newsOpen() {
		var newsBtn = document.querySelector('.news__btn a');
		var hiddenNews = document.querySelectorAll('.js-news__item--hidden');
		var isOpenFlag = false;

		newsBtn.onclick = function () {
			toggleNewsVisibility();
			if (isOpenFlag) {
				isOpenFlag = false;
				newsBtn.innerHTML = ('Показать новости');
			} else {
				isOpenFlag = true;
				newsBtn.innerHTML = ('Скрыть новости');
			}
		}

		function toggleNewsVisibility() {
			hiddenNews.forEach(function(elem) {
				elem.classList.toggle('js-news__item--hidden');
			});
		}
	}

	function Popup(which){

		var btn = document.querySelector(which.button);
		var content = document.querySelector(which.content);
		var exit = document.querySelector(which.close);

		btn.onclick = function () {
			content.classList.toggle('js-popup-login');
			
		}

		exit.onclick = function () {
			content.classList.toggle('js-popup-login');
		}
	}

	var loginPopup = new Popup({
		button: '.js-open-login-popup',
		content: '.js-popup-login',
		close: '.js-exit-login-btn'
	});

	menu();
	advantagesSlider();
	newsOpen();

}