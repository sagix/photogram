var onLoad = function() {
    document.getElementById('print').addEventListener('click', function() {
        window.print();
    });
    jsonWriter.init("save.json");
    csvReader.init(',', '"');

    chrome.runtime.getBackgroundPage(function(b) {
        tmp.init(b.template, b.element);
        loadDirEntry(b.entry, b.fromHistory)
    })

};

window.addEventListener('load', onLoad);

function loadDirEntry(chosenEntry, withSave) {
    if (chosenEntry !== undefined && chosenEntry.isDirectory) {
        jsonWriter.entry = chosenEntry;
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
    var dataArgs = {
        load: withSave ? jsonReader.load : csvReader.load,
    }

    entries.forEach(function(item, index, array) {

        item.file(function(file) {
            if (file.type.startsWith("image")) {
                elements.add(
                    URL.createObjectURL(file),
                    file.name.replace(/\.[^/.]+$/, "")
                );
            } else if (!withSave && file.name === "data.csv") {
                dataArgs.file = file;
            } else if (withSave && file.name === "save.json") {
                dataArgs.file = file;
            }
            if (index === array.length - 1) {
                handleEnd(dataArgs);
            }
        }, function(e) {
            if (index === array.length - 1) {
                handleEnd(dataArgs);
            }
            errorHandler(e);
        });
    });
}

function handleEnd(dataArgs) {
    elements.sort();
    dataArgs.load(dataArgs.file, function(result) {
        elements.merge(result);
        tmp.addToContainer(elements.elementList);
    })

}

function toArray(list) {
    return Array.prototype.slice.call(list || [], 0);
}

function errorHandler(e) {
    console.error(e);
}
