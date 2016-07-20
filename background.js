chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('home/main.html', {
        'bounds': {
            'width': 740,
            'height': 460
        }
    });
});
