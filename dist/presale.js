'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var contractAddress = '0x00A9F7D093C46D95F0318e4A6fFc6Ed68F73044C';

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://pub-node26224.etherscan.io"));

var tokensSold = 0;
var weiRaised = 0;
var investorCount = 0;
var weiRefunded = 0;
var startTime = 0;
var endTime = 0;
var softCapReached = 0;
var hardCap = 0;
var crowdsaleFinished = 0;
var totalTokens = 0;

var router = _express2.default.Router();

router.get('/getSmartContractInfo', function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              res.send({
                result: {
                  tokensSold: tokensSold,
                  weiRaised: weiRaised,
                  investorCount: investorCount,
                  weiRefunded: weiRefunded,
                  hardCap: hardCap,
                  startTime: startTime,
                  totalTokens: totalTokens,
                  endTime: endTime,
                  softCapReached: softCapReached,
                  crowdsaleFinished: crowdsaleFinished,
                  contractAddress: contractAddress
                }
              });
            } catch (e) {
              res.send({ error: e.message });
            }

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

function updateEtherScan() {
  try {
    var contractABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "purchaseLimit", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "softCapReached", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "endTime", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "beneficiary", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "weiRaised", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "tokensSold", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "refund", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "weiRefunded", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "halt", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "startTime", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "collected", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "softCap", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "price", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "halted", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "unhalt", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "investorCount", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "crowdsaleFinished", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "hardCap", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "token", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "inputs": [{ "name": "_hardCapUSD", "type": "uint256" }, { "name": "_softCapUSD", "type": "uint256" }, { "name": "_token", "type": "address" }, { "name": "_beneficiary", "type": "address" }, { "name": "_totalTokens", "type": "uint256" }, { "name": "_priceETH", "type": "uint256" }, { "name": "_purchaseLimitUSD", "type": "uint256" }, { "name": "_startTime", "type": "uint256" }, { "name": "_duration", "type": "uint256" }], "payable": false, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "amountRaised", "type": "uint256" }], "name": "GoalReached", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "softCap", "type": "uint256" }], "name": "SoftCapReached", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "holder", "type": "address" }, { "indexed": false, "name": "tokenAmount", "type": "uint256" }, { "indexed": false, "name": "etherAmount", "type": "uint256" }], "name": "NewContribution", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "holder", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "Refunded", "type": "event" }];

    var myContract = web3.eth.contract(contractABI).at(contractAddress);

    tokensSold = myContract.tokensSold.call().toNumber() / Math.pow(10, 18);
    weiRaised = myContract.weiRaised.call().toNumber() / Math.pow(10, 18);
    investorCount = myContract.investorCount.call().toNumber();
    weiRefunded = myContract.weiRefunded.call().toNumber();
    hardCap = myContract.hardCap.call().toNumber() / Math.pow(10, 18);
    totalTokens = myContract.hardCap.call().toNumber() * myContract.price.call().toNumber() / Math.pow(10, 18);
    startTime = myContract.startTime.call().toNumber();
    endTime = myContract.endTime.call().toNumber();
    crowdsaleFinished = myContract.crowdsaleFinished();
    softCapReached = myContract.softCapReached();
  } catch (e) {
    console.error({ error: e.message });
  }
}

updateEtherScan();
setInterval(updateEtherScan, 10000);

exports.default = router;
//# sourceMappingURL=presale.js.map