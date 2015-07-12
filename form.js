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
    bind: function(index, selectTitle) {
        var ele = document.getElementsByClassName('ele')[index];
        if (ele !== undefined) {
            document.getElementById('form-index').value = index;
            document.getElementById('form-img').src = ele.getElementsByClassName('img')[0].src;
            var tag = document.getElementById('form-tag')
            tag.value = ele.getElementsByClassName('tag')[0].textContent;
            var title = document.getElementById('form-title');
            title.value = ele.getElementsByClassName('title')[0].textContent;
            if (selectTitle) {
                title.select();
            } else {
                tag.select();
            }
        } else {
            form.close();
        }
    },
    submit: function() {
        var index = this.node.index.value;
        ele = document.getElementsByClassName('ele')[index];
        ele.getElementsByClassName('tag')[0].textContent = this.node.tag.value;
        elements.setAction(ele.getElementsByClassName('title')[0], this.node.title.value);
        if (this.looping) {
            this.bind(parseInt(index) + 1);
        } else {
            this.close();
        }
    }
}
