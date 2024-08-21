"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminsOrOrderedBy = void 0;
var checkRole_1 = require("../../Users/checkRole");
var adminsOrOrderedBy = function (_a) {
    var user = _a.req.user;
    if ((0, checkRole_1.checkRole)(['admin'], user)) {
        return true;
    }
    return {
        orderedBy: {
            equals: user === null || user === void 0 ? void 0 : user.id,
        },
    };
};
exports.adminsOrOrderedBy = adminsOrOrderedBy;
