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
exports.createPaymentIntent = void 0;
var stripe_1 = __importDefault(require("stripe"));
var stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2022-08-01',
});
// this endpoint creates a `PaymentIntent` with the items in the cart
// to do this, we loop through the items in the cart and lookup the product in Stripe
// we then add the price of the product to the total
// once completed, we pass the `client_secret` of the `PaymentIntent` back to the client which can process the payment
var createPaymentIntent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, payload, fullUser, stripeCustomerID, customer, total_1, hasItems, paymentIntent, error_1, message;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                user = req.user, payload = req.payload;
                if (!user) {
                    res.status(401).send('Unauthorized');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, payload.findByID({
                        collection: 'users',
                        id: user === null || user === void 0 ? void 0 : user.id,
                    })];
            case 1:
                fullUser = _e.sent();
                if (!fullUser) {
                    res.status(404).json({ error: 'User not found' });
                    return [2 /*return*/];
                }
                _e.label = 2;
            case 2:
                _e.trys.push([2, 8, , 9]);
                stripeCustomerID = fullUser === null || fullUser === void 0 ? void 0 : fullUser.stripeCustomerID;
                if (!!stripeCustomerID) return [3 /*break*/, 5];
                return [4 /*yield*/, stripe.customers.create({
                        email: fullUser === null || fullUser === void 0 ? void 0 : fullUser.email,
                        name: fullUser === null || fullUser === void 0 ? void 0 : fullUser.name,
                    })];
            case 3:
                customer = _e.sent();
                stripeCustomerID = customer.id;
                return [4 /*yield*/, payload.update({
                        collection: 'users',
                        id: user === null || user === void 0 ? void 0 : user.id,
                        data: {
                            stripeCustomerID: stripeCustomerID,
                        },
                    })];
            case 4:
                _e.sent();
                _e.label = 5;
            case 5:
                total_1 = 0;
                hasItems = ((_b = (_a = fullUser === null || fullUser === void 0 ? void 0 : fullUser.cart) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 : _b.length) > 0;
                if (!hasItems) {
                    throw new Error('No items in cart');
                }
                // for each item in cart, lookup the product in Stripe and add its price to the total
                return [4 /*yield*/, Promise.all((_d = (_c = fullUser === null || fullUser === void 0 ? void 0 : fullUser.cart) === null || _c === void 0 ? void 0 : _c.items) === null || _d === void 0 ? void 0 : _d.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                        var product, quantity, prices, price;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    product = item.product, quantity = item.quantity;
                                    if (!quantity) {
                                        return [2 /*return*/, null];
                                    }
                                    if (typeof product === 'string' || !(product === null || product === void 0 ? void 0 : product.stripeProductID)) {
                                        throw new Error('No Stripe Product ID');
                                    }
                                    return [4 /*yield*/, stripe.prices.list({
                                            product: product.stripeProductID,
                                            limit: 100,
                                            expand: ['data.product'],
                                        })];
                                case 1:
                                    prices = _a.sent();
                                    if (prices.data.length === 0) {
                                        res.status(404).json({ error: 'There are no items in your cart to checkout with' });
                                        return [2 /*return*/, null];
                                    }
                                    price = prices.data[0];
                                    total_1 += price.unit_amount * quantity;
                                    return [2 /*return*/, null];
                            }
                        });
                    }); }))];
            case 6:
                // for each item in cart, lookup the product in Stripe and add its price to the total
                _e.sent();
                if (total_1 === 0) {
                    throw new Error('There is nothing to pay for, add some items to your cart and try again.');
                }
                return [4 /*yield*/, stripe.paymentIntents.create({
                        customer: stripeCustomerID,
                        amount: total_1,
                        currency: 'usd',
                        payment_method_types: ['card'],
                    })];
            case 7:
                paymentIntent = _e.sent();
                res.send({ client_secret: paymentIntent.client_secret });
                return [3 /*break*/, 9];
            case 8:
                error_1 = _e.sent();
                message = error_1 instanceof Error ? error_1.message : 'Unknown error';
                payload.logger.error(message);
                res.json({ error: message });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.createPaymentIntent = createPaymentIntent;
