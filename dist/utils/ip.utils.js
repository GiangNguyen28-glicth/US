"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputStartupInformation = void 0;
const chalk_1 = __importDefault(require("chalk"));
const boxen_1 = __importDefault(require("boxen"));
const ts_dedent_1 = __importDefault(require("ts-dedent"));
const cli_table3_1 = __importDefault(require("cli-table3"));
const ip_1 = __importDefault(require("ip"));
function outputStartupInformation(options) {
    const { name, port } = options;
    const serveMessage = new cli_table3_1.default({
        chars: {
            top: '',
            'top-mid': '',
            'top-left': '',
            'top-right': '',
            bottom: '',
            'bottom-mid': '',
            'bottom-left': '',
            'bottom-right': '',
            left: '',
            'left-mid': '',
            mid: '',
            'mid-mid': '',
            right: '',
            'right-mid': '',
            middle: '',
        },
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
    });
    const { address, networkAddress } = getServerAddresses(port);
    serveMessage.push(['Welcome to:', chalk_1.default.blue.bold(name)], ['Local:', chalk_1.default.cyan(address)], ['On your network:', chalk_1.default.cyan(networkAddress)]);
    console.log();
    console.log((0, boxen_1.default)((0, ts_dedent_1.default) `
          ${serveMessage.toString()}
        `, { borderStyle: 'round', padding: 1, borderColor: '#F1618C' }));
    console.log();
}
exports.outputStartupInformation = outputStartupInformation;
const getServerAddresses = (port) => {
    return {
        address: `http://localhost:${port}/graphql`,
        networkAddress: `http://${ip_1.default.address()}:${port}/graphql`,
    };
};
//# sourceMappingURL=ip.utils.js.map