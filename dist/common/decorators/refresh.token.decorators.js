"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentRefreshToken = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.GetCurrentRefreshToken = (0, common_1.createParamDecorator)((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    if (!data) {
        return request.user;
    }
    return request.user[data];
});
//# sourceMappingURL=refresh.token.decorators.js.map