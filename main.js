function print() {
  document.getElementById('output').innerHTML += Array.prototype.join.call(arguments, ', ');
}

window.onload = function() {
  var title = document.getElementById('title');
  var content = document.getElementById('content');
  var ctrl = false;
  
  content.onkeydown = function(ev) {
    switch(ev.keyCode) {
      case 17:
        ctrl = true;
        break;
      case 13:
        try {
          if(ctrl) { ev.preventDefault(); eval(content.value); }
        } catch(ex) { print(ex.stack); }
        break;
      default:
        break;
    }
  };
  
  content.onkeyup = function(ev) {
    switch(ev.keyCode) {
      case 17:
        ctrl = false;
        break;
      default:
        break;
    }
  };
};
