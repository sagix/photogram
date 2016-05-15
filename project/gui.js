var gui = {
    index: 0,
    init: function() {
        this.container = document.getElementById('group-ele')
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
        this.container.appendChild(tmp.bind({
            id: this.index,
            src: url,
            sequence: sequenceText
        }));
        this.index++;
    },
};

function hasOverflow(node) {
    return node.scrollHeight > node.clientHeight;
}
