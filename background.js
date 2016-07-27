chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('home/main.html', {
        id: 'home',
        bounds: {
            width: 775,
            height: 460
        }
    });
});
