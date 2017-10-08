var codeIndex = 0;
var countDown;
function Keypress( evt ) {
	var letter = String.fromCharCode( evt.keyCode );
	if ( letter == Code[codeIndex] ) {
		clearTimeout( countDown );
		codeIndex ++;
		if ( codeIndex == Code.length ) {
			activate();
			resetCode();
		} else {
			countDown = setTimeout( function() { 
				console.log('RESET TIMOUT');
				resetCode();
			}, 1000 );
		}
	} else {
		clearTimeout( countDown );
		resetCode();
	}
};

function resetCode() {
	codeIndex = 0;
};

var createStyleText = function( styleDefs ) {
	var st = '';
	for ( var selector in styleDefs ) {
		st += '\n' + selector + ' {';
		var props = styleDefs[selector];
		for ( var k in props ) {
			if ( props[k] )
				st += k + ':' + props[k] + ';';
			else
				st += k;
		}
		st += '}';
	}
	return st;
};

function attachStyles() {
	var cssStyles = {
		'@font-face': {
			'font-family': '"MKfont"',
			'src': 'url("mortalkombat1.ttf")',
			'src': 'url("mortalkombat1.ttf") format("truetype")',
			'font-weight': 'normal',
			'font-style': 'normal'
		},
		'body, body *': {
			'font-family': '"MKfont" !important',
			'cursor': 'none'
		},
		'#bloody-cursor' : {
			'position': 'fixed',
			'height': '32px',
			'width': '16px',
			'background': 'url( "BloodyCursor.png" ) left top',
			'animation': 'play 0.8s steps(4) infinite',
		},
		'@keyframes play': {
		   '100% { background-position: -64px; }' : ''
		}
	};
	// BUILD CSS CONTENT
	var styleText = createStyleText( cssStyles );
	// CREATE STYLE TAG ELEMENT
	var styleEl = document.createElement( 'style' );
	styleEl.id = 'mk-styles';
	styleEl.setAttribute( 'type', 'text/css' );
	// GET DOCUMENT HEAD
	var headEl = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
	headEl.appendChild( styleEl );

	// INSERT STYLE TEXT
	if ( styleEl.styleSheet ) { // IE
		styleEl.styleSheet.cssText = styleText;
	} else {
		styleEl.textContent = styleText;
	}
};

function attachCursor() {
	var cursorEl = document.createElement( 'div' );
	cursorEl.id = 'bloody-cursor';
	document.body.appendChild( cursorEl );

	function positionCursor( evt ) {
		var x = evt.clientX;
		var y = evt.clientY;
		
		cursorEl.style.left = x + 'px';
		cursorEl.style.top = y + 'px';
	};
	addEvent( window, "mousemove", positionCursor );
};

function activate() {
	// ATTACH BLOODCODE CSS TO DOM
	if ( !document.getElementById( 'mk-styles' ) ) {
		attachStyles();
		attachCursor();
	}
};

function addEvent( element, eventName, callback ) {
	if ( element.addEventListener ) {
		element.addEventListener( eventName, callback, false );
	} else if ( element.attachEvent ) {
		element.attachEvent( "on" + eventName, callback );
	}
};


var Code = 'ABACABB';

addEvent( window, "keydown", Keypress );
