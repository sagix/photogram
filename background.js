chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('home/main.html', {
        'bounds': {
            'width': 806,
            'height': 460
        }
    });
});
