var jsonReader = {
    load: function(file, next) {
        var fileReader = new FileReader();
        fileReader.onload = function(f) {
            next(JSON.parse(fileReader.result));
        }
        fileReader.readAsText(file);
    },
}
