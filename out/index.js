"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var deep_freeze_1 = __importDefault(require("deep-freeze"));
var createActionType = function () {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i] = arguments[_i];
    }
    return parts.join('_');
};
exports.createActionTypeGuard = function (type) { return function (action) { return action.type === type; }; };
exports.createEmptyActionCreator = function () {
    var actionType = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        actionType[_i] = arguments[_i];
    }
    var type = createActionType.apply(void 0, actionType);
    var actionCreator = function () { return ({ type: type, payload: undefined }); };
    actionCreator.guard = exports.createActionTypeGuard(type);
    return actionCreator;
};
exports.createActionCreator = function () {
    var actionType = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        actionType[_i] = arguments[_i];
    }
    var type = createActionType.apply(void 0, actionType);
    var actionCreator = function (payload) { return ({ type: type, payload: payload }); };
    actionCreator.guard = exports.createActionTypeGuard(type);
    return actionCreator;
};
exports.createInitialState = function (initialState) { return deep_freeze_1.default(initialState); };
exports.reduceAction = function (actionCreator, reducer) { return function (state, action) {
    return actionCreator.guard(action) ? reducer(state, action.payload) : state;
}; };
exports.createReducer = function (initialState) {
    var reducers = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        reducers[_i - 1] = arguments[_i];
    }
    return function (state, action) {
        if (state === void 0) { state = initialState; }
        for (var _i = 0, reducers_1 = reducers; _i < reducers_1.length; _i++) {
            var reducer = reducers_1[_i];
            var result = reducer(state, action);
            if (result != state) {
                return result;
            }
        }
        return state;
    };
};
