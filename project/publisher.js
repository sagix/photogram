var publisher = {
    publish: function(values) {
        var ele = document.getElementsByClassName('ele')[values.index];
        ele.getElementsByClassName('sequence')[0].textContent = values.sequence;
        elements.update(ele.dataset.id, values.sequence, values.action);
        elements.setAction(ele.dataset.id, ele.getElementsByClassName('action')[0], values.action);
        elements.save();
    }
};
