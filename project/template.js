var tmp = {

    init: function(templateName, element) {
        this.container = document.getElementById('group-ele')

        this._appendScript('/templates/' + templateName + '/binder.js');
        this._appendScript('/templates/' + templateName + '/form.js');

        var xhr1 = new XMLHttpRequest();
        xhr1.open('GET', '/templates/' + templateName + element, true);
        xhr1.responseType = 'document';
        xhr1.onreadystatechange = function() {
            if (xhr1.readyState == 4 && xhr1.status == 200) {
                tmp.loadTemplate(this.responseXML);
            }
        };
        xhr1.send();

        var xhr2 = new XMLHttpRequest();
        xhr2.open('GET', '/templates/' + templateName + '/form.html', true);
        xhr2.responseType = 'document';
        xhr2.onreadystatechange = function() {
            if (xhr2.readyState == 4 && xhr2.status == 200) {
                tmp.loadForm(this.responseXML);
            }
        };

        xhr2.send();
    },

    _appendScript(src) {
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
    },

    loadTemplate: function(template) {
        document.head.appendChild(template.head.querySelector("style"));
        tmp.node = template.querySelector(".ele");
    },

    loadForm: function(template) {
        document.head.appendChild(template.head.querySelector("style"));
        var formNode = template.querySelector("#form");
        i18n.apply(formNode)
        document.querySelector('body').appendChild(formNode);
        form.init();
    },

    addToContainer: function(elementList) {
        for (var ele of elementList) {
            this._addNode(ele);
        }
    },
    _addNode: function(element) {
        var node = document.importNode(tmp.node, true);
        this.container.appendChild(node);
        binder.bind(element, node)
    }
};
