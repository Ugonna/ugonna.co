/* Author: Ugonna Nwakama
 * 2012
 */
 
$(document).ready(function(){
	// This code is executed after the DOM has been completely loaded
	
	$('nav a, footer a.home, .slide_nav').click(function(e){
		
		// If mouse click was used for navigation, find the current page, remove it as current
		// and mark the page moved to as current
		var index = $('a').index(this);
		
		$('nav .current').removeClass('current');
		$($('nav li')[index]).addClass('current'); 
		/* Wrapped with $(...) because just $('nav li')[index] returns an object of
		 * type [object XrayWrapper [object HTMLLIElement]]. 
		 * All this just for keyboard navigation. *Sigh* */
		
		// If a link has been clicked, scroll the page to the link's hash target:
		$.scrollTo( this.hash || 0, 1000);
		
		e.preventDefault();
	});
	
	$("a[data-popup]").live('click', function(e) {
		  // Prevent the link from actually being followed
        e.preventDefault();
        window.open($(this)[0].href);
   });
	
	// Hacked up key navigation
	$('body').keydown(function(e) { // Replaced keypress with keydown. keypress doesn't work on Chrome
		
		if (/^(input|textarea)$/i.test(e.target.nodeName) || e.target.isContentEditable) {
			return;
		}
		var direction = null;
		
		switch (e.keyCode) {
			case 37: // left arrow
				direction = 'prev'; break;
			case 39: // right arrow
			case 32: // space
				direction='next'; break;
		}
		
		// jQuery is a hell of a drug
		if (direction != null) {
			var current = $('#head_nav_menu li.current');
			var moveTo = current[direction](); 
			// Equivalent to current.next() or current.previous()
			
			// If at the first or last page, don't bother
			if (moveTo.length == 0) {
				return;
			}
			
			/* Cancel the key from actually working. This prevents some flickering
			 * as the key press actually inches the scroll a bit before activating
			 * the click.
			 */
			e.preventDefault();
			
			moveTo.find('a').click();
			moveTo.addClass('current');
			current.removeClass('current');
		}
	});
	
});

/*Parallax effect JS */
function calcParallax(tileheight, speedratio, scrollposition) {
	return ((tileheight) - (Math.floor(scrollposition / speedratio) % (tileheight+1)));
}

function calcPaddingAndWidth() {
	//BEGIN Set padding for window depending on resolution 
	var padding = 0;
	var innerWidth = $(window).innerWidth();
	
	/* Replaced with jQuery $(window).innerWidth()
	if( typeof( window.innerWidth ) == 'number' ) {
		// All browsers except IE 8-
		innerWidth = window.innerWidth;
		
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6-8 in 'standards compliant mode'
		innerWidth = document.documentElement.clientWidth
	}
	*/
	
	// If the client width is less than 960, leave padding at 0 and
	// width of each section = client width
	if (innerWidth > 960) {
		padding = (innerWidth - 960) / 2;
	} /*else {
		//$('.section').css({'width': innerWidth + 'px'}); // HACK! Minus 50 pixels to account for scrollbar
	}*/
	
	document.getElementById('head').style.paddingLeft = 
			document.getElementById('foot').style.paddingLeft = padding + 'px';
			
	$('.section').css({'padding-left': padding + 'px'});
	//END Set padding for window depending on resolution *********
}

window.onload = function() {

	//BEGIN Implement parallax effect
	window.onscroll = function() {
		
		var posX = (document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : window.pageXOffset;
		var posY = (document.documentElement.scrollTop) ? document.documentElement.scrollTop : window.pageYOffset;
  
		var ground = document.getElementsByTagName('body')[0];
		var groundparallax = calcParallax(326, 8, posX);
		ground.style.backgroundPosition = '0 ' + groundparallax + 'px'; 

		/*var clouds = document.getElementById('clouds');
		var cloudsparallax = calcParallax(400, .5, posY);
		clouds.style.backgroundPosition = '0 ' + cloudsparallax + 'px'; */
	}

	document.getElementById('parallax').onscroll = function() {
		var posY = (this.scrollLeft) ? this.scrollLeft : this.pageYOffset;
		var j = calcParallax(53, 16, posY);
		//console.log('scroll js: '+ j);
		document.getElementById('javascriptcode').style.backgroundPosition = j + 'px 0';
	}
	//END Implement parallax effect *********
	
	calcPaddingAndWidth();
}

$(window).resize(function() {
	calcPaddingAndWidth();
});
