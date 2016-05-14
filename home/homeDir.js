var homeDir = {
    init: function() {
        document.getElementById('btn-folder-image').addEventListener('click', homeDir.choose);
    },
    choose: function() {
        chrome.fileSystem.chooseEntry({
            type: "openDirectory"
        }, function(entry) {
            lastDir.save(entry);
            open(entry);
        });
    }
}
