var elements = {
    elementList: Array(),

    add: function(url, sequence) {
        this.elementList.push({
            id: sequence,
            sequence: sequence,
            url: url,
            action: ""
        })
    },
    sort: function() {
        this.elementList.sort(function(a, b) {
            var intA = parseInt(a.sequence),
                intB = parseInt(b.sequence);
            if (intA < intB) {
                return -1;
            } else if (intA > intB) {
                return 1;
            } else {
                if (a.sequence < b.sequence) {
                    return -1;
                } else if (a.sequence > b.sequence) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
    },
    update: function(value) {
        for (var element of this.elementList) {
            if (element.id === value.id) {
                element.sequence = value.sequence;
                element.action = value.action;
                element.fx = value.fx;
                element.periode = value.periode;
                element.place = value.place;
            }
        }
    },
    merge: function(save) {
        for (var ele of this.elementList) {
            for (var s of save) {
                if (ele.id === s.id) {
                    ele.sequence = s.sequence;
                    ele.action = s.action;
                    ele.color = s.color === undefined ? 0 : s.color;
                    ele.place = s.place;
                    ele.periode = s.periode;
                    ele.fx = s.fx;
                    save.splice(save.indexOf(s), 1);
                    break;
                }
            }
        }
    }
};
