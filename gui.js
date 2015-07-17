var gui = {
    index: 0,
    init: function() {
        this.container = document.getElementById('group-ele')
        document.getElementById('form-close').addEventListener('click', function(evt) {
            form.close();
        })
        document.getElementById('print').addEventListener('click', function() {
            window.print();
        });
        document.getElementById('save').addEventListener('click', function() {
            elements.save();
        });
        document.getElementById('btn-folder-image').addEventListener('click', elements.chooseDir);
        this.listLastDir = document.getElementById('list-last-dir');
        this.loadLastDir();
        this.update();
    },
    update: function() {
        if (this.index > 0) {
            document.getElementById('btn-folder-image').style.display = "none";
            document.getElementById('menu').style.display = "";
            document.getElementById('list-last-dir').style.display = "none";
        } else {
            document.getElementById('btn-folder-image').style.display = "";
            document.getElementById('menu').style.display = "none";
            document.getElementById('list-last-dir').style.display = "";
        }
    },
    addToContainer: function(elementList) {
        for (var ele of elementList) {
            this.addNode(ele.url, ele.sequence);
        }
    },
    addNode: function(url, sequenceText) {
        var ele = document.createElement("div");
        ele.className = "ele"
        ele.dataset.index = this.index;
        ele.dataset.id = sequenceText;
        var sequence = document.createElement('span');
        sequence.className = "sequence"
        sequence.textContent = sequenceText;
        var action = document.createElement('span');
        action.type = "text"
        action.className = "action"
        var img = document.createElement('img');
        img.className = "img"
        img.src = url;
        ele.appendChild(img);
        ele.appendChild(sequence);
        ele.appendChild(action);
        this.container.appendChild(ele);

        ele.addEventListener('click', function(evt) {
            if (evt.srcElement.className !== "action") {
                displayForm(evt.currentTarget.dataset.index, false);
                evt.preventDefault();
            }
        });
        action.addEventListener('click', function(evt) {
            displayForm(evt.currentTarget.parentElement.dataset.index, false, true);
            evt.preventDefault();
        });
        this.index++;
    },

    loadLastDir: function() {
        chrome.storage.local.get('lastDir', function(items) {
            if (items.lastDir === undefined) {
                return;
            }
            for (var dir of items.lastDir) {
                var listDir = document.createElement('li');
                listDir.textContent = dir.name;
                listDir.dataset.name = dir.name;
                listDir.addEventListener('click', function(event) {
                    for (var dir of items.lastDir) {
                        if (dir.name === event.currentTarget.dataset.name) {
                            chrome.fileSystem.restoreEntry(dir.id, function(entry) {
                                loadDirEntry(entry, true);
                            });
                        }
                    }
                });
                gui.listLastDir.appendChild(listDir);
            }
        });
    }
};

function hasOverflow(node) {
    return node.scrollHeight > node.clientHeight;
}

function displayForm(index, loop, action) {
    form.open()
    form.bind(
        index === undefined ? 1 : index,
        action === undefined ? false : action
    );
    form.looping = (loop === undefined ? false : loop);
}
