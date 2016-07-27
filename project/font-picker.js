pickFont(fontName) {
    Array.from(document.getElementsByClassName('ele')).forEach(function(node) {
        node.style.fontFamily = fontName
    });
}
