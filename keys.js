window.addEventListener('keydown', function(event) {
    if (event.keyCode === 27) { //escape
        form.close();
    } else if (cmd(event, 79)) { //cmd+O
        elements.chooseDir();
    } else if (cmd(event, 80)) { //cmd+P
        window.print();
    } else if (cmd(event, 13)) { //cmd+enter
        form.submit();
    }
    function cmd(event, key){
        return event.metaKey && event.keyCode == key
    }
});
