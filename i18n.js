document.addEventListener('DOMContentLoaded', function() {
    i18n.apply(document);
});

var i18n = {
    apply: function(node) {
        Array.prototype.forEach.call(node.querySelectorAll('[data-i18n]'), function(el) {
            el.textContent = chrome.i18n.getMessage(el.getAttribute('data-i18n'));
        });
        Array.prototype.forEach.call(node.querySelectorAll('[data-i18n-attr]'), function(el) {
            var data = el.getAttribute('data-i18n-attr').split(':');
            el.setAttribute(data[0], chrome.i18n.getMessage(data[1]));
        });
    }
}
