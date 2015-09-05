var form = {
    node: null,
    looping: false,
    init: function() {
        this.node = document.getElementById('form')
        this.node.addEventListener('submit', function(evt) {
            form.submit();
            evt.preventDefault();
        });
    },
    open: function() {
        this.node.classList.add("display");
    },
    close: function() {
        this.node.classList.remove("display");
    },
    bind: function(index, selectAction) {
        var ele = document.getElementsByClassName('ele')[index];
        if (ele !== undefined) {
            document.getElementById('form-index').value = index;
            document.getElementById('form-img').src = ele.getElementsByClassName('img')[0].src;
            var sequence = document.getElementById('form-sequence')
            sequence.value = ele.getElementsByClassName('sequence')[0].textContent;
            var action = document.getElementById('form-action');
            action.value = ele.getElementsByClassName('action')[0].textContent;
            if (selectAction) {
                action.select();
            } else {
                sequence.select();
            }
        } else {
            form.close();
        }
    },
    submit: function() {
        var index = this.node.index.value;
        ele = document.getElementsByClassName('ele')[index];
        ele.getElementsByClassName('sequence')[0].textContent = this.node.sequence.value;
        elements.update(ele.dataset.id, this.node.sequence.value, this.node.action.value);
        elements.setAction(ele.dataset.id, ele.getElementsByClassName('action')[0], this.node.action.value);
        if (this.looping) {
            this.bind(parseInt(index) + 1);
        } else {
            this.close();
        }
        elements.save();
    }
}
