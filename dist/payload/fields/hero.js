"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hero = void 0;
var linkGroup_1 = __importDefault(require("./linkGroup"));
var richText_1 = __importDefault(require("./richText"));
var label_1 = __importDefault(require("./richText/label"));
var largeBody_1 = __importDefault(require("./richText/largeBody"));
exports.hero = {
    name: 'hero',
    label: false,
    type: 'group',
    fields: [
        {
            type: 'select',
            name: 'type',
            label: 'Type',
            required: true,
            defaultValue: 'lowImpact',
            options: [
                {
                    label: 'None',
                    value: 'none',
                },
                {
                    label: 'High Impact',
                    value: 'highImpact',
                },
                {
                    label: 'Medium Impact',
                    value: 'mediumImpact',
                },
                {
                    label: 'Low Impact',
                    value: 'lowImpact',
                },
                {
                    label: 'Custom Hero',
                    value: 'CustomHero',
                },
            ],
        },
        (0, richText_1.default)({
            admin: {
                elements: ['h1', largeBody_1.default, label_1.default, 'link'],
                leaves: [],
            },
        }),
        (0, linkGroup_1.default)({
            overrides: {
                maxRows: 2,
            },
        }),
        {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: {
                condition: function (_, _a) {
                    var _b = _a === void 0 ? {} : _a, type = _b.type;
                    return ['highImpact', 'mediumImpact', 'customHero'].includes(type);
                },
            },
        },
    ],
};
