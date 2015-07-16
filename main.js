window.addEventListener('load', function() {
    form.init();
    gui.init();
    data.init(',', '"');
});

document.addEventListener('DOMContentLoaded', function() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function(el) {
        el.textContent = chrome.i18n.getMessage(el.getAttribute('data-i18n'));
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-attr]'), function(el) {
        var data = el.getAttribute('data-i18n-attr').split(':');
        el.setAttribute(data[0], chrome.i18n.getMessage(data[1]));
    });
});

function saveLastEntry(entry) {
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
        }
        chrome.storage.local.set(items);
    });
}

function loadDirEntry(chosenEntry) {
    if (chosenEntry !== undefined && chosenEntry.isDirectory) {
        saveLastEntry(chosenEntry);
        var dirReader = chosenEntry.createReader();
        dirReader.readEntries(function(results) {
            results.forEach(function(item, index, array) {
                item.file(function(file) {
                    if (file.type.startsWith("image")) {
                        elements.add(
                            URL.createObjectURL(file),
                            file.name.replace(/\.[^/.]+$/, "")
                        );
                    } else if (file.name === "data.csv") {
                        data.load(file, bindData);
                    }
                    if (index === array.length - 1) {
                        elements.sort();
                        gui.addToContainer(elements.elementList);
                        bindData();
                        gui.update();
                        displayForm(0, true);
                    }
                });
            });
        }, errorHandler);
    }
}

function bindData() {
    if (data.length > 0) {
        Array.prototype.forEach.call(document.getElementsByClassName('ele'),
            function(ele, index, array) {
                var action = data.get(ele.dataset.id);
                if (action !== undefined) {
                    elements.setAction(ele.dataset.id, ele.getElementsByClassName('action')[0], action);
                }
                if (index === 0) {
                    displayForm(0, true);
                }
            });
    }
}

function errorHandler(e) {
    console.error(e);
}
