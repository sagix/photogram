var homeDir = {
    init: function() {
        document.getElementById('btn-folder-image').addEventListener('click', homeDir.choose);
    },
    choose: function() {
        window.webkitRequestFileSystem(TEMPORARY, 1024 * 1024 /*1MB*/ , function(fs) {
            //lastDir.save(fs.root);
            open(fs.root);
        });
    }
}
