"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminsOrLoggedIn = void 0;
var checkRole_1 = require("../collections/Users/checkRole");
var adminsOrLoggedIn = function (_a) {
    var req = _a.req;
    if ((0, checkRole_1.checkRole)(['admin'], req.user)) {
        return true;
    }
    return !!req.user;
};
exports.adminsOrLoggedIn = adminsOrLoggedIn;
