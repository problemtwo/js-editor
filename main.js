function print() {
  document.getElementById('output').innerHTML += Array.prototype.join.call(arguments, ', ');
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
