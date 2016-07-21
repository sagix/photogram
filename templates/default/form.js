var form = {
    node: null,
    img: null,
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
            params.action || false
        );
    },
    _open: function() {
        this.node.classList.add("display");
    },
    close: function() {
        this.node.classList.remove("display");
    },
    _bind: function(value, selectAction) {
        if (value !== undefined) {
            this.node.id.value = value.id;
            this.img.src = value.url;
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
        publisher.publish({
            id: this.node.id.value,
            url : this.img.src,
            sequence: this.node.sequence.value,
            action: this.node.action.value
        })
        this.close();
    }
}
