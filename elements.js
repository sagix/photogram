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
        this.sorted = true;
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
                    var truncated = false;
                    fileWriter.onwriteend = function(e) {
                        if (!truncated) {
                            truncated = true;
                            this.truncate(this.position);
                            return;
                        }
                        console.log('Write completed.');
                    };
                    fileWriter.write(blob);
                });
            })
    },
    load: function(file) {
        var fileReader = new FileReader();
        fileReader.onload = function(f) {
            elements.bind(JSON.parse(fileReader.result));
        }
        fileReader.readAsText(file);
    },
    setAction: function(id, node, value) {
        for (var element of this.elementList) {
            if (element.id === id) {
                element.action = value;
            }
        }
        warnForDuplicate(node, value);
        node.textContent = value;
        applyFontSize(node.parentNode, node, .2, 2);
    },
    bind: function(save) {
        if (this.sorted === true) {
            if (save === undefined) {
                save = this.tmpSave;
            }
            if (save !== undefined) {
                for (var ele of this.elementList) {
                    for (var s of save) {
                        if (ele.id === s.id) {
                            ele.sequence = s.sequence;
                            ele.action = s.action;
                            save.splice(save.indexOf(s), 1);
                            break;
                        }
                    }
                }
                bindElement();
            }
        } else {
            this.tmpSave = save;
        }
    }
};

function warnForDuplicate(node, value) {
    if (value.length > 0 && (value.slice(0, value.length / 2) === value.slice(value.length / 2, value.length) || value.slice(0, value.length / 3) === value.slice(value.length / 3, 2 * value.length / 3))) {
        node.parentNode.parentNode.style.backgroundColor = 'red';
    } else {
        node.parentNode.parentNode.style.backgroundColor = '';
    }
}
