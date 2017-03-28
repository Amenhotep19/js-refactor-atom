'use strict';

var j = require('jfp');

function functionScopeUtils() {
    function isLocationMatch(location, token) {
        return token.loc.start.line === location[0] + 1 &&
            token.loc.start.column === location[1];
    }

    function isValueMatch(token, value) {
        return token.value === value;
    }

    function isBadIndex(index) {
        return j.eitherNumber(-1)(index) === -1;
    }

    function hasNoBounds(start, end) {
        return j.isNull(start) || j.isNull(end);
    }

    function seek(directionIncrement, tokens, value, index) {
        return j.recur(seekAction)(index);

        function seekAction(recur, index) {
            index = j.isUndefined(tokens[index]) ? -1 : index;

            var isStopState = index === -1 || isValueMatch(tokens[index], value);

            return isStopState ? index : recur(index + directionIncrement);
        }
    }

    function isStopState(index, tokens, value) {
        var isStopIndex = index <= -1 || index >= tokens.length;
        return isStopIndex || isValueMatch(tokens[index], value);
    }

    function directionalSeek(increment) {
        return function (tokens, value, index) {
            var resultIndex = index;

            while (!isStopState(resultIndex, tokens, value)) {
                resultIndex += increment;
            }

            return resultIndex;
        }
    }

    var seekUp = directionalSeek(-1);
    var seekDown = directionalSeek(1);

    function updateState(currentState, tokens, index) {
        var token = j.eitherObject({})(j.deref(index.toString())(tokens));

        switch (token.value) {
            case '{':
                return j.cons('{', currentState);
            case '}':
                return j.dropLast(currentState);
            case undefined:
                return [];
            default:
                return currentState;
        }
    }

    function findStartToken(tokens, coords) {
        return j.recur(findAction)(0);

        function findAction(recur, index) {
            var locationMatches = isLocationMatch(coords.start, tokens[index]);
            return locationMatches ? index : recur(index + 1);
        }
    }

    function findScopeTop(tokens, index) {
        return j.compose(
            j.partial(seekDown, tokens, '{'),
            j.partial(seekUp, tokens, 'function')
        )(index);
    }

    function findScopeBottom(tokens, index) {
        return j.recur(findAction)([], tokens, index);

        function findAction(recur, state, tokens, index) {
            index = j.isUndefined(tokens[index]) ? -1 : index;

            var currentState = updateState(state, tokens, index);

            return currentState.length > 0 ? recur(currentState, tokens, index + 1) : index;
        }
    }

    function buildBoundsObject(tokens, top, bottom) {
        var start = isBadIndex(top) ? null : [tokens[top].loc.start.line, tokens[top].loc.start.column + 1];
        var end = isBadIndex(bottom) ? null : [tokens[bottom].loc.end.line, tokens[bottom].loc.end.column + 1];

        return hasNoBounds(start, end) ? null : { start: start, end: end };
    }

    function findScopeIndices(tokens, coords) {
        var top = j.compose(
            j.partial(findScopeTop, tokens),
            j.partial(findStartToken, tokens)
        )(coords);

        var bottom = findScopeBottom(tokens, top);

        return { top: top, bottom: bottom };
    }

    function findScopeBounds(tokens, coords) {
        var boundIndices = findScopeIndices(tokens, coords);

        return buildBoundsObject(tokens, boundIndices.top, boundIndices.bottom);
    }

    function isTokenMatch(value, token) {
        return token.value === value;
    }

    function fixColumnValue(value) {
        value.start.line -= 1;
        value.end.line -= 1;

        return value;
    }

    function findValueInstances(tokens, scopeIndices, value) {
        var topIndex = scopeIndices.top;
        var bottom = scopeIndices.bottom;

        return tokens.slice(topIndex, bottom)
            .filter(j.partial(isTokenMatch, value))
            .map(j.pick('loc'))
            .map(fixColumnValue);
    }

    return {
        buildBoundsObject: buildBoundsObject,
        findScopeBounds: findScopeBounds,
        findScopeIndices: findScopeIndices,
        findValueInstances: findValueInstances
    };
}

module.exports = functionScopeUtils;