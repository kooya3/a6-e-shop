"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var withLabel = function (incomingEditor) {
    var editor = incomingEditor;
    var shouldBreakOutOnEnter = editor.shouldBreakOutOnEnter;
    if (shouldBreakOutOnEnter) {
        editor.shouldBreakOutOnEnter = function (element) {
            return element.type === 'large-body' ? true : shouldBreakOutOnEnter(element);
        };
    }
    return editor;
};
exports.default = withLabel;
