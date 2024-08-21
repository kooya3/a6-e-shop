"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminsOrPublished = void 0;
var checkRole_1 = require("../../Users/checkRole");
var adminsOrPublished = function (_a) {
    var user = _a.req.user;
    if ((0, checkRole_1.checkRole)(['admin'], user)) {
        return true;
    }
    return {
        _status: {
            equals: 'published',
        },
    };
};
exports.adminsOrPublished = adminsOrPublished;
