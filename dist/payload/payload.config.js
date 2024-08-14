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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bundler_webpack_1 = require("@payloadcms/bundler-webpack"); // bundler-import
var db_mongodb_1 = require("@payloadcms/db-mongodb"); // database-adapter-import
var plugin_cloud_1 = require("@payloadcms/plugin-cloud");
var plugin_nested_docs_1 = __importDefault(require("@payloadcms/plugin-nested-docs"));
var plugin_redirects_1 = __importDefault(require("@payloadcms/plugin-redirects"));
var plugin_seo_1 = __importDefault(require("@payloadcms/plugin-seo"));
var plugin_stripe_1 = __importDefault(require("@payloadcms/plugin-stripe"));
var richtext_slate_1 = require("@payloadcms/richtext-slate"); // editor-import
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var config_1 = require("payload/config");
var Categories_1 = __importDefault(require("./collections/Categories"));
var Media_1 = require("./collections/Media");
var Orders_1 = require("./collections/Orders");
var Pages_1 = require("./collections/Pages");
var Products_1 = __importDefault(require("./collections/Products"));
var Users_1 = __importDefault(require("./collections/Users"));
var BeforeDashboard_1 = __importDefault(require("./components/BeforeDashboard"));
var BeforeLogin_1 = __importDefault(require("./components/BeforeLogin"));
var create_payment_intent_1 = require("./endpoints/create-payment-intent");
var customers_1 = require("./endpoints/customers");
var products_1 = require("./endpoints/products");
var seed_1 = require("./endpoints/seed");
var Footer_1 = require("./globals/Footer");
var Header_1 = require("./globals/Header");
var Settings_1 = require("./globals/Settings");
var priceUpdated_1 = require("./stripe/webhooks/priceUpdated");
var productUpdated_1 = require("./stripe/webhooks/productUpdated");
var generateTitle = function () {
    return 'My Store';
};
var mockModulePath = path_1.default.resolve(__dirname, './emptyModuleMock.js');
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../../.env'),
});
exports.default = (0, config_1.buildConfig)({
    admin: {
        user: Users_1.default.slug,
        bundler: (0, bundler_webpack_1.webpackBundler)(),
        components: {
            // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
            // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
            beforeLogin: [BeforeLogin_1.default],
            // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
            // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
            beforeDashboard: [BeforeDashboard_1.default],
        },
        webpack: function (config) {
            var _a;
            var _b;
            return __assign(__assign({}, config), { resolve: __assign(__assign({}, config.resolve), { alias: __assign(__assign({}, (_b = config.resolve) === null || _b === void 0 ? void 0 : _b.alias), (_a = { dotenv: path_1.default.resolve(__dirname, './dotenv.js') }, _a[path_1.default.resolve(__dirname, 'collections/Products/hooks/beforeChange')] = mockModulePath, _a[path_1.default.resolve(__dirname, 'collections/Users/hooks/createStripeCustomer')] = mockModulePath, _a[path_1.default.resolve(__dirname, 'collections/Users/endpoints/customer')] = mockModulePath, _a[path_1.default.resolve(__dirname, 'endpoints/create-payment-intent')] = mockModulePath, _a[path_1.default.resolve(__dirname, 'endpoints/customers')] = mockModulePath, _a[path_1.default.resolve(__dirname, 'endpoints/products')] = mockModulePath, _a[path_1.default.resolve(__dirname, 'endpoints/seed')] = mockModulePath, _a.stripe = mockModulePath, _a.express = mockModulePath, _a)) }) });
        },
    },
    editor: (0, richtext_slate_1.slateEditor)({}),
    // database-adapter-config-start
    db: (0, db_mongodb_1.mongooseAdapter)({
        url: process.env.DATABASE_URI,
    }),
    // database-adapter-config-end
    serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
    collections: [Pages_1.Pages, Products_1.default, Orders_1.Orders, Media_1.Media, Categories_1.default, Users_1.default],
    globals: [Settings_1.Settings, Header_1.Header, Footer_1.Footer],
    typescript: {
        outputFile: path_1.default.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path_1.default.resolve(__dirname, 'generated-schema.graphql'),
    },
    cors: ['https://checkout.stripe.com', process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
    csrf: ['https://checkout.stripe.com', process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
    endpoints: [
        {
            path: '/create-payment-intent',
            method: 'post',
            handler: create_payment_intent_1.createPaymentIntent,
        },
        {
            path: '/stripe/customers',
            method: 'get',
            handler: customers_1.customersProxy,
        },
        {
            path: '/stripe/products',
            method: 'get',
            handler: products_1.productsProxy,
        },
        // The seed endpoint is used to populate the database with some example data
        // You should delete this endpoint before deploying your site to production
        {
            path: '/seed',
            method: 'get',
            handler: seed_1.seed,
        },
    ],
    plugins: [
        (0, plugin_stripe_1.default)({
            stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
            isTestKey: Boolean(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY),
            stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET,
            rest: false,
            webhooks: {
                'product.created': productUpdated_1.productUpdated,
                'product.updated': productUpdated_1.productUpdated,
                'price.updated': priceUpdated_1.priceUpdated,
            },
        }),
        (0, plugin_redirects_1.default)({
            collections: ['pages', 'products'],
        }),
        (0, plugin_nested_docs_1.default)({
            collections: ['categories'],
        }),
        (0, plugin_seo_1.default)({
            collections: ['pages', 'products'],
            generateTitle: generateTitle,
            uploadsCollection: 'media',
        }),
        (0, plugin_cloud_1.payloadCloud)(),
    ],
});
