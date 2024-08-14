"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallToAction = void 0;
var invertBackground_1 = require("../../fields/invertBackground");
var linkGroup_1 = __importDefault(require("../../fields/linkGroup"));
var richText_1 = __importDefault(require("../../fields/richText"));
exports.CallToAction = {
    slug: 'cta',
    labels: {
        singular: 'Call to Action',
        plural: 'Calls to Action',
    },
    fields: [
        invertBackground_1.invertBackground,
        (0, richText_1.default)(),
        (0, linkGroup_1.default)({
            appearances: ['primary', 'secondary'],
            overrides: {
                maxRows: 2,
            },
        }),
    ],
};
