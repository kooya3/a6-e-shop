"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkToPaymentIntent = void 0;
var React = __importStar(require("react"));
var forms_1 = require("payload/components/forms");
var CopyToClipboard_1 = __importDefault(require("payload/dist/admin/components/elements/CopyToClipboard"));
var LinkToPaymentIntent = function (props) {
    var name = props.name, label = props.label;
    var stripePaymentIntentID = ((0, forms_1.useFormFields)(function (_a) {
        var fields = _a[0];
        return fields[name];
    }) || {}).value;
    var href = "https://dashboard.stripe.com/".concat(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY ? 'test/' : '', "payments/").concat(stripePaymentIntentID);
    return (React.createElement("div", null,
        React.createElement("p", { style: { marginBottom: '0' } }, typeof label === 'string' ? label : 'Stripe Payment Intent ID'),
        React.createElement(forms_1.Text, __assign({}, props, { label: "" })),
        Boolean(stripePaymentIntentID) && (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("span", { className: "label", style: {
                        color: '#9A9A9A',
                    } }, "Manage in Stripe"),
                React.createElement(CopyToClipboard_1.default, { value: href })),
            React.createElement("div", { style: {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontWeight: '600',
                } },
                React.createElement("a", { href: "https://dashboard.stripe.com/".concat(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY ? 'test/' : '', "customers/").concat(stripePaymentIntentID), target: "_blank", rel: "noreferrer noopener" }, href))))));
};
exports.LinkToPaymentIntent = LinkToPaymentIntent;
