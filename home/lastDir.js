var lastDir = {
    init: function() {
        chrome.storage.local.get('lastDir', function(items) {
            if (items.lastDir === undefined) {
                return;
            }
            lastDir.root = document.getElementById('grid')
            items.lastDir.forEach(function(dir) {
                lastDir.addEntry(dir);
            });
        });
    },
    addEntry: function(dir) {
        var listDir = document.createElement('li');
        var picture = document.createElement('div');
        var img = document.createElement('img');
        var span = document.createElement('span');
        picture.className = "picture";
        span.textContent = dir.name;
        picture.appendChild(img);
        listDir.appendChild(picture);
        listDir.appendChild(span);
        chrome.fileSystem.restoreEntry(dir.id, function(entry) {
            reader = entry.createReader();
            reader.readEntries(function(results) {
                results.forEach(function(item) {
                    item.file(function(file) {
                        if (file.type.startsWith("image") && img.src === "") {
                            img.src = URL.createObjectURL(file);
                        }
                    });
                })
            });
        });
        listDir.addEventListener('click', function(event) {
            chrome.fileSystem.restoreEntry(dir.id, function(entry) {
                open(entry, true);
            });
        });
        lastDir.root.appendChild(listDir);
    },
    save: function(entry) {
        var newItem = {
            name: entry.name,
            id: chrome.fileSystem.retainEntry(entry)
        };
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
    }

}
