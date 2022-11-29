"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmbeddedSchema = void 0;
const mongoose_1 = require("mongoose");
const user_entities_1 = require("../../user/entities/user.entities");
exports.UserEmbeddedSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: user_entities_1.User.name, autopopulate: false },
    unlikeUser: [{ type: mongoose_1.Schema.Types.ObjectId }],
    like: [{ type: mongoose_1.Schema.Types.ObjectId }],
    countLike: { type: Number, default: 0 },
    countUnlike: { type: Number, default: 0 },
}, {
    timestamps: true,
});
//# sourceMappingURL=user_embedded.schema.js.map