"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
exports.Settings = {
    slug: 'settings',
    typescript: {
        interface: 'Settings',
    },
    graphQL: {
        name: 'Settings',
    },
    access: {
        read: function () { return true; },
    },
    fields: [
        {
            name: 'productsPage',
            type: 'relationship',
            relationTo: 'pages',
            label: 'Products page',
        },
    ],
};
