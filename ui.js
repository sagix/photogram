var elements = {
    elementList: Array(),
    index: 0,
    init: function() {
        this.container = document.getElementById('group-ele')
        document.getElementById('form-close').addEventListener('click', function(evt) {
            form.close();
        })
        document.getElementById('print').addEventListener('click', function() {
            window.print();
        });
        document.getElementById('btn-folder-image').addEventListener('click', this.chooseDir);
        this.update();
    },
    chooseDir: function() {
        chrome.fileSystem.chooseEntry({
            type: "openDirectory"
        }, function(entry, fileEntries) {
            loadDirEntry(entry);
        });
    },
    add: function(url, sequence) {
        this.elementList.push({
            sequence: sequence,
            url: url
        })
    },
    sort: function() {
        this.elementList.sort(function(a, b) {
            var intA = parseInt(a.sequence),
                intB = parseInt(b.sequence);
            if (intA < intB) {
                return -1
            } else if (intA > intB) {
                return 1;
            } else {
                return 0;
            }
        });
    },
    addToContainer: function() {
        for (var ele of this.elementList) {
            this.addNode(ele.url, ele.sequence);
        }
    },
    addNode: function(url, tagText) {
        var ele = document.createElement("div");
        ele.className = "ele"
        ele.dataset.index = this.index;
        ele.dataset.tag = tagText;
        var tag = document.createElement('span');
        tag.className = "tag"
        tag.textContent = tagText;
        var title = document.createElement('span');
        title.type = "text"
        title.className = "title"
        var img = document.createElement('img');
        img.className = "img"
        img.src = url;
        ele.appendChild(img);
        ele.appendChild(tag);
        ele.appendChild(title);
        this.container.appendChild(ele);

        ele.addEventListener('click', function(evt) {
            if (evt.srcElement.className !== "title") {
                displayForm(evt.currentTarget.dataset.index, false);
                evt.preventDefault();
            }
        });
        title.addEventListener('click', function(evt) {
            displayForm(evt.currentTarget.parentElement.dataset.index, false, true);
            evt.preventDefault();
        });
        this.index++;
    },
    update: function() {
        if (this.index > 0) {
            document.getElementById('btn-folder-image').style.display = "none";
            document.getElementById('print').style.display = "";
        } else {
            document.getElementById('btn-folder-image').style.display = "";
            document.getElementById('print').style.display = "none";
        }
    },
    setAction: function(node, value) {
        //        node.style.fontSize = 1.6 / Math.max(1, value.length -64) + "rem";
        node.textContent = value;
        applyFontSize(node, .2, 2);
    }
};

function hasOverflow(node) {
    return node.scrollHeight > node.clientHeight;
}

function applyFontSize(node, minSize, maxSize) {
    node.style.fontSize = maxSize + 'rem';
    if (hasOverflow(node)) {
        node.style.fontSize = minSize + 'rem';
        if (!hasOverflow(node)) {
            recApplyFontSize(node, minSize, maxSize);
        }
    }
}

function recApplyFontSize(node, minSize, maxSize) {
    halfSize = minSize + (maxSize - minSize) / 2;
    console.log(halfSize);
    node.style.fontSize = halfSize + 'rem';
    if (hasOverflow(node)) {
        recApplyFontSize(node, minSize, halfSize);
    } else {
        if (maxSize - minSize > .05) {
            recApplyFontSize(node, halfSize, maxSize);
        }
    }
}

function displayForm(index, loop, title) {
    form.open()
    form.bind(
        index === undefined ? 1 : index,
        title === undefined ? false : title
    );
    form.looping = (loop === undefined ? false : loop);
}
