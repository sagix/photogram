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
        form._bindPlaceList(params.placeList)
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
            this.node.fx.checked = value.fx ? true : false;
            this.node.periode.value = (value.periode || "").toLowerCase()[0];
            this.node.place.value = "";
            this.node.placeList.value = (value.place || "");
            if (selectAction) {
                this.node.action.select();
            } else {
                this.node.sequence.select();
            }
        } else {
            form.close();
        }
    },
    _bindPlaceList: function(placeList) {
        var list = this.node.querySelector('#placeList')
        while (list.hasChildNodes()) {
            list.removeChild(list.lastChild);
        }
        var option = document.createElement('option');
        option.value = "";
        option.textContent = "";
        list.appendChild(option);
        for (place of placeList.values()) {
            var option = document.createElement('option');
            option.value = place.value;
            option.textContent = place.value;
            list.appendChild(option);
        }
    },
    submit: function() {
        publisher.publish({
            id: this.node.id.value,
            url: this.img.src,
            sequence: this.node.sequence.value,
            action: this.node.action.value,
            fx: this.node.fx.checked ? "fx" : "",
            periode: this.node.periode.value,
            place: this.node.placeList.value || this.node.place.value || ""
        })
        this.close();
    }
}
