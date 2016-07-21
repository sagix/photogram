var jsonWriter = {
    init: function(fileName){
            this.fileName = fileName;
    },
    write: function(elementList) {
        this.entry.getFile(fileName, {
                create: true,
                exclusive: false
            },
            function(entry) {
                entry.createWriter(function(fileWriter) {
                    var blob = new Blob([JSON.stringify(elementList, function(key, value) {
                        if (key === "url") {
                            return undefined;
                        }
                        return value;
                    })], {
                        type: 'text/plain'
                    });
                    var truncated = false;
                    fileWriter.onwriteend = function(e) {
                        if (!truncated) {
                            truncated = true;
                            this.truncate(this.position);
                            return;
                        }
                        console.log('Write completed.');
                    };
                    fileWriter.write(blob);
                });
            })
    },
}
