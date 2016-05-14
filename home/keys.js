window.addEventListener('keydown', function(event) {
    if (event.metaKey && event.keyCode == 79) { //cmd+O
        homeDir.choose();
    }
});
