"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appearanceOptions = void 0;
var deepMerge_1 = __importDefault(require("../utilities/deepMerge"));
exports.appearanceOptions = {
    primary: {
        label: 'Primary Button',
        value: 'primary',
    },
    secondary: {
        label: 'Secondary Button',
        value: 'secondary',
    },
    default: {
        label: 'Default',
        value: 'default',
    },
};
var link = function (_a) {
    var _b = _a === void 0 ? {} : _a, appearances = _b.appearances, _c = _b.disableLabel, disableLabel = _c === void 0 ? false : _c, _d = _b.overrides, overrides = _d === void 0 ? {} : _d;
    var linkResult = {
        name: 'link',
        type: 'group',
        admin: {
            hideGutter: true,
        },
        fields: [
            {
                type: 'row',
                fields: [
                    {
                        name: 'type',
                        type: 'radio',
                        options: [
                            {
                                label: 'Internal link',
                                value: 'reference',
                            },
                            {
                                label: 'Custom URL',
                                value: 'custom',
                            },
                        ],
                        defaultValue: 'reference',
                        admin: {
                            layout: 'horizontal',
                            width: '50%',
                        },
                    },
                    {
                        name: 'newTab',
                        label: 'Open in new tab',
                        type: 'checkbox',
                        admin: {
                            width: '50%',
                            style: {
                                alignSelf: 'flex-end',
                            },
                        },
                    },
                ],
            },
        ],
    };
    var linkTypes = [
        {
            name: 'reference',
            label: 'Document to link to',
            type: 'relationship',
            relationTo: ['pages'],
            required: true,
            maxDepth: 1,
            admin: {
                condition: function (_, siblingData) { return (siblingData === null || siblingData === void 0 ? void 0 : siblingData.type) === 'reference'; },
            },
        },
        {
            name: 'url',
            label: 'Custom URL',
            type: 'text',
            required: true,
            admin: {
                condition: function (_, siblingData) { return (siblingData === null || siblingData === void 0 ? void 0 : siblingData.type) === 'custom'; },
            },
        },
    ];
    if (!disableLabel) {
        linkTypes.map(function (linkType) { return (__assign(__assign({}, linkType), { admin: __assign(__assign({}, linkType.admin), { width: '50%' }) })); });
        linkResult.fields.push({
            type: 'row',
            fields: __spreadArray(__spreadArray([], linkTypes, true), [
                {
                    name: 'label',
                    label: 'Label',
                    type: 'text',
                    required: true,
                    admin: {
                        width: '50%',
                    },
                },
                {
                    name: 'icon',
                    label: 'Icon',
                    type: 'upload',
                    relationTo: 'media',
                },
            ], false),
        });
    }
    else {
        linkResult.fields = __spreadArray(__spreadArray([], linkResult.fields, true), linkTypes, true);
    }
    if (appearances !== false) {
        var appearanceOptionsToUse = [
            exports.appearanceOptions.default,
            exports.appearanceOptions.primary,
            exports.appearanceOptions.secondary,
        ];
        if (appearances) {
            appearanceOptionsToUse = appearances.map(function (appearance) { return exports.appearanceOptions[appearance]; });
        }
        linkResult.fields.push({
            name: 'appearance',
            type: 'select',
            defaultValue: 'default',
            options: appearanceOptionsToUse,
            admin: {
                description: 'Choose how the link should be rendered.',
            },
        });
    }
    return (0, deepMerge_1.default)(linkResult, overrides);
};
exports.default = link;
