"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterProductBuilder = void 0;
const constants_1 = require("../../constants/constants");
const string_utils_1 = require("../../utils/string.utils");
class FilterProductBuilder {
    constructor() {
        this.queryFilter = {
            $and: [],
        };
        this.querySort = {};
    }
    addSortOption(input) {
        if (!input) {
            return this;
        }
        constants_1.Constants.generateSortOrder();
        const { property, option } = constants_1.Constants.SortOrder[input];
        this.querySort[property] = option;
        return this;
    }
    addProductId(productId) {
        if (!productId) {
            return this;
        }
        this.setFilterItem('_id', { $eq: productId });
        return this;
    }
    addDiscount(isDiscount) {
        if (!isDiscount) {
            return this;
        }
        this.setFilterItem('discount', { $ne: 0 });
        return this;
    }
    addRangePrice(minPrice, maxPrice) {
        if (!maxPrice) {
            return this;
        }
        this.setFilterItem('price', { $lte: maxPrice, $gte: minPrice });
        return this;
    }
    addName(name) {
        var _a;
        name = (_a = name === null || name === void 0 ? void 0 : name.toLowerCase()) === null || _a === void 0 ? void 0 : _a.trim();
        if (!name)
            return this;
        this.setFilterItem('keyword', {
            $regex: `${(0, string_utils_1.transformTextSearch)(name)}`,
            $options: 'i',
        });
        return this;
    }
    buildQuery() {
        var _a, _b;
        if (!((_b = (_a = this.queryFilter) === null || _a === void 0 ? void 0 : _a.$and) === null || _b === void 0 ? void 0 : _b.length))
            return [{}, this.querySort];
        return [this.queryFilter, this.querySort];
    }
    addSubQuery(query) {
        if (query)
            this.queryFilter['$and'].push(query);
        return this;
    }
    setFilterItem(key, value) {
        if (!key || !value)
            return this;
        const query = {};
        query[key] = value;
        this.addSubQuery(query);
        return this;
    }
}
exports.FilterProductBuilder = FilterProductBuilder;
//# sourceMappingURL=concreteBuilder.js.map