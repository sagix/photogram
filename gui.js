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
        gui.update();
    },
    update: function() {
        if (this.index > 0) {
            document.getElementById('btn-folder-image').style.display = "none";
            document.getElementById('menu').style.display = "";
        } else {
            document.getElementById('btn-folder-image').style.display = "";
            document.getElementById('menu').style.display = "none";
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

function displayForm(index, loop, action) {
    form.open()
    form.bind(
        index === undefined ? 1 : index,
        action === undefined ? false : action
    );
    form.looping = (loop === undefined ? false : loop);
}
