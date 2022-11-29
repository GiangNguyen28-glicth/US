"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserWS = exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.GetUser = (0, common_1.createParamDecorator)((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request.user;
});
exports.GetUserWS = (0, common_1.createParamDecorator)((data, context) => {
    const user = context.switchToWs().getClient().handshake.user;
    return user;
});
//# sourceMappingURL=getuser.decorators.js.map