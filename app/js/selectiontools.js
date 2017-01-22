/* Changes the formatting of selected text to bold / italic via tooltip buttons
 *
 */
(function () {

	function toggleBold() {
	    var range, sel;
	    if (window.getSelection) {
	        sel = window.getSelection();
	        if (sel.getRangeAt) {
	            range = sel.getRangeAt(0);
	        }
	        document.designMode = "on";
	        document.execCommand('enableObjectResizing', false, false);
	        document.execCommand('enableInlineTableEditing', false, false);
	        if (range) {
	            sel.removeAllRanges();
	            sel.addRange(range);
	        }
	        document.execCommand("bold", null, false);
	        document.designMode = "off";
	    } else if (document.selection && document.selection.createRange && document.selection.type != "None") {
	        // IE < 9
	        range = document.selection.createRange();
	        range.execCommand("bold", null, false);
	    }
	}

	function toggleItalic() {
	    var range, sel;
	    if (window.getSelection) {
	        sel = window.getSelection();
	        console.log(document.activeElement);
	        if (sel.getRangeAt) {
	            range = sel.getRangeAt(0);
	        }
	        document.designMode = "on";
	        document.execCommand('enableObjectResizing', false, false);
	        document.execCommand('enableInlineTableEditing', false, false);
	        if (range) {
	            sel.removeAllRanges();
	            sel.addRange(range);
	        }
	        document.execCommand("italic", null, false);
	        document.designMode = "off";

	    } else if (document.selection && document.selection.createRange && document.selection.type != "None") {
	        // IE < 9
	        range = document.selection.createRange();
	        range.execCommand("italic", null, false);
	    }
	}

	function getSelectionCoords() {
	    var doc = window.document;
	    var range, sel, rects, rect;
	    var x = 0, y = 0;
	    var toolsheight = 50;

	    if (window.getSelection) {
	        sel = window.getSelection();
	        if (sel.rangeCount) {
	            range = sel.getRangeAt(0).cloneRange();
	            if (range.getClientRects) {
	                range.collapse(true);
	                rects = range.getClientRects();
	                if (rects.length > 0) {
	                    rect = rects[0];
	                }
	                x = rect.right;
	                y = rect.top - toolsheight + window.scrollY;
	            }
	            // Fall back to inserting a temporary element
	            if (x == 0 && y == 0) {
	                var span = document.createElement("span");
	                if (span.getClientRects) {
	                    // Ensure span has dimensions and position by
	                    // adding a zero-width space character
	                    span.appendChild( document.createTextNode("\u200b") );
	                    range.insertNode(span);
	                    rect = span.getClientRects()[0];
	                    x = rect.right;
	                    y = rect.top - toolsheight + window.scrollY;
	                    var spanParent = span.parentNode;
	                    spanParent.removeChild(span);

	                    // Glue any broken text nodes back together
	                    spanParent.normalize();
	                }
	            }
	        }
	    } else if (document.selection) {
	    	// IE < 9
	        if (document.selection.type != "Control") {
	            range = document.selection.createRange();
	            range.collapse(true);
	            x = range.boundingRight;
	            y = range.boundingTop - 40;
	        }
	    }

	    return { x: x, y: y };
	}

	function init() {
		// Get the DOM elements
		var main = document.getElementsByTagName("main")[0];
		var selectiontools = document.getElementById("selectiontools");
		var btnBold = document.getElementById("btn-bold");
		var btnItalic = document.getElementById("btn-italic");

		// Now add the button events
		btnBold.addEventListener("click", function(event) { 
			event.preventDefault(); 
			event.stopPropagation(); 

			toggleBold(); 

			// Firefox adds these two attributes to the <main> element, we remove them again. Better solution needed.
			main.removeAttribute("_moz_abspos");
			main.removeAttribute("_moz_resizing");
		});

		btnItalic.addEventListener("click", function(event) { 
			event.preventDefault(); 
			event.stopPropagation(); 

			toggleItalic(); 

			// Firefox adds these two attributes to the <main> element, we remove them again. Better solution needed.
			main.removeAttribute("_moz_abspos");
			main.removeAttribute("_moz_resizing");
		});

		// Prevent mouseup events from bubbling if buttons are clicked
		btnBold.addEventListener("mouseup", function(event) { 
			event.stopPropagation(); 
		});
		btnItalic.addEventListener("mouseup", function(event) { 
			event.stopPropagation(); 
		});

		// Mouse and key events for document
		document.addEventListener("mouseup", function(event) {

			// Timer/delay is needed for getting the correct selection length
			setTimeout((function(){
				if (window.getSelection) {
					if (window.getSelection().toString().length > 0) {
						var coords = getSelectionCoords();
						selectiontools.style.position = "absolute";
						selectiontools.style.top = coords.y + "px";
						selectiontools.style.left = coords.x + "px";
						selectiontools.className = "active";
					} else {
						selectiontools.className = '';
					}
				}
	    }), 10);
		});

		document.addEventListener("mousedown", function() {
			selectiontools.className = '';
		});

		document.addEventListener("keydown", function() {
			selectiontools.className = '';
		});
		
	}
			
	init();

})();