tmp = {
    init: function() {
        this.form = document.getElementById('template-element-selection');
        this.elements = document.querySelector('.group-element');

        chrome.runtime.getPackageDirectoryEntry(function(d) {
            d.getDirectory('./templates', {
                create: false
            }, function(dt) {
                dt.createReader().readEntries(function(entries) {
                    for (entry of entries) {
                        if (entry.isDirectory) {
                            tmp.form.template.add(tmp._createOption(entry.name, entry.name));
                        }
                    }
                    tmp._onTemplateChange();
                });
            }, function(err) {
                console.error(err);
            })
        });


        tmp.form.template.addEventListener("change", this._onTemplateChange);
    },
    template: function() {
        return this.form.template.value;
    },
    element: function() {
        return this.form.element.value;
    },
    _onTemplateChange: function() {
        var xhr1 = new XMLHttpRequest();
        xhr1.open('GET', '/templates/' + tmp.form.template.value + '/manifest.json', true);

        xhr1.onreadystatechange = function() {
            if (xhr1.readyState == 4 && xhr1.status == 200) {
                tmp._loadElement(JSON.parse(this.response));
            }
        };
        xhr1.send();
    },
    _loadElement: function(manifest) {
        while (this.elements.hasChildNodes()) {
            this.elements.removeChild(this.elements.lastChild);
        }
        for (ele of manifest.elements) {
            var input = document.createElement("input");
            input.type = 'radio';
            input.name = 'element';
            input.value = ele.file;
            input.id = ele.id;
            var label = document.createElement("label");
            label.textContent = ele.name;
            label.htmlFor = ele.id;
            var img = document.createElement("img");
            img.src = '/templates/' + tmp.form.template.value + '/' + ele.screenshot;
            label.appendChild(img);
            this.elements.appendChild(input);
            this.elements.appendChild(label);
        }
        if (this.elements.hasChildNodes()) {
            this.elements.firstElementChild.checked = "checked";
        }
    },
    _createOption: function(name, value) {
        var option = document.createElement('option');
        option.textContent = name;
        option.value = value;
        return option;
    }
}
