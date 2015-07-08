window.addEventListener('keydown', function(event) {
    if (event.keyCode === 27) { //escape
        form.close();
    } else if (event.metaKey && event.keyCode == 80) { //cmd+P
        window.print();
    } else if (event.metaKey && event.keyCode == 13) { //cmd+enter
        form.submit();
    }
});
