var form = {
    node: null,
    img: null,
    looping: false,
    init: function() {
        this.node = document.getElementById('form')
        this.img = this.node.querySelector('#form-img');
        this.node.addEventListener('submit', function(evt) {
            form.submit();
            evt.preventDefault();
        });
        this.node.querySelector('#form-close').addEventListener('click', function(evt) {
            form.close();
            evt.preventDefault();
        })
    },
    open: function(params) {
        form._open()
        form._bind(
            params.value,
            params.action === undefined ? false : params.action
        );
        form.looping = (params.loop === undefined ? false : params.loop);
    },
    _open: function() {
        this.node.classList.add("display");
    },
    close: function() {
        this.node.classList.remove("display");
    },
    _bind: function(value, selectAction) {
        if (value !== undefined) {
            this.node.index.value = value.index !== undefined ? value.index : value.id;
            this.img.src = value.src;
            this.node.sequence.value = value.sequence;
            this.node.action.value = value.action;
            if (selectAction) {
                this.node.action.select();
            } else {
                this.node.sequence.select();
            }
        } else {
            form.close();
        }
    },
    submit: function() {
        var index = this.node.index.value;
        publisher.publish({
            index: index,
            sequence: this.node.sequence.value,
            action: this.node.action.value
        })
        if (this.looping) {
            this.bind(parseInt(index) + 1);
        } else {
            this.close();
        }
    }
}
