var lastDir = {
    init: function() {
        var bundle = JSON.parse(localStorage.getItem('lastDir'));
        if (bundle === null || bundle.lastDir === null) {
            return;
        }
        lastDir.root = document.getElementById('grid')
        bundle.lastDir.forEach(function(dir) {
            lastDir.addEntry(dir);
        });
    },
    addEntry: function(dir) {
        var listDir = document.createElement('li');
        var picture = document.createElement('div');
        var img = document.createElement('img');
        var span = document.createElement('span');
        var deleteButton = document.createElement('button');
        picture.className = "picture";
        span.textContent = dir.name;
        deleteButton.classList.add('btn-delete');
        deleteButton.textContent = '\u2715';
        picture.appendChild(img);
        listDir.appendChild(picture);
        listDir.appendChild(span);
        listDir.appendChild(deleteButton);
        listDir.dataset.id = dir.id;
        chrome.fileSystem.restoreEntry(dir.id, function(entry) {
            reader = entry.createReader();
            reader.readEntries(function(results) {
                results.forEach(function(item) {
                    item.file(function(file) {
                        if (file.type.startsWith("image") &&
                            file.size > 10000 &&
                            img.src === "") {
                            img.src = URL.createObjectURL(file);
                        }
                    });
                })
            });
        });
        deleteButton.addEventListener('click', function(event) {
            lastDir.delete(dir);
            event.stopPropagation();
        });
        listDir.addEventListener('click', function(event) {
            chrome.fileSystem.restoreEntry(dir.id, function(entry) {
                open(entry, true);
            });
        });
        lastDir.root.appendChild(listDir);
    },
    removeEntry: function(dir) {
        lastDir.root.removeChild(document.querySelector('[data-id="' + dir.id + '"]'));
    },
    save: function(entry) {
        var newItem = this.createItem(entry)
        chrome.storage.local.get('lastDir', function(items) {
            if (items.lastDir == undefined) {
                items.lastDir = new Array();
            }
            var inArray = false;

            for (var dir of items.lastDir) {
                if (dir.name === newItem.name) {
                    inArray = true;
                    break;
                }
            }
            if (!inArray) {
                items.lastDir.push(newItem);
                lastDir.addEntry(newItem);
                chrome.storage.local.set(items);
            }
        });
    },
    delete: function(dir) {
        chrome.storage.local.get('lastDir', function(items) {
            var index = -1;
            items.lastDir.forEach(function(v, i) {
                if (this.id == v.id) index = i;
            }, dir);
            if (index > -1) {
                items.lastDir.splice(index, 1);
            }
            lastDir.removeEntry(dir);
            chrome.storage.local.set(items);
        });
    },
    createItem: function(entry) {
        return {
            name: entry.name,
            id: chrome.fileSystem.retainEntry(entry)
        };
    }

}
