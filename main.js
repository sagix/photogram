
document.getElementById('chooseDir').addEventListener('click', function (){
  chrome.fileSystem.chooseEntry({
	  type: "openDirectory"
  },  function(entry, fileEntries) {
	  loadDirEntry(entry);
  });
});

document.getElementById('print').addEventListener('click', function (){
  window.print();
});

var container = document.getElementById('container');
  
function loadDirEntry(chosenEntry) {
  if (chosenEntry.isDirectory) {
    var dirReader = chosenEntry.createReader();
       dirReader.readEntries (function(results) {
		   var index = 1;
          results.forEach(function(item) {
				console.log(item);
				item.file(function (file){
						
					  if(file.type.startsWith("image")){
							var ele = document.createElement("div");
							ele.className="ele"
							var tag = document.createElement('input');
							tag.type="text"
							tag.className="tag"
							tag.value = index++;;
							var title = document.createElement('input');
							title.type="text"
							title.className="title"
							title.placeholder = "title";
							var img = document.createElement('img');
							img.src = URL.createObjectURL(file);
							ele.appendChild(img);
							ele.appendChild(tag);
							ele.appendChild(title);
							container.appendChild(ele);
					  }
				});
		  });
		  document.getElementsByTagName('input')[0].select();
      }, errorHandler);  
  }
}

function errorHandler(e) {
  console.error(e);
}