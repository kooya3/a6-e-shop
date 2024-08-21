"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaBlock = void 0;
var invertBackground_1 = require("../../fields/invertBackground");
exports.MediaBlock = {
    slug: 'mediaBlock',
    fields: [
        invertBackground_1.invertBackground,
        {
            name: 'position',
            type: 'select',
            defaultValue: 'default',
            options: [
                {
                    label: 'Default',
                    value: 'default',
                },
                {
                    label: 'Fullscreen',
                    value: 'fullscreen',
                },
            ],
        },
        {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
    ],
};
