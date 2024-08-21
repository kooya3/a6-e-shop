"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
var invertBackground_1 = require("../../fields/invertBackground");
var link_1 = __importDefault(require("../../fields/link"));
var richText_1 = __importDefault(require("../../fields/richText"));
var columnFields = [
    {
        name: 'size',
        type: 'select',
        defaultValue: 'oneThird',
        options: [
            {
                value: 'oneThird',
                label: 'One Third',
            },
            {
                value: 'half',
                label: 'Half',
            },
            {
                value: 'twoThirds',
                label: 'Two Thirds',
            },
            {
                value: 'full',
                label: 'Full',
            },
        ],
    },
    (0, richText_1.default)(),
    {
        name: 'enableLink',
        type: 'checkbox',
    },
    (0, link_1.default)({
        overrides: {
            admin: {
                condition: function (_, _a) {
                    var enableLink = _a.enableLink;
                    return Boolean(enableLink);
                },
            },
        },
    }),
];
exports.Content = {
    slug: 'content',
    fields: [
        invertBackground_1.invertBackground,
        {
            name: 'columns',
            type: 'array',
            fields: columnFields,
        },
    ],
};
