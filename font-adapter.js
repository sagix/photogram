function applyFontSize(parent, node, minSize, maxSize) {
    node.style.fontSize = maxSize + 'rem';
    if (hasOverflow(parent)) {
        node.style.fontSize = minSize + 'rem';
        if (!hasOverflow(parent)) {
            recApplyFontSize(parent, node, minSize, maxSize);
        }
    }
}

function recApplyFontSize(parent, node, minSize, maxSize) {
    var halfSize = minSize + (maxSize - minSize) / 2;
    node.style.fontSize = halfSize + 'rem';
    if (hasOverflow(parent)) {
        recApplyFontSize(parent, node, minSize, halfSize);
    } else {
        if (maxSize - minSize > .05) {
            recApplyFontSize(parent, node, halfSize, maxSize);
        }
    }
}
