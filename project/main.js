var onLoad = function() {
    document.getElementById('print').addEventListener('click', function() {
        window.print();
    });
    jsonWriter.init("save.json");
    csvReader.init(',', '"');

    chrome.runtime.getBackgroundPage(function(b) {
        tmp.init(b.template, b.element);
        loadDirEntry(b.entry)
    })

};

window.addEventListener('load', onLoad);

function loadDirEntry(chosenEntry) {
    if (chosenEntry !== undefined && chosenEntry.isDirectory) {
        jsonWriter.entry = chosenEntry;
        var dirReader = chosenEntry.createReader();
        var entries = [];

        // Keep calling readEntries() until no more results are returned.
        var readEntries = function() {
            dirReader.readEntries(function(results) {
                if (!results.length) {
                    listResults(entries);
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

function listResults(entries) {
    var dataArgs = {
        compile :function(){
            var result = {};
            if(this.saveFile !== undefined){
                result.file = this.saveFile;
                result.load = jsonReader.load;
            } else if(this.sourceFile !== undefined){
                result.file = this.sourceFile;
                result.load = csvReader.load;
            } else {
                result.load = function(file){
                    console.error("data.csv file not found");
                }
            }
            return result;
        }
    }

    entries.forEach(function(item, index, array) {

        item.file(function(file) {
            if (file.type.startsWith("image")) {
                elements.add(
                    URL.createObjectURL(file),
                    file.name.replace(/\.[^/.]+$/, "")
                );
            } else if (file.name === "data.csv") {
                dataArgs.sourceFile = file;
            } else if (file.name === "save.json") {
                dataArgs.saveFile = file;
            }
            if (index === array.length - 1) {
                handleEnd(dataArgs.compile());
            }
        }, function(e) {
            if (index === array.length - 1) {
                handleEnd(dataArgs.compile());
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
