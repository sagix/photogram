var binder = {
    basePath: "/templates/default",
    sequenceMap: new Map(),
    bind: function(value, node) {
        node.dataset.id = value.id;
        node.querySelector("img").src = value.url;
        var sequence = node.querySelector(".sequence");
        sequence.textContent = value.sequence;
        sequence.classList.remove(
            'sequence-colored',
            'sequence-colored-0',
            'sequence-colored-1',
            'sequence-colored-2',
            'sequence-colored-3',
            'sequence-colored-4',
            'sequence-colored-5',
            'sequence-colored-6',
            'sequence-colored-7',
            'sequence-colored-8',
            'sequence-colored-9',
            'sequence-colored-10',
            'sequence-colored-11',
            'sequence-colored-12',
            'sequence-colored-13',
            'sequence-colored-14',
            'sequence-colored-15',
            'sequence-colored-16'
        );
        if (value.place) {
            sequence.classList.add('sequence-colored', 'sequence-colored-' + this.getSequenceColor(value.place));
        }
        actionNode = node.querySelector(".action");
        actionNode.textContent = value.action;
        applyFontSize(actionNode.parentNode, actionNode, .2, 2);
        warnForDuplicate(node, value.action);
        this._bindPeriode(node, value);
        this._bindFx(node, value);
        node.addEventListener('click', function(evt) {
            if (!evt.srcElement.classList.contains("action")) {
                form.open({
                    value: value,
                    placeList: binder.sequenceMap
                });
                evt.preventDefault();
            }
        });
        node.querySelector('.action').addEventListener('click', function(evt) {
            form.open({
                value: value,
                placeList: binder.sequenceMap,
                action: true
            });
            evt.preventDefault();
        });
        return node;
    },
    getSequenceColor: function(value) {
        if (this.sequenceMap.get(value) === undefined) {
            this.sequenceMap.set(value, {
                colorNumber: this.sequenceMap.size,
                value: value
            });
        }
        return this.sequenceMap.get(value).colorNumber;
    },
    _bindPeriode: function(node, value) {
        var periode = node.querySelector(".periode");
        if (periode === null) {
            return;
        }
        var src = this._periodeToSrc(value.periode);
        if (src === undefined) {
            periode.classList.add("hide");
        } else {
            periode.classList.remove("hide");
            periode.classList.remove("dot-light");
            periode.classList.remove("dot-lighter");
            periode.classList.remove("dot-dark");
            periode.classList.remove("dot-darker");
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
        if (value.fx) {
            fx.classList.remove("hide");
        } else {
            fx.classList.add("hide");
        }
    },
    _periodeToClassName: function(value) {
        switch (toSingleLetter(value)) {
            case "m":
                return "dot-light";
            case "s":
                return "dot-dark";
            case "j":
                return "dot-lighter";
            case "n":
                return "dot-darker";
            default:
                return "";

        }
    },
    _periodeToSrc: function(value) {
        switch (toSingleLetter(value)) {
            case "m":
                return this.basePath + "/svg/weather-sunset-up.svg"
            case "s":
                return this.basePath + "/svg/weather-sunset-down.svg"
            case "j":
                return this.basePath + "/svg/weather-sunny.svg"
            case "n":
                return this.basePath + "/svg/weather-night.svg"
            default:
                return undefined;

        }
    }
};

function toSingleLetter(value) {
    return value === undefined || value.length == 0 ?
        undefined :
        value.toLowerCase()[0];
}
