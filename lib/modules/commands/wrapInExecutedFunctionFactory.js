'use strict';

function wrapInExecutedFunctionFactory(
    wrapInExecutedFunctionAction,
    wrapInTemplateFactory) {

    return function (vsEditor, callback) {

        return function wrapInCondition() {
            var wrapSelection = wrapInExecutedFunctionAction.wrapSelection;
            var errorMessage = 'Cannot wrap empty selection. To create a new function, use the function (fn) snippet.';
            var prompt = {prompt: 'Name of your function'};

            wrapInTemplateFactory(vsEditor, callback)(wrapSelection, errorMessage, prompt);
        }

    }
}

module.exports = wrapInExecutedFunctionFactory;