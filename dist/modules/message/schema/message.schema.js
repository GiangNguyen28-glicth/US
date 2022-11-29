"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../constants/enum");
const conversation_entity_1 = require("../../conversation/entities/conversation.entity");
const user_entities_1 = require("../../user/entities/user.entities");
exports.MessageSchema = new mongoose_1.Schema({
    text: { type: String, trim: true },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_entities_1.User.name,
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_entities_1.User.name,
        required: true,
    },
    conversion_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: conversation_entity_1.Conversation.name,
        required: true,
    },
    cursor: { type: Number },
    urlMessageImage: { type: String, trim: true },
    type: { type: String, enum: Object.values(enum_1.MessageType) },
    isDeleted: { type: Boolean },
    keyword: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=message.schema.js.map