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
    },
    addToContainer: function(elementList) {
        for (var ele of elementList) {
            this.addNode(ele.url, ele.sequence, ele.color === undefined ? 0 : ele.color);
        }
    },
    addNode: function(url, sequenceText, color) {
        var ele = document.createElement("div");
        ele.className = "ele"
        ele.dataset.index = this.index;
        ele.dataset.id = sequenceText;
        var sequence = document.createElement('span');
        sequence.className = "sequence"
        sequence.textContent = sequenceText;
        var action = document.createElement('span');
        action.type = "text"
        action.className = "action bg-action-" + color;
        var img = document.createElement('img');
        img.className = "img"
        img.src = url;
        var legend = document.createElement('div');
        legend.className = "legend";
        ele.appendChild(img);
        ele.appendChild(legend);
        legend.appendChild(sequence);
        legend.appendChild(action);
        this.container.appendChild(ele);

        ele.addEventListener('click', function(evt) {
            if (!evt.srcElement.classList.contains("action")
                && !evt.srcElement.classList.contains("sequence")) {
                displayForm(evt.currentTarget.dataset.index, false);
                evt.preventDefault();
            }
        });
        action.addEventListener('click', function(evt) {
            displayForm(evt.currentTarget.parentElement.parentElement.dataset.index, false, true);
            evt.preventDefault();
        });
        sequence.addEventListener('click', function(evt) {
            evt.currentTarget.classList.toggle('sequence-night');
        });
        this.index++;
    },
};

function hasOverflow(node) {
    return node.scrollHeight > node.clientHeight;
}

function displayForm(index, loop, action) {
    form.open()
    form.bind(
        index === undefined ? 1 : index,
        action === undefined ? false : action
    );
    form.looping = (loop === undefined ? false : loop);
}
