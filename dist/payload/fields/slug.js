"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugField = void 0;
var deepMerge_1 = __importDefault(require("../utilities/deepMerge"));
var formatSlug_1 = __importDefault(require("../utilities/formatSlug"));
var slugField = function (fieldToUse, overrides) {
    if (fieldToUse === void 0) { fieldToUse = 'title'; }
    if (overrides === void 0) { overrides = {}; }
    return (0, deepMerge_1.default)({
        name: 'slug',
        label: 'Slug',
        type: 'text',
        index: true,
        admin: {
            position: 'sidebar',
        },
        hooks: {
            beforeValidate: [(0, formatSlug_1.default)(fieldToUse)],
        },
    }, overrides);
};
exports.slugField = slugField;
