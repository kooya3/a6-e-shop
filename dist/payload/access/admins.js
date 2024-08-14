"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admins = void 0;
var checkRole_1 = require("../collections/Users/checkRole");
var admins = function (_a) {
    var user = _a.req.user;
    return (0, checkRole_1.checkRole)(['admin'], user);
};
exports.admins = admins;
