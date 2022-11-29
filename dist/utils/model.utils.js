"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwIfNotExists = void 0;
const common_1 = require("@nestjs/common");
function throwIfNotExists(model, message) {
    if (!model || (model === null || model === void 0 ? void 0 : model.isDeleted)) {
        throw new common_1.NotFoundException(`${message}`);
    }
}
exports.throwIfNotExists = throwIfNotExists;
//# sourceMappingURL=model.utils.js.map