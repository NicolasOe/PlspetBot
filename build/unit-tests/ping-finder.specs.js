"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ping_finder_1 = require("../services/ping-finder");
const chai_1 = require("chai");
describe('PingFinder', () => {
    let service;
    beforeEach(() => {
        service = new ping_finder_1.PingFinder();
    });
    it('should find "ping" in the string', () => {
        chai_1.expect(service.isPing("ping")).to.be.true;
    });
});
//# sourceMappingURL=ping-finder.specs.js.map