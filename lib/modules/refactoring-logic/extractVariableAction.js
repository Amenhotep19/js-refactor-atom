"use strict";

var j = require("jfp");

function extractVariableAction(templateUtils, extensionHelper) {
  function isValueInScope(scopeBounds, valueCoords) {
    var scopeStart = scopeBounds.start[0];
    var scopeEnd = scopeBounds.end[0];
    var valueStart = valueCoords.start[0];

    return j.between(scopeStart, scopeEnd)(valueStart);
  }

  function buildVarCoords(scopeData) {
    var pointCoords = [scopeData.scopeBounds.start[0] + 1, 0];
    var varCoords = {
      start: pointCoords,
      end: pointCoords
    };

    return varCoords;
  }

  function buildVariableString(name, selectionData) {
    return templateUtils.templateFactory("newVariable")(name, selectionData);
  }

  return {
    buildVarCoords: buildVarCoords,
    buildVariableString: buildVariableString,
    isValueInScope: extensionHelper.returnOrDefault(false, isValueInScope)
  };
}

module.exports = extractVariableAction;
