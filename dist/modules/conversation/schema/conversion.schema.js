"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationSchema = void 0;
const mongoose_1 = require("mongoose");
const message_entity_1 = require("../../message/entities/message.entity");
const user_entities_1 = require("../../user/entities/user.entities");
exports.ConversationSchema = new mongoose_1.Schema({
    lastMessage: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: message_entity_1.Message.name,
        autopopulate: { maxDepth: 1 },
    },
    messagePin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: message_entity_1.Message.name,
        autopopulate: { maxDepth: 1 },
    },
    isDeleted: { type: Boolean, default: false },
    members: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: user_entities_1.User.name,
        },
    ],
}, {
    timestamps: true,
});
//# sourceMappingURL=conversion.schema.js.map