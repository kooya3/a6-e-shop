"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Button_1 = __importDefault(require("./Button"));
var Element_1 = __importDefault(require("./Element"));
var plugin_1 = __importDefault(require("./plugin"));
var richTextLargeBody = {
    name: 'large-body',
    Button: Button_1.default,
    Element: Element_1.default,
    plugins: [plugin_1.default],
};
exports.default = richTextLargeBody;
