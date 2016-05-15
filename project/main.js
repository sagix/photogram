window.addEventListener('load', function() {
    gui.init();
    data.init(',', '"');
    tmp.init();

    chrome.runtime.getBackgroundPage(function(b) {
        loadDirEntry(b.entry, b.fromHistory)
    })

});
function loadDirEntry(chosenEntry, withSave) {
    if (chosenEntry !== undefined && chosenEntry.isDirectory) {
        elements.entry = chosenEntry;
        var dirReader = chosenEntry.createReader();

        var entries = [];

        // Keep calling readEntries() until no more results are returned.
        var readEntries = function() {
            dirReader.readEntries(function(results) {
                if (!results.length) {
                    listResults(entries, withSave);
                } else {
                    entries = entries.concat(toArray(results));
                    readEntries();
                }
            }, errorHandler);
        };

        // Start reading the directory.
        readEntries();
    }
}

function listResults(entries, withSave) {
    entries.forEach(function(item, index, array) {

        item.file(function(file) {
            if (file.type.startsWith("image")) {
                elements.add(
                    URL.createObjectURL(file),
                    file.name.replace(/\.[^/.]+$/, "")
                );
            } else if (!withSave && file.name === "data.csv") {
                console.log("data");
                data.load(file, bindData);
            } else if (withSave && file.name === "save.json") {
                elements.load(file);
            }
            if (index === array.length - 1) {
                handleEnd(withSave);
            }
        }, function(e) {
            if (index === array.length - 1) {
                handleEnd(withSave);
            }
        });
    });
}

function handleEnd(withSave) {
    elements.sort();
    elements.bind();
    gui.addToContainer(elements.elementList);
    if (withSave) {
        bindElement();
    } else {
        bindData();
        displayForm(0, true);
    }
}

function toArray(list) {
    return Array.prototype.slice.call(list || [], 0);
}

function bindElement() {
    Array.prototype.forEach.call(document.getElementsByClassName('ele'),
        function(ele, index, array) {
            for (var element of elements.elementList) {
                if (element.id === ele.dataset.id) {
                    var action = element.action;
                    if (action !== undefined) {
                        elements.setAction(element.id, ele.getElementsByClassName('action')[0], action);
                    }
                }
            }
        }
    );
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
