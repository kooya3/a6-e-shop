"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var components_1 = require("payload/components");
var SeedButton_1 = require("./SeedButton");
require("./index.scss");
var baseClass = 'before-dashboard';
var BeforeDashboard = function () {
    return (react_1.default.createElement("div", { className: baseClass },
        react_1.default.createElement(components_1.Banner, { className: "".concat(baseClass, "__banner"), type: "success" },
            react_1.default.createElement("h4", null, "Welcome to your dashboard!")),
        "Here's what to do next:",
        react_1.default.createElement("ul", { className: "".concat(baseClass, "__instructions") },
            react_1.default.createElement("li", null,
                react_1.default.createElement(SeedButton_1.SeedButton, null),
                ' with a few products and pages to jump-start your new project, then ',
                react_1.default.createElement("a", { href: "/" }, "visit your website"),
                ' to see the results.'),
            react_1.default.createElement("li", null,
                'Head over to ',
                react_1.default.createElement("a", { href: "https://dashboard.stripe.com/test/apikeys", target: "_blank", rel: "noopener noreferrer" }, 'Stripe to obtain your API Keys'),
                '. Create a new account if needed, then copy them into your environment variables and restart your server. See the ',
                react_1.default.createElement("a", { href: "https://github.com/payloadcms/payload/blob/main/templates/ecommerce/README.md#stripe", target: "_blank", rel: "noopener noreferrer" }, 'README'),
                ' for more details.'),
            react_1.default.createElement("li", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/collections/products" }, "Link each of your products"),
                ' to Stripe by selecting the corresponding product using the dropdown under ',
                react_1.default.createElement("i", null, "Product Details"),
                "."),
            react_1.default.createElement("li", null,
                "If you created this repo using Payload Cloud, head over to GitHub and clone it to your local machine. It will be under the ",
                react_1.default.createElement("i", null, "GitHub Scope"),
                " that you selected when creating this project."),
            react_1.default.createElement("li", null,
                'Modify your ',
                react_1.default.createElement("a", { href: "https://payloadcms.com/docs/configuration/collections", target: "_blank", rel: "noopener noreferrer" }, "collections"),
                ' and add more ',
                react_1.default.createElement("a", { href: "https://payloadcms.com/docs/fields/overview", target: "_blank", rel: "noopener noreferrer" }, "fields"),
                ' as needed. If you are new to Payload, we also recommend you check out the ',
                react_1.default.createElement("a", { href: "https://payloadcms.com/docs/getting-started/what-is-payload", target: "_blank", rel: "noopener noreferrer" }, "Getting Started"),
                ' docs.'),
            react_1.default.createElement("li", null, "Commit and push your changes to the repository to trigger a redeployment of your project.")),
        'Pro Tip: This block is a ',
        react_1.default.createElement("a", { href: 'https://payloadcms.com/docs/admin/components#base-component-overrides', target: "_blank", rel: "noopener noreferrer" }, "custom component"),
        ", you can remove it at any time by updating your ",
        react_1.default.createElement("strong", null, "payload.config"),
        "."));
};
exports.default = BeforeDashboard;
