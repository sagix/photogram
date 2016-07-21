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
        Papa.parse(data, {
            delimiter: this.separator,
            skipEmptyLines: true,
            complete: function(parsed) {
                var result = [];
                for (r of parsed.data) {
                    result.push({
                        id: r[0],
                        sequence: r[0],
                        action: r[1],
                    })
                }
                next(result);
            }
        });
    }
};
