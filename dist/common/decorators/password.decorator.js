"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPassword = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.IsPassword = (0, common_1.createParamDecorator)((context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const request = ctx.getContext().req.body;
});
//# sourceMappingURL=password.decorator.js.map