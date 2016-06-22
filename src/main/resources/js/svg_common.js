function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

function tooltips_event( node, description, color ){
    const tooltips = createInformativeNode(node, description, color );
    var isSelected = false;
    document.body.appendChild(tooltips)

    tooltips.firstChild.addEventListener( "mousedown",  function( event ) {
      event = event || window.event;
      isSelected = true;
    } );

    tooltips.firstChild.addEventListener( "mousemove",  function( event ) {
      event = event || window.event;
      if( isSelected )
        tooltipsPosition( event, tooltips, -20, tooltips.offsetWidth * .3 );
    }, true );
    tooltips.firstChild.addEventListener( "mouseup",  function( event ) {
      event = event || window.event;
      isSelected = false;
    }, true );

  node.addEventListener( "mouseenter",  function( event ) {
    event = event || window.event;
    if( ! hasClass(tooltips, "NotClosable" ) && !isSelected ){
      tooltipsPosition( event, tooltips, 40, 30 );
      tooltips.style.display = 'block';
    }
  } );
  node.addEventListener( "mouseleave",  function( event ) {
    event = event || window.event;
    if( ! hasClass(tooltips, "NotClosable" ) && !isSelected ){
      tooltips.style.display = 'none';
    }
  } );
  node.addEventListener( "mousemove",  function( event ) {
    event = event || window.event;
    if( ! hasClass(tooltips, "NotClosable" ) && !isSelected )
      tooltipsPosition( event, tooltips, 40, 30 );
  } );
  node.addEventListener( "click",  function( event ) {
    event = event || window.event;
    if( hasClass(tooltips, "NotClosable" ) ){
      tooltips.style.display = 'none';
      removeClass(tooltips, "NotClosable" );
    }
    else{
      tooltips.style.display = 'block';
      addClass(tooltips, "NotClosable" );
      tooltipsPosition( event, tooltips, 40, 30 );
    }
  } );
}

function createInformativeNode( node, text, color ){
  var tooltips          = document.createElement('div');
  var taker             = document.createElement('div');
  var p                 = document.createElement('p');
  taker.style.height    = '2em';
  tooltips.appendChild( taker );
  tooltips.id           = 'tooltips-'+node.id;
  tooltips.className    = 'grools';
  tooltips.style.display= 'none';
  p.style.color         = color;
  p.innerHTML           = text;
  tooltips.appendChild( p );
  return tooltips;
}


function tooltipsPosition( event, tooltips, ySshift, xShift ){
  tooltips.style.top = (event.pageY + ySshift - window.scrollY)+"px";
  tooltips.style.left= (event.pageX - xShift  - window.scrollX)+"px";
}
