window.addEventListener('load', function(){
    form.init();
    elements.init();
    data.init(',', '"');
})

function loadDirEntry(chosenEntry) {
  if (chosenEntry !== undefined && chosenEntry.isDirectory) {
    var dirReader = chosenEntry.createReader();
       dirReader.readEntries (function(results) {
          results.forEach(function(item, index, array) {
				item.file(function (file){
					  if(file.type.startsWith("image")){
						  elements.add(
                             URL.createObjectURL(file),
                             file.name.replace(/\.[^/.]+$/, "")
                          );
					  }else if (file.name === "data.csv"){
                          data.load(file, bindData);
					      console.log(file.type);
					  }
                      if (index === array.length - 1) {
                          bindData();
                          elements.update();
                         displayForm(0, true);
                     }
				});
		  });
      }, errorHandler);
  }
}

function bindData(){
    if(data.length > 0){
        Array.prototype.forEach.call(document.getElementsByClassName('ele'),
            function (ele, index, array){
                var title = data.get(ele.dataset.tag);
                if(title !== undefined){
                    ele.getElementsByClassName('title')[0].textContent = title;
                }
                if(index === 0){
                   displayForm(0, true);
                }
        });
    }
}

function errorHandler(e) {
  console.error(e);
}
