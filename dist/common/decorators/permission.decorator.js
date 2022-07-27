"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeedPermission = void 0;
const common_1 = require("@nestjs/common");
const NeedPermission = (...permissions) => (0, common_1.SetMetadata)('permission', permissions);
exports.NeedPermission = NeedPermission;
//# sourceMappingURL=permission.decorator.js.map