var binder = {
    basePath: "/templates/default",
    bind: function(value, node) {
        node.dataset.id = value.id;
        node.querySelector("img").src = value.url;
        node.querySelector(".sequence").textContent = value.sequence;
        actionNode = node.querySelector(".action");
        actionNode.textContent = value.action;
        applyFontSize(actionNode.parentNode, actionNode, .2, 2);
        warnForDuplicate(node, value.action);
        this._bindPeriode(node, value);
        this._bindFx(node, value);
        node.addEventListener('click', function(evt) {
            if (!evt.srcElement.classList.contains("action") && !evt.srcElement.classList.contains("sequence")) {
                form.open({
                    value: value
                });
                evt.preventDefault();
            }
        });
        node.querySelector('.action').addEventListener('click', function(evt) {
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
    }
};

function applyFontSize(parent, node, minSize, maxSize) {
    node.style.fontSize = maxSize + 'rem';
    if (hasOverflow(parent)) {
        node.style.fontSize = minSize + 'rem';
        if (!hasOverflow(parent)) {
            recApplyFontSize(parent, node, minSize, maxSize);
        }
    }
}

function recApplyFontSize(parent, node, minSize, maxSize) {
    var halfSize = minSize + (maxSize - minSize) / 2;
    node.style.fontSize = halfSize + 'rem';
    if (hasOverflow(parent)) {
        recApplyFontSize(parent, node, minSize, halfSize);
    } else {
        if (maxSize - minSize > .05) {
            recApplyFontSize(parent, node, halfSize, maxSize);
        }
    }
}

function hasOverflow(node) {
    return node.scrollHeight > node.clientHeight;
}

function warnForDuplicate(node, value) {
    if (value.length > 0 && (value.slice(0, value.length / 2) === value.slice(value.length / 2, value.length) || value.slice(0, value.length / 3) === value.slice(value.length / 3, 2 * value.length / 3))) {
        node.style.backgroundColor = 'red';
    } else {
        node.style.backgroundColor = '';
    }
}
