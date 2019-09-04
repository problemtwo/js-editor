var cvs;

function print() {
  document.getElementById('output').innerHTML += Array.prototype.join.call(arguments, ', ');
}

function canvas(width, height) {
  cvs = document.createElement('canvas');
  cvs._ctx = cvs.getContext('2d');
  cvs.style.width = '50vw';
  cvs.style.height = '100vh';
  cvs.style.position = 'absolute';
  cvs.style.left = '50vw';
  cvs.style.top = '0px';
  document.body.appendChild(cvs);
}

function rect(r, g, b, x, y, w, h) {
  if(cvs) {
    cvs.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
    cvs.fillRect(x, y, w, h);
  }
}

window.onload = function() {
  var title = document.getElementById('title');
  var input = document.getElementById('input');
  var ctrl = false;
  
  window.onkeydown = function(ev) {
    switch(ev.keyCode) {
      case 17:
        ctrl = true;
        break;
      case 13:
        try {
          if(ctrl) { ev.preventDefault(); eval(input.value); }
        } catch(ex) { print(ex.stack); }
        break;
      default:
        break;
    }
  };
  
  window.onkeyup = function(ev) {
    switch(ev.keyCode) {
      case 17:
        ctrl = false;
        break;
      default:
        break;
    }
  };
};
