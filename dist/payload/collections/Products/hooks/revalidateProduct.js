"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidateProduct = void 0;
var revalidate_1 = require("../../../utilities/revalidate");
// Revalidate the page in the background, so the user doesn't have to wait
// Notice that the hook itself is not async and we are not awaiting `revalidate`
// Only revalidate existing docs that are published
// Don't scope to `operation` in order to purge static demo pages
var revalidateProduct = function (_a) {
    var doc = _a.doc, payload = _a.req.payload;
    if (doc._status === 'published') {
        (0, revalidate_1.revalidate)({ payload: payload, collection: 'products', slug: doc.slug });
    }
    return doc;
};
exports.revalidateProduct = revalidateProduct;
