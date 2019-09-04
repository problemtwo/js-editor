var cvs;

function print() {
  document.getElementById('output').innerHTML += Array.prototype.join.call(arguments, ', ');
}

function canvas() {
  cvs = document.createElement('canvas');
  cvs._ctx = cvs.getContext('2d');
  cvs.style.width = '50vw';
  cvs.style.height = '90vh';
  cvs.width = window.innerWidth * 0.5;
  cvs.height = window.innerHeight * 0.9;
  cvs.style.position = 'absolute';
  cvs.style.left = '50vw';
  cvs.style.top = '0px';
  document.body.appendChild(cvs);
}

function rect(r, g, b, x, y, w, h) {
  if(cvs) {
    cvs._ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
    cvs._ctx.fillRect(x, y, w, h);
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
