function print() {
  document.getElementById('output').innerHTML += arguments.join(', ');
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
        if(ctrl) { ev.preventDefault(); eval(this.value); }
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
  }
};
