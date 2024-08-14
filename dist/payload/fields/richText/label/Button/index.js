"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line no-use-before-define
var react_1 = __importDefault(require("react"));
var Button_1 = __importDefault(require("@payloadcms/richtext-slate/dist/field/elements/Button"));
var Icon_1 = __importDefault(require("../Icon"));
var baseClass = 'rich-text-label-button';
var ToolbarButton = function () { return (react_1.default.createElement(Button_1.default, { className: baseClass, format: "label" },
    react_1.default.createElement(Icon_1.default, null))); };
exports.default = ToolbarButton;
