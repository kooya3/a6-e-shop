"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var BeforeLogin = function () {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("p", null,
            react_1.default.createElement("b", null, "Welcome to your dashboard!"),
            ' This is where site admins will log in to manage your store. Customers will need to ',
            react_1.default.createElement("a", { href: "".concat(process.env.PAYLOAD_PUBLIC_SERVER_URL, "/login") }, "log in to the site instead"),
            ' to access their user account, order history, and more.')));
};
exports.default = BeforeLogin;
