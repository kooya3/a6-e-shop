"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkRole_1 = require("../checkRole");
var adminsAndUser = function (_a) {
    var user = _a.req.user;
    if (user) {
        if ((0, checkRole_1.checkRole)(['admin'], user)) {
            return true;
        }
        return {
            id: {
                equals: user.id,
            },
        };
    }
    return false;
};
exports.default = adminsAndUser;
