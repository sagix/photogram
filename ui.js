var elements = {
    index : 0,
    init : function(){
        this.container = document.getElementById('container')
        document.getElementById('form-close').addEventListener('click', function(evt){
          form.close();
        })
        document.getElementById('print').addEventListener('click', function (){
          window.print();
        });
        document.getElementById('btn-folder-image').addEventListener('click', this.chooseDir);
        this.update();
    },
    chooseDir : function (){
          chrome.fileSystem.chooseEntry({
              type: "openDirectory"
          },  function(entry, fileEntries) {
              loadDirEntry(entry);
          });
    },
    add : function (url, tagText){
        var ele = document.createElement("div");
        ele.className="ele"
        ele.dataset.index = this.index;
        ele.dataset.tag = tagText;
        var tag = document.createElement('span');
        tag.className="tag"
        tag.textContent =tagText;
        var title = document.createElement('span');
        title.type="text"
        title.className="title"
        var img = document.createElement('img');
        img.className = "img"
        img.src = url;
        ele.appendChild(img);
        ele.appendChild(tag);
        ele.appendChild(title);
        this.container.appendChild(ele);

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
        this.index++;
    },
    update: function(){
        if(this.index > 0){
            document.getElementById('btn-folder-image').style.display = "none";
            document.getElementById('print').style.display = "";
        }else{
            document.getElementById('btn-folder-image').style.display = "";
            document.getElementById('print').style.display = "none";
        }
    }
};

function displayForm(index, loop, title){
	  form.open()
	  form.bind(
          index === undefined ? 1 : index,
          title === undefined ? false : title
      );
    form.looping = (loop === undefined ? false : loop);
}
