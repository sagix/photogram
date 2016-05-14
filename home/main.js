window.addEventListener('load', function() {
    homeDir.init();
    lastDir.init();
});

function open(entry, fromHistory){
    chrome.runtime.getBackgroundPage(function(b){
        b.entry = entry;
        b.fromHistory = fromHistory;
        chrome.app.window.create('/project/main.html', {
            'bounds': {
                'width': 1080,
                'height': 600
            }
        });
    })
}
