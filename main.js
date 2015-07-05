
document.getElementById('chooseDir').addEventListener('click', function (){
  chrome.fileSystem.chooseEntry({
	  type: "openDirectory"
  },  function(entry, fileEntries) {
	  loadDirEntry(entry);
  });
});

var looping = false;
var container = document.getElementById('container');
var form = document.getElementById('form');
form.addEventListener('submit', function(evt){
	var index = form.index.value;
	ele = document.getElementsByClassName('ele')[index];
	var tag = document.getElementById('form-tag')
	ele.getElementsByClassName('tag')[0].textContent = form.tag.value;
	ele.getElementsByClassName('title')[0].textContent = form.title.value;
  if(looping){
	   bindForm(parseInt(index) + 1);
  }else{
      form.className = "";
  }
	evt.preventDefault();
})
document.getElementById('form-close').addEventListener('click', function(evt){
  form.className = "";
})
document.getElementById('print').addEventListener('click', function (){
  window.print();
});

function bindForm(index, selectTitle){
	ele = document.getElementsByClassName('ele')[index];
  if(ele !== undefined){
  	document.getElementById('form-index').value = index;
  	document.getElementById('form-img').src = ele.getElementsByClassName('img')[0].src;
  	var tag = document.getElementById('form-tag')
  	tag.value = ele.getElementsByClassName('tag')[0].textContent;
      var  title = document.getElementById('form-title');
  	title.value = ele.getElementsByClassName('title')[0].textContent;
      if(selectTitle){
          title.select();
      }else{
          tag.select();
      }
  }else{
    form.className = "";
  }
}

function loadDirEntry(chosenEntry) {
  if (chosenEntry.isDirectory) {
    var dirReader = chosenEntry.createReader();
       dirReader.readEntries (function(results) {
          results.forEach(function(item, index, array) {
				console.log(item);
				item.file(function (file){

					  if(file.type.startsWith("image")){
                          var tagText = file.name.replace(/\.[^/.]+$/, "");
							var ele = document.createElement("div");
							ele.className="ele"
							ele.dataset.index = index;
                            ele.dataset.tag = tagText;
							var tag = document.createElement('span');
							tag.className="tag"
							tag.textContent =tagText;
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
                                if(evt.srcElement.className !== "title"){
    								displayForm(evt.currentTarget.dataset.index, false);
                                    evt.preventDefault();
                                }
							});
                            title.addEventListener('click', function(evt){
								displayForm(evt.currentTarget.parentElement.dataset.index, false, true);
                                evt.preventDefault();
							});
					  }else if (file.name === "data.csv"){
                          loadFile(file);
					      console.log(file.type);
					  }
                      if (index === array.length - 1) {
                          bindData();
                         displayForm(0, true);
                     }
				});
		  });
      }, errorHandler);
  }
}

function loadFile(file){
    var fileReader = new FileReader();
    fileReader.onload = function(f){
        loadData(fileReader.result);
    }
    fileReader.readAsText(file);
}

var datas = new Array();
var datasLength = 0;

function loadData(data){
    var allTextLines = data.split(/\r\n|\n/);

    for (var i=0; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length === 2) {
            datas["tag" + data[0]] = data[1];
            datasLength++;
        }
        var data = allTextLines[i].split(',"');
        if (data.length === 2) {
            datas["tag" + data[0]] = data[1].slice(0, -1);
            datasLength++;
        }
    }
    bindData();
}

function bindData(){
    if(datasLength > 0){
        Array.prototype.forEach.call(document.getElementsByClassName('ele'),
            function (ele, index, array){
            var data = datas["tag" + ele.dataset.tag];
            if(data !== undefined){
                ele.getElementsByClassName('title')[0].textContent = data;
            }
            if(index === 0){
               displayForm(0, true);
            }
        });
    }
}

function displayForm(index, loop, title){
	  form.className = "display";
	  bindForm(
          index === undefined ? 0 : index,
          title === undefined ? false : title
      );
    looping  = (loop === undefined ? false : loop);
}

function errorHandler(e) {
  console.error(e);
}
