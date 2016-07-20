var binder = {
    basePath: "/templates/default",
    bind: function(value, node) {
        node.dataset.index = value.id;
        node.dataset.id = value.sequence;
        node.querySelector("img").src = value.src;
        node.querySelector(".sequence").textContent = value.sequence;
        node.querySelector(".action").textContent = value.action;
        this._bindPeriode(node, value);
        this._bindFx(node, value);
        node.addEventListener('click', function(evt) {
            if (!evt.srcElement.classList.contains("action") && !evt.srcElement.classList.contains("sequence")) {
                binder._addAction(value);
                form.open({
                    value: value
                });
                evt.preventDefault();
            }
        });
        node.querySelector('.action').addEventListener('click', function(evt) {
            binder._addAction(value);
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
    },
    _bindPeriode: function(node, value) {
        var periode = node.querySelector(".periode");
        if (periode === null) {
            return;
        }
        var src = this._periodeToSrc(value.periode);
        if (src === undefined) {
            periode.style.display = "none"
        } else {
            periode.style.display = "";
            periode.classList.add(this._periodeToClassName(value.periode));
            periode.src = src;
        }
    },
    _bindFx: function(node, value) {
        var fx = node.querySelector(".fx");
        if (fx === null) {
            return;
        }
        fx.src = this.basePath + "/svg/auto-fix.svg";
        if (value.fx === undefined) {
            fx.style.display = "none";
        } else {
            fx.style.display = "";
        }
    },
    _periodeToClassName: function(value) {
        switch (value) {
            case "matin":
                return "dot-orange";
            case "soir":
                return "dot-purple";
            case "jour":
                return "dot-blue";
            case "nuit":
                return "dot-night";
            default:
                return "";

        }
    },
    _periodeToSrc: function(value) {
        switch (value) {
            case "matin":
                return this.basePath + "/svg/weather-sunset-up.svg"
            case "soir":
                return this.basePath + "/svg/weather-sunset-down.svg"
            case "jour":
                return this.basePath + "/svg/weather-sunny.svg"
            case "nuit":
                return this.basePath + "/svg/weather-night.svg"
            default:
                return undefined;

        }
    },
    _addAction: function(value) {
        // todo remove this patch
        if (value.action === undefined) {
            value.action = data.get(value.index);
        }
        if (value.action === undefined) {
            value.action = elements.get(value.sequence).action;
        }
    }
};
