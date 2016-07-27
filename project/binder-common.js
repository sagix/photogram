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

function hasOverflow(node) {
    return node.scrollHeight > node.clientHeight;
}

function warnForDuplicate(node, value) {
    if (value.length > 0 &&
        (value.slice(0, value.length / 2) === value.slice(value.length / 2, value.length) ||
            value.slice(0, value.length / 3) === value.slice(value.length / 3, 2 * value.length / 3))) {
        node.style.backgroundColor = 'red';
    } else {
        node.style.backgroundColor = '';
    }
}
