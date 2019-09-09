function A_BhiDir (name, children) {
	this.name = name;
	this.children = children;
	for(var i=0;i<this.children.length;i++) {
		this.children[i].parent = this;
	}

	this.add = function(child) {
		this.children.push(child);
		child.parent = this;
	}
}

function A_BhiFile (name, content='') {
	this.name = name;
	this.content = content;
}

window.onload = function() {
	var ad = document.getElementById('add-file');
	var fs = document.getElementById('filesystem');
	var ip = document.getElementById('input');
	var op = document.getElementById('output');

	var files = new A_BhiDir(
		'testdir0', [
			new A_BhiDir('testdir1', [
				new A_BhiFile('test1.txt'),
				new A_BhiDir('testdir2', [
					new A_BhiFile('test2.txt')
				])
			]),
			new A_BhiFile('test3.txt')
		]
	);
	var currentDirectory = files;

	function displayDirectory(dir) {
		currentDirectory = dir;
		while(fs.firstChild) { fs.removeChild(fs.firstChild); }
		for(var i=0;i<dir.children.length;i++) {
			if(dir.children[i] instanceof A_BhiDir) {
				var node = document.createElement('div');	
				node.classList.add('dir');
				node.innerHTML = dir.children[i].name + '/';
				node._dir = dir.children[i];
				node.onclick = function() {
					displayDirectory(this._dir);
				}
				fs.appendChild(node);
			}
			else if(dir.children[i] instanceof A_BhiFile) {
				var node = document.createElement('div');	
				node.classList.add('file');
				node.innerHTML = dir.children[i].name;
				node._file = dir.children[i];
				node.onclick = function() {
					var _this = this;
					ip.value = this._file.content;
					ip._file = this._file;
				}
				fs.appendChild(node);
			}
		}
		var node = document.createElement('div');	
		node.classList.add('dir');
		node.innerHTML = 'Back';
		node._dir = dir;
		node.onclick = function() {
			if(this._dir.parent) {
				displayDirectory(this._dir.parent);
			}
		};
		fs.appendChild(node);
	}

	displayDirectory(files);

	ad.onkeydown = function(ev) {
		var node = this.value.charAt(this.value.length - 1) === '/' ? new A_BhiDir(this.value.substring(0, this.value.length - 1), []) : new A_BhiFile(this.value);
		if(ev.keyCode === 13) {
			ev.preventDefault();
			currentDirectory.add(node);
			displayDirectory(currentDirectory);
		}
	};

	ip.onkeydown = function(ev) {
		// https://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea
		if(ev.keyCode === 9) {
			ev.preventDefault();
			var start = this.selectionStart;
			var end = this.selectionEnd;
			this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
			this.selectionStart = this.selectionEnd = start + 2;
		}
		else if(ev.keyCode === 18) { this.alt = true; }
		else if(ev.keyCode === 83 && this.alt === true) {
			ev.preventDefault();
			if(this._file) {
				this._file.content = this.value;
			}
		}
		else if(ev.keyCode === 13 && this.alt === true) {
			ev.preventDefault();
			op.innerHTML = this.value;
		}
	};

	ip.onkeyup = function(ev) {
		if(ev.keyCode === 18) { this.alt = false; }
	}
}
