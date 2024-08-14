"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerProxy = void 0;
var stripe_1 = __importDefault(require("stripe"));
var stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-08-01',
});
var logs = process.env.LOGS_STRIPE_PROXY === '1';
// use this handler to interact with a Stripe customer associated with any given user
// does so in secure way that does not leak or expose any cross-customer data
// pass the proper method and body to this endpoint to interact with the Stripe API
// available methods:
// GET /api/users/:id/customer
// POST /api/users/:id/customer
// body: { customer: Stripe.CustomerUpdateParams }
var customerProxy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, message, response, customer, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userID = req.params.userID;
                if (!req.user) {
                    if (logs)
                        req.payload.logger.error({ err: "You are not authorized to access this customer" });
                    res.status(401).json({ error: 'You are not authorized to access this customer' });
                    return [2 /*return*/];
                }
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.stripeCustomerID)) {
                    message = "No stripeCustomerID found for user ".concat(userID);
                    if (logs)
                        req.payload.logger.error({ err: message });
                    res.status(401).json({ error: message });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                response = void 0;
                customer = null;
                if (!req.user.stripeCustomerID) return [3 /*break*/, 3];
                return [4 /*yield*/, stripe.customers.retrieve(req.user.stripeCustomerID, {
                        expand: ['invoice_settings.default_payment_method'],
                    })];
            case 2:
                // look up the customer to ensure that it belongs to the user
                // this will ensure that this user is allows perform operations on it
                customer = _b.sent();
                if (customer.deleted) {
                    res.status(404).json({ error: "Customer ".concat(req.user.stripeCustomerID, " not found") });
                    return [2 /*return*/];
                }
                // ensure the customer belongs to the user
                if (customer.id !== req.user.stripeCustomerID) {
                    res.status(401).json({ error: "You are not authorized to access this customer" });
                    return [2 /*return*/];
                }
                _b.label = 3;
            case 3:
                if (req.method === 'GET') {
                    if (req.user.stripeCustomerID) {
                        response = customer;
                    }
                }
                if (!(req.method === 'PATCH')) return [3 /*break*/, 5];
                if (!req.body)
                    throw new Error('No customer data provided');
                return [4 /*yield*/, stripe.customers.update(req.user.stripeCustomerID, req.body)];
            case 4:
                // TODO: lock down the spread `customer` object to only allow certain fields
                response = _b.sent();
                _b.label = 5;
            case 5:
                res.status(200).json(response);
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                if (logs)
                    req.payload.logger.error({ err: "Error using Stripe API: ".concat(error_1) });
                res.status(500).json({ error: "Error using Stripe API: ".concat(error_1) });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.customerProxy = customerProxy;
