"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
var richtext_slate_1 = require("@payloadcms/richtext-slate");
var path_1 = __importDefault(require("path"));
exports.Media = {
    slug: 'media',
    upload: {
        staticDir: path_1.default.resolve(__dirname, '../../../media'),
    },
    access: {
        read: function () { return true; },
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
        {
            name: 'caption',
            type: 'richText',
            editor: (0, richtext_slate_1.slateEditor)({
                admin: {
                    elements: ['link'],
                },
            }),
        },
    ],
};
