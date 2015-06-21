
document.getElementById('chooseDir').addEventListener('click', function (){
  chrome.fileSystem.chooseEntry({
	  type: "openDirectory"
  },  function(entry, fileEntries) {
	  loadDirEntry(entry);
  });
});

var container = document.getElementById('container');
var form = document.getElementById('form')
form.addEventListener('submit', function(evt){
	var index = form.index.value;
	ele = document.getElementsByClassName('ele')[index];
	var tag = document.getElementById('form-tag')
	ele.getElementsByClassName('tag')[0].textContent = form.tag.value;
	ele.getElementsByClassName('title')[0].textContent = form.title.value;
	bindForm(parseInt(index) + 1);
	evt.preventDefault();
})
document.getElementById('print').addEventListener('click', function (){
  window.print();
});

function bindForm(index){
	ele = document.getElementsByClassName('ele')[index];
	document.getElementById('form-index').value = index;
	document.getElementById('form-img').src = ele.getElementsByClassName('img')[0].src;
	var tag = document.getElementById('form-tag')
	tag.value = ele.getElementsByClassName('tag')[0].textContent;
	tag.select();
	document.getElementById('form-title').value = ele.getElementsByClassName('title')[0].textContent;
}
  
function loadDirEntry(chosenEntry) {
  if (chosenEntry.isDirectory) {
    var dirReader = chosenEntry.createReader();
       dirReader.readEntries (function(results) {
		   var index = 0;
          results.forEach(function(item) {
				console.log(item);
				item.file(function (file){
						
					  if(file.type.startsWith("image")){
							var ele = document.createElement("div");
							ele.className="ele"
							ele.dataset.index = index;
							var tag = document.createElement('span');
							tag.className="tag"
							tag.textContent = ++index;
							var title = document.createElement('span');
							title.type="text"
							title.className="title"
							var img = document.createElement('img');
							img.className = "img"
							img.src = URL.createObjectURL(file);
							ele.appendChild(img);
							ele.appendChild(tag);
							ele.appendChild(title);
							container.appendChild(ele);
							
							ele.addEventListener('click', function(evt){
								displayForm(evt.currentTarget.dataset.index);
							})
							if(index === 1){
								displayForm();								
							}
					  }
				});
		  });
      }, errorHandler);  
  }
}

function displayForm(index){
	  form.className = "display";
	  bindForm(index === undefined ? 0 : index);
}

function errorHandler(e) {
  console.error(e);
}