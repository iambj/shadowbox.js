$(document).ready(function () {
	$('.lb').each(function () {
		$(this).bind('click', function (event) {
			event.preventDefault();
			lightbox($(this));
		});
	});
});


function lightbox(i) {
	if ($('div#loader').length == 0) {
		var test;
		var bigName = $(i).attr("alt");

		//var bigName = $(i).attr('alt');
		var caption = ($(i).attr('title') ? $(i).attr('title') : "");

		$('body').append('<div id="loader"><img src="loader3.png" alt="loader" width="50" height="50" /><div class="loaderBg"><div class="loaderText">Loading...</div></div></div>');
		var bigImg = new Image();
		$(bigImg).load(function () {
			//$(this).hide();
			var imgWidth;
			var imgHeight;
			$('body').append('<div id="blackScreen"></div>');
			$('#blackScreen').fadeIn();
			$('#blackScreen').bind('click', removeLightBox);
			$(document).keyup(function (event) {
				if (event.which == 27) {
					removeLightBox();
				};
			});
			$('#blackScreen').html('<div id="photoBoxBorder"><div id="x_button"></div><div id="photoBox"></div><div id="caption">' + caption + '</div></div>');
			$('#photoBoxBorder').hover(

			function () {
				$('#x_button').css('display', 'block');
			}, function () {
				$('#x_button').css('display', 'none');
			});
			$('#x_button').bind('click', function () {
				$('#photoBoxBorder').remove();
			});
			$('#photoBox').html(bigImg);
			$('#loader').remove();
			imgWidth = $(bigImg).width();
			imgHeight = $(bigImg).height();
			$('#photoBoxBorder').css({
				'margin-left': -(imgWidth / 2),
				'margin-top': -(imgHeight / 2)
			});
		}).error(function () {
			$('#loader').animate({
				width: 200,
				'margin-left': -100
			}, 500);
			$('#loader .loaderText').animate({
				opacity: 0,
				height: 45
			}, 500, function () {
				$(this).html("There was an error loading the image.").animate({
					opacity: 1.0
				}, 500).delay(3000).animate({
					opacity: 0
				}, 500, function () {
					$('#loader').fadeOut(750, function () {
						$(this).remove();
					});
				});

			});
		}).attr('src', bigName);
	};

};

function removeLightBox(i) {
	$('#blackScreen').fadeOut("slow", function () {
		$(this).remove();
		$(document).unbind("keypress");
	});
};