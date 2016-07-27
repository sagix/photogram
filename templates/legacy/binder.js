var binder = {
    basePath: "/templates/default",
    sequenceMap: new Map(),
    bind: function(value, node) {
        node.dataset.id = value.id;
        node.querySelector("img").src = value.url;
        node.querySelector(".sequence").textContent = value.sequence;
        actionNode = node.querySelector(".action");
        actionNode.textContent = value.action;
        applyFontSize(actionNode.parentNode, actionNode, .2, 2);
        warnForDuplicate(node, value.action);
        node.addEventListener('click', function(evt) {
            if (!evt.srcElement.classList.contains("action")) {
                form.open({
                    value: value
                });
                evt.preventDefault();
            }
        });
        actionNode.addEventListener('click', function(evt) {
            form.open({
                value: value,
                action: true
            });
            evt.preventDefault();
        });
        return node;
    },

};
