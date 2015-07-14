var elements = {
    elementList: Array(),
    index: 0,
    chooseDir: function() {
        chrome.fileSystem.chooseEntry({
            type: "openDirectory"
        }, function(entry, fileEntries) {
            elements.entry = entry;
            loadDirEntry(entry);
        });
    },
    add: function(url, sequence) {
        this.elementList.push({
            id: sequence,
            sequence: sequence,
            url: url,
            action: ""
        })
    },
    sort: function() {
        this.elementList.sort(function(a, b) {
            var intA = parseInt(a.sequence),
                intB = parseInt(b.sequence);
            if (intA < intB) {
                return -1;
            } else if (intA > intB) {
                return 1;
            } else {
                if (a.sequence < b.sequence) {
                    return -1;
                } else if (a.sequence > b.sequence) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
    },
    update: function(id, sequence, action) {
        for (var element of this.elementList) {
            if (element.id === id) {
                element.sequence = sequence;
                element.action = action;
            }
        }
    },
    save: function() {
        this.entry.getFile("save.json", {
                create: true,
                exclusive: false
            },
            function(entry) {
                entry.createWriter(function(fileWriter) {
                    var blob = new Blob([JSON.stringify(elements.elementList, function(key, value) {
                        if (key === "url") {
                            return undefined;
                        }
                        return value;
                    })], {
                        type: 'text/plain'
                    });
                    fileWriter.write(blob);
                });
            })
    },
    setAction: function(id, node, value) {
        for (var element of this.elementList) {
            if (element.id === id) {
                element.action = value;
            }
        }
        node.textContent = value;
        applyFontSize(node, .2, 2);
    }
};
