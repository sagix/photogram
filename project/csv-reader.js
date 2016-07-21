var csvReader = {

    init: function(separator, quote) {
        this.separator = separator;
        this.quote = quote;
    },

    load: function(file, next) {
        var fileReader = new FileReader();
        fileReader.onload = function(f) {
            csvReader._parse(fileReader.result, next);
        }
        fileReader.readAsText(file);
    },

    _parse: function(data, next) {
        var result = [];
        var allTextLines = data.split(/\r\n|\n/);

        for (var i = 0; i < allTextLines.length; i++) {
            var data = allTextLines[i].split(this.separator);
            if (data.length === 2) {
                result.push(this._createData(data[0], data[1]));
            }
            var data = allTextLines[i].split(this.separator + this.quote);
            if (data.length === 2) {
                result.push(this._createData(data[0], data[1].slice(0, -1).replace(/""/g, '"')));
            }
        }
        next(result);
    },
    _createData: function(id, action){
        return {
            id : id,
            sequence : id,
            action: action
        }
    }
};
