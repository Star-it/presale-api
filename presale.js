import express from "express";

let contractAddress = '0x00A9F7D093C46D95F0318e4A6fFc6Ed68F73044C'

let Web3 = require('web3')
let web3 = new Web3(new Web3.providers.HttpProvider("https://pub-node26224.etherscan.io"));

let tokensSold = 0
let weiRaised = 0
let investorCount = 0
let weiRefunded = 0
let startTime = 0
let endTime = 0
let softCapReached = 0
let hardCap = 0
let crowdsaleFinished = 0
let totalTokens = 0

const router = express.Router()

router.get('/getSmartContractInfo', async function (req, res) {
  try {
    res.send({
      result: {
        tokensSold: tokensSold,
        weiRaised:weiRaised,
        investorCount:investorCount,
        weiRefunded:weiRefunded,
        hardCap: hardCap,
        startTime:startTime,
        totalTokens: totalTokens,
        endTime:endTime,
        softCapReached: softCapReached,
        crowdsaleFinished: crowdsaleFinished,
        contractAddress: contractAddress
      }
    })
  } catch (e) {
    res.send({error: e.message})
  }
})

function updateEtherScan() {
  try {
    let contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"purchaseLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"softCapReached","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"beneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"weiRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokensSold","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"refund","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"weiRefunded","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"halt","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"collected","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"softCap","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unhalt","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"investorCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"crowdsaleFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"hardCap","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_hardCapUSD","type":"uint256"},{"name":"_softCapUSD","type":"uint256"},{"name":"_token","type":"address"},{"name":"_beneficiary","type":"address"},{"name":"_totalTokens","type":"uint256"},{"name":"_priceETH","type":"uint256"},{"name":"_purchaseLimitUSD","type":"uint256"},{"name":"_startTime","type":"uint256"},{"name":"_duration","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amountRaised","type":"uint256"}],"name":"GoalReached","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"softCap","type":"uint256"}],"name":"SoftCapReached","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"holder","type":"address"},{"indexed":false,"name":"tokenAmount","type":"uint256"},{"indexed":false,"name":"etherAmount","type":"uint256"}],"name":"NewContribution","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"holder","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Refunded","type":"event"}]

    let myContract = web3.eth.contract(contractABI).at(contractAddress)

    tokensSold = myContract.tokensSold.call().toNumber() / Math.pow(10,18)
    weiRaised = myContract.weiRaised.call().toNumber() / Math.pow(10,18)
    investorCount = myContract.investorCount.call().toNumber()
    weiRefunded = myContract.weiRefunded.call().toNumber()
    hardCap = myContract.hardCap.call().toNumber() / Math.pow(10,18)
    totalTokens = (myContract.hardCap.call().toNumber() * myContract.price.call().toNumber())  / Math.pow(10,18)
    startTime = myContract.startTime.call().toNumber()
    endTime = myContract.endTime.call().toNumber()
    crowdsaleFinished  = myContract.crowdsaleFinished()
    softCapReached = myContract.softCapReached()
  } catch (e) {
    console.error({error: e.message})
  }
}

updateEtherScan()
setInterval(updateEtherScan, 10000)

export default router