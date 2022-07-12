"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogHealthIndicator = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
let DogHealthIndicator = class DogHealthIndicator extends terminus_1.HealthIndicator {
    constructor() {
        super(...arguments);
        this.dogs = [
            { name: 'Fido', type: 'goodboy' },
            { name: 'Rex', type: 'badboy' },
        ];
    }
    async isHealthy(key) {
        const badboys = this.dogs.filter(dog => dog.type === 'badboy');
        const isHealthy = badboys.length === 0;
        const result = this.getStatus(key, isHealthy, { badboys: badboys.length });
        if (isHealthy) {
            return result;
        }
        throw new terminus_1.HealthCheckError('Dogcheck failed', result);
    }
};
DogHealthIndicator = __decorate([
    (0, common_1.Injectable)()
], DogHealthIndicator);
exports.DogHealthIndicator = DogHealthIndicator;
//# sourceMappingURL=dog.health.js.map