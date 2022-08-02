'use strict';

////////////////// HTML Elements //////////////////

const btnClose = document.querySelector('.nav__btn-close');
const btnOpen = document.querySelector('.header__btn-open');
const navMenuMobile = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.nav__list__link');
const btnMinus = document.querySelector('.item__btn-minus');
const btnPlus = document.querySelector('.item__btn-plus');
const itemNb = document.querySelector('.item__number');
const notif = document.querySelector('.header__cart-icon--notif');
const shopIcon = document.querySelector('.header__cart-icon');
const btnAdd = document.querySelector('.btn-add');
const cart = document.querySelector('.cart');
const cartProduct = document.querySelector('.cart__product');
const cartEmpty = document.querySelector('.cart__empty');
const cartPrice = document.querySelector('.cart__price');
const priceContainer = document.querySelector('.product-info__price');
const btnDeleteProduct = document.querySelector('.icon-delete');
const slides = document.querySelectorAll('.slide-select');
const swiperModal = document.querySelector('.swiper-modal');
const btnCloseModal = document.querySelector('.btn-close-modal');

////////////////// Reusable Functions //////////////////

// Hide Element
const hideEl = (element) => {
	element.classList.add('hidden', 'hidden-cart');
};

// Show Element
const displayEl = function (element) {
	element.classList.remove('hidden', 'hidden-cart');
};

////////////////// Nav Mobile //////////////////

const openMenu = () => {
	navMenuMobile.classList.remove('hidden');
	navLinks.forEach((link) => {
		link.classList.remove('hidden');
	});
	overlay.classList.remove('hidden');
};

const closeMenu = () => {
	navMenuMobile.classList.add('hidden');
	navLinks.forEach((link) => {
		link.classList.add('hidden');
	});
	overlay.classList.add('hidden');
};

btnOpen.addEventListener('click', openMenu);
btnClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
navLinks.forEach((link) => link.addEventListener('click', closeMenu));

////////////////// Modal Slider //////////////////

const openSliderModal = (e) => {
	displayEl(swiperModal);
	displayEl(overlay);
};

const closeSliderModal = () => {
	hideEl(swiperModal);
	hideEl(overlay);
};

slides.forEach((slide) => {
	slide.addEventListener('click', openSliderModal);
});
overlay.addEventListener('click', closeSliderModal);
btnCloseModal.addEventListener('click', closeSliderModal);

////////////////// Slider //////////////////

// var swiper = new Swiper('.mySwiper', {
// 	slidesPerView: 1,
// 	loop: true,

// 	navigation: {
// 		nextEl: '.swiper-button-next',
// 		prevEl: '.swiper-button-prev',
// 	},

// 	// pagination: {
// 	// 	el: '.swiper-pagination',
// 	// 	clickable: true,
// 	// 	// renderBullet: function (index, className) {
// 	// 	// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
// 	// 	// },
// 	// },

// 	thumbs: {
// 		swiper: thumbsSwiper,
// 	},

// 	keyboard: {
// 		enabled: true,
// 		onlyInViewport: false,
// 	},
// });

// Thumbs
var swiper = new Swiper('.mySwiper', {
	loop: false,
	spaceBetween: 10,
	slidesPerView: 4,
	freeMode: false,
	watchSlidesProgress: false,
});

// Slider
var swiper2 = new Swiper('.mySwiper2', {
	loop: true,
	spaceBetween: 0,
	// preloadImages: true,
	// lazy: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	thumbs: {
		swiper: swiper,
		multipleActiveThumbs: false,
	},
});

// Thumbs Modal
var swiper = new Swiper('.mySwiper4', {
	loop: false,
	spaceBetween: 10,
	slidesPerView: 4,
	freeMode: false,
	watchSlidesProgress: false,
});

// Slider Modal
var swiper2 = new Swiper('.mySwiper3', {
	loop: true,
	spaceBetween: 0,
	// preloadImages: true,
	// lazy: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	thumbs: {
		swiper: swiper,
		multipleActiveThumbs: false,
	},
});

////////////////// Show Shopping Cart //////////////////
shopIcon.addEventListener('click', function () {
	if (cart.classList.contains('hidden')) {
		displayEl(cart);
	} else {
		hideEl(cart);
	}
});

////////////////// Price //////////////////

const definePrice = (priceBefore, discount) => {
	const priceAfter = priceBefore * (discount / 100);

	priceContainer.innerHTML = '';

	// Display UI ---> Description
	const html = `
		<div class="product-info__price__after">$${priceAfter.toFixed(2)}</div>
		<span class="product-info__price__discount">${discount}%</span>
		<div class="product-info__price__before">$${priceBefore.toFixed(2)}</div>
	`;

	priceContainer.insertAdjacentHTML('afterbegin', html);

	// Update Price (UI) ---> Cart
	let itemCalc = Number(itemNb.textContent);
	itemCalc = 0;

	// Update Notif
	const updateNotif = () => {
		if (itemCalc > 0) {
			displayEl(notif);
			displayEl(notif);
			displayEl(cartProduct);
			hideEl(cartEmpty);
		} else {
			hideEl(notif);
			hideEl(notif);
			displayEl(cartEmpty);
			hideEl(cartProduct);
		}
	};

	const updatePrice = () => {
		cartPrice.innerHTML = '';

		// Display UI --> Cart
		const html = `
		<span>$${priceAfter.toFixed(2)}</span> x <span>${itemCalc}</span>
		<span class="cart__product__info-final-price">$${(
			priceAfter * itemCalc
		).toFixed(2)}</span>
		`;

		cartPrice.insertAdjacentHTML('afterbegin', html);

		itemNb.textContent = itemCalc;
		notif.textContent = itemCalc;
	};

	// Increase number of item by 1 and update UI
	btnPlus.addEventListener('click', function () {
		itemCalc++;
		updatePrice();
		updateNotif();
	});

	// Decrease number of item by 1 and update UI
	btnMinus.addEventListener('click', function () {
		// Guard Clause
		if (itemCalc === 0) return;
		itemCalc--;
		updatePrice();
		updateNotif();
	});

	btnDeleteProduct.addEventListener('click', function () {
		if (itemCalc === 0) return;
		itemCalc = 0;
		updatePrice();
		updateNotif();
	});
};

console.log(btnDeleteProduct);

definePrice(500, 50);

// Slider Modal
