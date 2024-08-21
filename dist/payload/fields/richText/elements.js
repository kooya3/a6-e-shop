"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var label_1 = __importDefault(require("./label"));
var largeBody_1 = __importDefault(require("./largeBody"));
var elements = [
    'blockquote',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'link',
    largeBody_1.default,
    label_1.default,
];
exports.default = elements;
