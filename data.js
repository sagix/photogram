var data = {

    datas: {},
    length: 0,

    init: function(separator, quote) {
        this.separator = separator;
        this.quote = quote;
    },

    get: function(tag) {
        return this.datas["tag" + tag];
    },

    load: function(file, next) {
        var fileReader = new FileReader();
        fileReader.onload = function(f) {
            data.parse(fileReader.result, next);
        }
        fileReader.readAsText(file, next);
    },

    parse: function(data, next) {
        var allTextLines = data.split(/\r\n|\n/);

        for (var i = 0; i < allTextLines.length; i++) {
            var data = allTextLines[i].split(this.separator);
            if (data.length === 2) {
                this.datas["tag" + data[0]] = data[1];
                this.length++;
            }
            var data = allTextLines[i].split(this.separator + this.quote);
            if (data.length === 2) {
                this.datas["tag" + data[0]] = data[1].slice(0, -1).replace(/""/g, '"');
                this.length++;
            }
        }
        next();
    }
};
