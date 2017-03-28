'use strict';

function convertToMemberFunctionAction(functionUtils) {

    function canConvertToMember(line) {
        return line.match(/function\s+[^\s(]+\s*\(/) !== null;
    }

    function buildRefactorRegex(functionName) {
        var regex = 'function\\s+' + functionName + '\\s*\\(';
        return new RegExp(regex);
    }

    function refactorToMemberFunction(line) {
        var functionName = functionUtils.getFunctionName(line),
            refactorRegex = buildRefactorRegex(functionName),
            replacementStr = functionName + ': function (';

        return line.replace(refactorRegex, replacementStr);
    }

    function refactorFunctionDef(selection) {
        selection[0] = refactorToMemberFunction(selection[0]);
        return selection.join('\n');
    }

    return {
        canConvertToMember: canConvertToMember,
        refactorFunctionDef: refactorFunctionDef,
        refactorToMemberFunction: refactorToMemberFunction
    }
}

convertToMemberFunctionAction['@dependencies'] = ['functionUtils'];

module.exports = convertToMemberFunctionAction;