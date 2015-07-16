function applyFontSize(node, minSize, maxSize) {
    node.style.fontSize = maxSize + 'rem';
    if (hasOverflow(node)) {
        node.style.fontSize = minSize + 'rem';
        if (!hasOverflow(node)) {
            recApplyFontSize(node, minSize, maxSize);
        }
    }
}

function recApplyFontSize(node, minSize, maxSize) {
    var halfSize = minSize + (maxSize - minSize) / 2;
    node.style.fontSize = halfSize + 'rem';
    if (hasOverflow(node)) {
        recApplyFontSize(node, minSize, halfSize);
    } else {
        if (maxSize - minSize > .05) {
            recApplyFontSize(node, halfSize, maxSize);
        }
    }
}
