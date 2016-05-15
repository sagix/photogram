var binder = {
    bind: function(value, node) {
        node.dataset.index = value.id;
        node.dataset.id = value.sequence;
        node.getElementsByClassName("img")[0].src = value.src;
        node.getElementsByClassName("sequence")[0].textContent = value.sequence;
        node.getElementsByClassName("action")[0].textContent = value.action;
        node.addEventListener('click', function(evt) {
            if (!evt.srcElement.classList.contains("action") && !evt.srcElement.classList.contains("sequence")) {
                // todo remove this patch
                if (value.action === undefined) {
                    value.action = data.get(value.index);
                }
                if (value.action === undefined) {
                    value.action = elements.get(value.sequence).action;
                }
                form.open({
                    value: value
                });
                evt.preventDefault();
            }
        });
        node.querySelector('.action').addEventListener('click', function(evt) {
            // todo remove this patch
            if (value.action === undefined) {
                value.action = data.get(value.index);
            }
            if (value.action === undefined) {
                value.action = elements.get(value.sequence).action;
            }
            form.open({
                value: value,
                action: true
            });
            evt.preventDefault();
        });
        node.querySelector('.sequence').addEventListener('click', function(evt) {
            evt.currentTarget.classList.toggle('sequence-night');
        });
        return node;
    }
};
