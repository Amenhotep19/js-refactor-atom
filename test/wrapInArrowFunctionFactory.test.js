'use strict';

var container = require('../lib/container');
var mocker = require('./mocker');
var sinon = require('sinon');
var assert = require('chai').assert;
var readSource = require('./test-utils/read-source');
var editorFactory = require('./test-utils/editorFactory');
var testUtils = require('./test-utils/test-utils');
var prettyJson = testUtils.prettyJson;

var approvalsConfig = require('./test-utils/approvalsConfig');
var approvals = require('approvals').configure(approvalsConfig).mocha('./test/approvals');

describe('Wrap In Arrow', function () {
    var subcontainer;
    var applySetEditSpy;

    beforeEach(function () {
        subcontainer = container.new();

        mocker.registerMock('logger');
        mocker.registerMock('editActionsFactory');
        mocker.registerMock('dialogFactory');

        subcontainer.register(mocker.getMock('logger').mock);
        subcontainer.register(mocker.getMock('editActionsFactory').mock);
        subcontainer.register(mocker.getMock('dialogFactory').mock);

        applySetEditSpy = sinon.spy();

        mocker.getMock('editActionsFactory').api.applySetEdit = function (text, coords) {
            applySetEditSpy(text, coords);

            return {
                then: function () { }
            };
        };

        mocker.getMock('logger').api.log = sinon.spy();
        mocker.getMock('logger').api.info = sinon.spy();
    });

    it('should log an error if selection is empty', function () {
        var sourceTokens = readSource('./test/fixtures/wrapInWrapper/wrapInWrapper.js');
        var range = {
          start: {
            row: 0,
            column: 0
          },
          end: {
            row: 0,
            column: 0
          }
        };

        var editorFake = editorFactory(sourceTokens, range);
        var applySetEdit = mocker.getMock('editActionsFactory').api.applySetEdit;

        var info = mocker.getMock('logger').api.info;
        subcontainer.build('wrapInArrowFunctionFactory')(editorFake, function () { });

        this.verify(prettyJson(info.args));
    });

    it('should wrap selection in an arrow function', function () {
        var sourceTokens = readSource('./test/fixtures/wrapInWrapper/wrapInWrapper.js');
        var range = {
          start: {
            row: 3,
            column: 4
          },
          end: {
            row: 5,
            column: 5
          }
        };

        var editorFake = editorFactory(sourceTokens, range);
        var applySetEdit = mocker.getMock('editActionsFactory').api.applySetEdit;

        subcontainer.build('wrapInArrowFunctionFactory')(editorFake, function () { });

        this.verify(prettyJson(applySetEditSpy.args));
    });


});
