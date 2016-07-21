var publisher = {
    publish: function(value) {
        elements.update(value);
        jsonWriter.write();
        binder.bind(value, document.querySelector('.ele[data-id="'+value.id+'"]'));
    }
};
