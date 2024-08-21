"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
var checkRole = function (allRoles, user) {
    if (allRoles === void 0) { allRoles = []; }
    if (user) {
        if (allRoles.some(function (role) {
            var _a;
            return (_a = user === null || user === void 0 ? void 0 : user.roles) === null || _a === void 0 ? void 0 : _a.some(function (individualRole) {
                return individualRole === role;
            });
        }))
            return true;
    }
    return false;
};
exports.checkRole = checkRole;
