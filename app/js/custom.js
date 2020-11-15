$(window).on('load', function () {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
		$('body').addClass('ios');
	} else {
		$('body').addClass('web');
	};
	setTimeout(function () {
		$('body').removeClass('loaded');
	}, 300);

});
/* viewport width */
function viewport() {
	var e = window,
		a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return {
		width: e[a + 'Width'],
		height: e[a + 'Height']
	}
};

var y_offsetWhenScrollDisabled = 0,
	offset = 0;

$(window).scroll(function () {
	y_offsetWhenScrollDisabled = $(window).scrollTop();
});

function lockScroll() {
	offset = y_offsetWhenScrollDisabled;
	$('html').addClass('scrollDisabled');
	$('html').css('margin-top', -y_offsetWhenScrollDisabled);
}

function unlockScroll() {
	$('html').removeClass('scrollDisabled');
	$('html').css('margin-top', '');
	$('html, body').animate({
		scrollTop: offset
	}, 0);
}
/* viewport width */
$(function () {
	/* placeholder*/
	$('input, textarea').each(function () {
		var placeholder = $(this).attr('placeholder');
		$(this).focus(function () {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function () {
			$(this).attr('placeholder', placeholder);
		});
	});
	/* placeholder*/

	$('.button-nav').click(function () {
		$(this).toggleClass('active'),
			$('.main-nav-list').slideToggle();
		return false;
	});


	function getCursorPos(e) {
		let x = e.clientX;
		let y = e.clientY;

		return {
			x,
			y
		};
	}





	$('.objective__text').mousemove(function (e) {
		const $this = $(this),
			$wrapp = $this.closest('.objectives'),
			$img = $wrapp.children('.objectives__pic');
		let obj_href = $wrapp.data('hover-img'),
			coordinates = getCursorPos(e),
			x = coordinates.x,
			y = coordinates.y;

		$img.css({
			'left': `${x - $img.width() / 2}px`,
			'top': `${y - $img.height() / 2}px`,
		})
	})

	$('.objective__text').mouseenter(function () {
		const $this = $(this),
			$wrapp = $this.closest('.objectives'),
			$img = $wrapp.children('.objectives__pic');
		let obj_href = $this.closest('.objective').attr('data-hover-img');

		$img.html(`<img alt="objective-img" alt='objective' src=${obj_href}>`);
		$img.stop().fadeIn(140);
		$img.css({
			'position': 'fixed',
			'cursor': 'none',
			'pointer-events': 'none',
		})


	})
	$('.objective__text').mouseleave(function () {
		const $this = $(this),
			$wrapp = $this.closest('.objectives'),
			$img = $wrapp.children('.objectives__pic');

		$img.stop().fadeOut(100);

	})

	const VideoPlayer = {
		vid: $('.js-video'),
		startPlay: function () {
			this.vid[0].play();
			setTimeout(() => {
				this.showControls();
			}, 500);
		},
		stopPlay: function () {
			this.hideControls();
			this.vid[0].load();
		},
		hideControls: function () {
			this.vid.removeAttr('controls');
		},
		showControls: function () {
			this.vid.attr('controls', 'true');
		},
	}

	let player = VideoPlayer;

	$('.js-play').click(function () {
		player.startPlay();
		$('.video-box').addClass('playing');
		$('.video-info').addClass('hide');
	})

	$('.js-vid-close').click(function () {
		player.stopPlay();
		$('.video-box').removeClass('playing');
		$('.video-info').removeClass('hide');
	})

	player.vid[0].onended = () => {
		player.stopPlay();
		$('.video-box').removeClass('playing');
		$('.video-info').removeClass('hide');
	};



	
	function randomFade() {
		var count = 0;
		var maxDelay = 4000;
		var minSpeed = 2000;
		var maxSpeed = 2500;
		var fadeTo = 1;

		$('.anim-text.slick-current span').each(function () {
			var delay = Math.ceil(Math.random() * maxDelay);
			var speed = maxSpeed + Math.ceil(Math.random() * (minSpeed - maxSpeed));
			count++;
			$(this).delay(delay).fadeTo(speed, fadeTo, function () {
				count--;
				if (count == 0) {
				}
			});
		});

	}

	function randomFadeOut(){
		var count = 0;
		var maxDelay = 2000;
		var minSpeed = 1000;
		var maxSpeed = 1500;
		var fadeTo = 0;
		$('.anim-text.slick-current span').each(function () {
			var delay = Math.ceil(Math.random() * maxDelay);
			var speed = maxSpeed + Math.ceil(Math.random() * (minSpeed - maxSpeed));
			count++;
			$(this).delay(delay).fadeTo(speed, fadeTo, function () {
				count--;
				if (count == 0) {
				}
			});
		});
	}

		$('.js-main-slider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 11000,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		cssEase: 'linear',
		draggable: false,
		dots: false,
		arrows: false,
		pauseOnHover: false,
	

	});

	let anim_counter = 0;

	if (anim_counter == 0) {
		setTimeout(() => {
			randomFade();
		}, 0, setTimeout(function () {
			randomFadeOut();
			
			anim_counter = 1;
		}, 9000));
	}

	$('.js-main-slider').on("init", function() {
		randomFade();
	})

	$('.js-main-slider').slick('reinit');

	$('.js-main-slider').on("beforeChange", function (){
		setTimeout(function() {
			randomFadeOut();
		}, 9000)
		
	})

	$('.js-main-slider').on("afterChange", function (){
		randomFade();
	})



	$('.js-rules-slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		// fade: true,
		cssEase: 'linear',
		variableWidth: true,
		draggable: false,
		prevArrow: '',
		nextArrow: $('.js-next-rule'),
		prevArrow: $('.js-prev-rule'),
		responsive: [{
			breakpoint: 1279,
			settings: {
				variableWidth: false,
			}
		}, ]
	})

	$('.rule-title').click(function () {
		if (!$(this).closest('.slick-slide').hasClass('slick-current')) {
			$(this).closest('.slick-slider').slick('slickNext');
		}
	})

	function openModal(modal) {
		lockScroll();
		modal.fadeIn(100).addClass('shown');
	}

	function closeModal(modal) {
		unlockScroll();
		modal.removeClass('shown').fadeOut(50);
	}

	$('a').not('.social').click(function () {


		let $link = $(this);


		if ($(`${$(this).attr('href')}.modal`).length) {
			let id = $(this).attr('href');
			let $modal = $(`${id}.modal`);

			openModal($modal);

			return false;
		}
	})

	$('.modal .close').click(function () {
		const $modal = $(this).closest('.modal');
		closeModal($modal)
	})


	function setCurrentOnClick(el) {
		$(el).click(function () {
			var link = $(this),
				id = link.attr('href').replace('#', '');
			if (id == "")
				return;

			var id = anchor = $('*[data-anchor="' + id + '"]')
			if (anchor.attr('data-anchor')) {
				var pos_top = anchor.offset().top;
				if (anchor === '#home') {
					$('body,html').animate({
						scrollTop: 0
					}, 700);
				} else {
					$('body,html').animate({
						scrollTop: pos_top - '30'
					}, 700);
				}
				$(el).removeClass('active');
				link.addClass('active');
				return false;
			}

		});
	}

	function setCurrentOnScroll(el) {
		var scrollPos = $(document).scrollTop();
		$(el).each(function () {
			var link = $(this),
				id = link.attr('href').replace('#', ''),
				anchor = $('*[data-anchor="' + id + '"]'),
				pos = anchor.offset();
			pos = pos.top;

			if (pos - 30 <= scrollPos && pos + anchor.height() - 30 > scrollPos) {
				$(el).removeClass("active");
				link.addClass("active");
			}
		});
	}

	function navAnchors(el) {

		setCurrentOnClick(el);
		$(window).on("scroll", function () {
			setCurrentOnScroll(el);
		});
	}

	navAnchors(".faq__nav-link");

	function setFixedOnScroll(el, start_box, stop_box) {
		let $el = $(el),
			el_offset = $el.offset(),
			w_pos = window.scrollY;

		start_pos = $(start_box).offset().top;
		stop_pos = $(stop_box).offset().top + $(stop_box).height();

		if (start_pos < w_pos && w_pos < (stop_pos - $el.height())) {
			$el.addClass('fixed').removeClass('bottom');

		} else if (w_pos > (stop_pos - $el.height())) {
			$el.removeClass('fixed').addClass('bottom');
		} else {
			$el.removeClass('fixed bottom');
		}
	}


	


	function setWowOffset(el, offset) {

		if (Array.isArray(el)) {
			for (let i = 0; i <= el.length; i++) {
				let $item = $(el[i]);

				$item.attr('data-wow-offset', offset);
			}
		} else {
			$(el).attr('data-wow-offset', offset);
		}
	}

	function setWowdelay(el, delay) {

		if (Array.isArray(el)) {
			for (let i = 0; i <= el.length; i++) {
				let $item = $(el[i]);

				$item.attr('data-wow-delay', delay);
			}
		} else {
			$(el).attr('data-wow-delay', delay);
		}
	}

	const wow_list = [
		'.anim-text span',
		'.targets__alert',
		'.targets__left',
		'.objectives__title',
		'.objective',
		'.objectives__bottom',
		'.goals__title',
		'.goal',
		'.video-info__text-box',
		'.rules__title span',
		'.clock__caption-box',
		'.faq-info__list'
	]

	const wowOffset_list = [
		'.targets__alert',
		'.targets__left',
		'.objective',
		'.objectives__bottom',
		'.goal',
		'.faq-info__list'

	]

	const wowOffset_list_2 = [

	]

	const wowDelay_list = [
		'.targets__alert',
	]

	const wowDelay_list_2 = [
		'.targets__left',
	]

	$('.goal').each(function (i) {
		$delay = `1.${i}s`;
		setWowdelay(this, $delay)
	})

	$('.anim-text span').each(function (i) {
		$delay = `${i + 2}s`;
		setWowdelay(this, $delay)
	})


	setWowOffset(wowOffset_list, 300);
	setWowOffset(wowOffset_list_2, 200);
	setWowdelay(wowDelay_list, '1s');
	setWowdelay(wowDelay_list_2, '2.5s');



	for (let i = 0; i <= wow_list.length; i++) {
		$(wow_list[i]).addClass('wow');
	}

	wow = new WOW({
		mobile: true,
		live: true,
		offset: 100,
		delay: '2000'
	})




	function parallaxScroll(el, modify) {
		var scrolled = $(window).scrollTop();
		$(el).css('top', (0 + (scrolled / 2 * modify - modify * 1000)) + 'px');
	}

	function parallaxCursorMove(el, modify) {

		$(window).mousemove(function (e) {
			let x = getCursorPos(e).x,
				b_pos = $(el).css('right').replace('px', '');
			console.log((b_pos + (x / 4 * modify)))

			$(el).css('right', (b_pos + (x / 4 * modify)) + 'px');
		})

	}

	if ($(window).width() >= 992) {
		setFixedOnScroll('.faq__nav-box', '.faq-info', '.faq-info');
		// setFixedOnScroll('.faq__parallax', '.faq-info', '.faq-info');
		$(document).scroll(function () {
			setFixedOnScroll('.faq__nav-box', '.faq-info', '.faq-info');
			// setFixedOnScroll('.faq__parallax', '.faq-info', '.faq-info');
		})

		$(window).bind('scroll', function (e) {
			let el_offset = $('.faq__parallax').offset;
			parallaxScroll('.faq__parallax', .55);
		});
	}

	// $(window).mousemove(function (e) {
	// 	parallaxCursorMove('.faq__parallax', .25);
	// });



	wow.init();



	function realClock() {
		var delay = 333;

		var interval = setInterval(function () {
			var currentdate = new Date($.now());

			seconds_deg = (currentdate.getSeconds() * 6 + 180) % 360;
			$(".clock__second").css("transform", "rotate(" + seconds_deg + "deg)");

			seconds_deg = (currentdate.getSeconds() * 6 + 179) % 360;
			$(".clock__second-shadow").css("transform", "rotate(" + seconds_deg + "deg)");

			minutes_deg =
				(currentdate.getMinutes() * 6 + 180) % 360 +
				currentdate.getSeconds() / 10;
			$(".clock__minute").css("transform", "rotate(" + minutes_deg + "deg)");

			hours_deg =
				(currentdate.getHours() * 30 + 180) % 360 + currentdate.getMinutes() / 2;
			$(".clock__hour").css("transform", "rotate(" + hours_deg + "deg)");
		}, delay);
	}

	realClock()

	//canvas



});


var handler = function () {

	function blockVH(el, dif) {
		var block = $(el),
			vh = $(window).height();

		if (dif) {
			block.css({
				'min-height': vh - dif,
			});
		} else {
			block.css({
				'min-height': vh,
			});
		}
	}

	var height_footer = $('footer').height();
	var height_header = $('header').height();

	var viewport_wid = viewport().width;
	var viewport_height = viewport().height;

	blockVH('.main-section', height_header);

	if (viewport_wid >= 991) {
		blockVH('.video-section');
		blockVH('.faq-info');

		if (viewport_height < 1300) {
			blockVH('.faq__nav-box');
			blockVH('.faq-info__item');
		}
	} else {
		$('canvas').remove();
	}

}

$(window).bind('load', handler);
$(window).bind('resize', handler);