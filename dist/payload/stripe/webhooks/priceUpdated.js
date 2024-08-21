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
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceUpdated = void 0;
var logs = false;
var priceUpdated = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var event, payload, stripe, stripeProduct, stripeProductID, payloadProductID, productQuery, err_1, msg, stripePrices, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                event = args.event, payload = args.payload, stripe = args.stripe;
                stripeProduct = event.data.object.product;
                stripeProductID = typeof stripeProduct === 'string' ? stripeProduct : stripeProduct.id;
                if (logs)
                    payload.logger.info("\uD83E\uDE9D A price was created or updated in Stripe on product ID: ".concat(stripeProductID, ", syncing to Payload..."));
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                if (logs)
                    payload.logger.info("- Looking up existing Payload product...");
                return [4 /*yield*/, payload.find({
                        collection: 'products',
                        where: {
                            stripeProductID: {
                                equals: stripeProductID,
                            },
                        },
                    })];
            case 2:
                productQuery = _c.sent();
                payloadProductID = (_b = (_a = productQuery.docs) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id;
                if (payloadProductID) {
                    if (logs)
                        payload.logger.info("- Found existing product with Stripe ID: ".concat(stripeProductID, ", saving price..."));
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _c.sent();
                msg = err_1 instanceof Error ? err_1.message : 'Unknown error';
                payload.logger.error("Error finding product ".concat(msg));
                return [3 /*break*/, 4];
            case 4:
                _c.trys.push([4, 7, , 8]);
                return [4 /*yield*/, stripe.prices.list({
                        product: stripeProductID,
                        limit: 100,
                    })];
            case 5:
                stripePrices = _c.sent();
                return [4 /*yield*/, payload.update({
                        collection: 'products',
                        id: payloadProductID,
                        data: {
                            priceJSON: JSON.stringify(stripePrices),
                            skipSync: true,
                        },
                    })];
            case 6:
                _c.sent();
                if (logs)
                    payload.logger.info("\u2705 Successfully updated product price.");
                return [3 /*break*/, 8];
            case 7:
                error_1 = _c.sent();
                payload.logger.error("- Error updating product price: ".concat(error_1));
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.priceUpdated = priceUpdated;
