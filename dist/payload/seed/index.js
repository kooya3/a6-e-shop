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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var cart_page_1 = require("./cart-page");
var home_1 = require("./home");
var image_1_1 = require("./image-1");
var image_2_1 = require("./image-2");
var image_3_1 = require("./image-3");
var product_1_1 = require("./product-1");
var product_2_1 = require("./product-2");
var product_3_1 = require("./product-3");
var products_page_1 = require("./products-page");
var collections = ['categories', 'media', 'pages', 'products'];
var globals = ['header', 'settings', 'footer'];
// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
var seed = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var mediaDir, _a, image1Doc, image2Doc, image3Doc, _b, _c, _d, image1ID, image2ID, image3ID, _e, apparelCategory, ebooksCategory, coursesCategory, _f, _g, _h, product1Doc, product2Doc, product3Doc, _j, _k, _l, productsPageDoc, productsPageID;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                payload.logger.info('Seeding database...');
                // we need to clear the media directory before seeding
                // as well as the collections and globals
                // this is because while `yarn seed` drops the database
                // the custom `/api/seed` endpoint does not
                payload.logger.info("\u2014 Clearing media...");
                mediaDir = path_1.default.resolve(__dirname, '../../media');
                if (fs_1.default.existsSync(mediaDir)) {
                    fs_1.default.rmdirSync(mediaDir, { recursive: true });
                }
                payload.logger.info("\u2014 Clearing collections and globals...");
                // clear the database
                return [4 /*yield*/, Promise.all(__spreadArray(__spreadArray([], collections.map(function (collection) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, payload.delete({
                                    collection: collection,
                                    where: {},
                                })];
                        });
                    }); }), true), globals.map(function (global) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, payload.updateGlobal({
                                    slug: global,
                                    data: {},
                                })];
                        });
                    }); }), true))];
            case 1:
                // clear the database
                _m.sent();
                payload.logger.info("\u2014 Seeding media...");
                _c = (_b = Promise).all;
                return [4 /*yield*/, payload.create({
                        collection: 'media',
                        filePath: path_1.default.resolve(__dirname, 'image-1.jpg'),
                        data: image_1_1.image1,
                    })];
            case 2:
                _d = [
                    _m.sent()
                ];
                return [4 /*yield*/, payload.create({
                        collection: 'media',
                        filePath: path_1.default.resolve(__dirname, 'image-2.jpg'),
                        data: image_2_1.image2,
                    })];
            case 3:
                _d = _d.concat([
                    _m.sent()
                ]);
                return [4 /*yield*/, payload.create({
                        collection: 'media',
                        filePath: path_1.default.resolve(__dirname, 'image-3.jpg'),
                        data: image_3_1.image3,
                    })];
            case 4: return [4 /*yield*/, _c.apply(_b, [_d.concat([
                        _m.sent()
                    ])])];
            case 5:
                _a = _m.sent(), image1Doc = _a[0], image2Doc = _a[1], image3Doc = _a[2];
                image1ID = image1Doc.id;
                image2ID = image2Doc.id;
                image3ID = image3Doc.id;
                if (payload.db.defaultIDType === 'text') {
                    image1ID = "\"".concat(image1ID, "\"");
                    image2ID = "\"".concat(image2ID, "\"");
                    image3ID = "\"".concat(image3ID, "\"");
                }
                payload.logger.info("\u2014 Seeding categories...");
                _g = (_f = Promise).all;
                return [4 /*yield*/, payload.create({
                        collection: 'categories',
                        data: {
                            title: 'Apparel',
                        },
                    })];
            case 6:
                _h = [
                    _m.sent()
                ];
                return [4 /*yield*/, payload.create({
                        collection: 'categories',
                        data: {
                            title: 'E-books',
                        },
                    })];
            case 7:
                _h = _h.concat([
                    _m.sent()
                ]);
                return [4 /*yield*/, payload.create({
                        collection: 'categories',
                        data: {
                            title: 'Online courses',
                        },
                    })];
            case 8: return [4 /*yield*/, _g.apply(_f, [_h.concat([
                        _m.sent()
                    ])])];
            case 9:
                _e = _m.sent(), apparelCategory = _e[0], ebooksCategory = _e[1], coursesCategory = _e[2];
                payload.logger.info("\u2014 Seeding products...");
                return [4 /*yield*/, payload.create({
                        collection: 'products',
                        data: JSON.parse(JSON.stringify(__assign(__assign({}, product_1_1.product1), { categories: [apparelCategory.id] })).replace(/"\{\{PRODUCT_IMAGE\}\}"/g, image1ID)),
                    })];
            case 10:
                product1Doc = _m.sent();
                return [4 /*yield*/, payload.create({
                        collection: 'products',
                        data: JSON.parse(JSON.stringify(__assign(__assign({}, product_2_1.product2), { categories: [ebooksCategory.id] })).replace(/"\{\{PRODUCT_IMAGE\}\}"/g, image2ID)),
                    })];
            case 11:
                product2Doc = _m.sent();
                return [4 /*yield*/, payload.create({
                        collection: 'products',
                        data: JSON.parse(JSON.stringify(__assign(__assign({}, product_3_1.product3), { categories: [coursesCategory.id] })).replace(/"\{\{PRODUCT_IMAGE\}\}"/g, image3ID)),
                    })
                    // update each product with related products
                ];
            case 12:
                product3Doc = _m.sent();
                _k = (_j = Promise).all;
                return [4 /*yield*/, payload.update({
                        collection: 'products',
                        id: product1Doc.id,
                        data: {
                            relatedProducts: [product2Doc.id, product3Doc.id],
                        },
                    })];
            case 13:
                _l = [
                    _m.sent()
                ];
                return [4 /*yield*/, payload.update({
                        collection: 'products',
                        id: product2Doc.id,
                        data: {
                            relatedProducts: [product1Doc.id, product3Doc.id],
                        },
                    })];
            case 14:
                _l = _l.concat([
                    _m.sent()
                ]);
                return [4 /*yield*/, payload.update({
                        collection: 'products',
                        id: product3Doc.id,
                        data: {
                            relatedProducts: [product1Doc.id, product2Doc.id],
                        },
                    })];
            case 15: 
            // update each product with related products
            return [4 /*yield*/, _k.apply(_j, [_l.concat([
                        _m.sent()
                    ])])];
            case 16:
                // update each product with related products
                _m.sent();
                payload.logger.info("\u2014 Seeding products page...");
                return [4 /*yield*/, payload.create({
                        collection: 'pages',
                        data: products_page_1.productsPage,
                    })];
            case 17:
                productsPageDoc = _m.sent();
                productsPageID = productsPageDoc.id;
                if (payload.db.defaultIDType === 'text') {
                    productsPageID = "\"".concat(productsPageID, "\"");
                }
                payload.logger.info("\u2014 Seeding home page...");
                return [4 /*yield*/, payload.create({
                        collection: 'pages',
                        data: JSON.parse(JSON.stringify(home_1.home)
                            .replace(/"\{\{PRODUCT1_IMAGE\}\}"/g, image1ID)
                            .replace(/"\{\{PRODUCT2_IMAGE\}\}"/g, image2ID)
                            .replace(/"\{\{PRODUCTS_PAGE_ID\}\}"/g, productsPageID)),
                    })];
            case 18:
                _m.sent();
                payload.logger.info("\u2014 Seeding cart page...");
                return [4 /*yield*/, payload.create({
                        collection: 'pages',
                        data: JSON.parse(JSON.stringify(cart_page_1.cartPage).replace(/"\{\{PRODUCTS_PAGE_ID\}\}"/g, productsPageID)),
                    })];
            case 19:
                _m.sent();
                payload.logger.info("\u2014 Seeding settings...");
                return [4 /*yield*/, payload.updateGlobal({
                        slug: 'settings',
                        data: {
                            productsPage: productsPageDoc.id,
                        },
                    })];
            case 20:
                _m.sent();
                payload.logger.info("\u2014 Seeding header...");
                return [4 /*yield*/, payload.updateGlobal({
                        slug: 'header',
                        data: {
                            navItems: [
                                {
                                    link: {
                                        type: 'reference',
                                        reference: {
                                            relationTo: 'pages',
                                            value: productsPageDoc.id,
                                        },
                                        label: 'Shop',
                                    },
                                },
                            ],
                        },
                    })];
            case 21:
                _m.sent();
                payload.logger.info('Seeded database successfully!');
                return [2 /*return*/];
        }
    });
}); };
exports.seed = seed;
