"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ref = void 0;
const mongoose_1 = require("mongoose");
const ref = (Entity, option) => {
    const { autoPopulate = false, select = null } = option || {};
    return {
        type: mongoose_1.Types.ObjectId,
        ref: Entity.name,
        default: null,
        autoPopulate: autoPopulate ? { select } : false,
    };
};
exports.ref = ref;
//# sourceMappingURL=ref.utils.js.map