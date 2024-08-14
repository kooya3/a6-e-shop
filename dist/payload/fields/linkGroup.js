"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var deepMerge_1 = __importDefault(require("../utilities/deepMerge"));
var link_1 = __importDefault(require("./link"));
var linkGroup = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.overrides, overrides = _c === void 0 ? {} : _c, appearances = _b.appearances;
    var generatedLinkGroup = {
        name: 'links',
        type: 'array',
        fields: [
            (0, link_1.default)({
                appearances: appearances,
            }),
        ],
    };
    return (0, deepMerge_1.default)(generatedLinkGroup, overrides);
};
exports.default = linkGroup;
