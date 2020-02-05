"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SHA256 = require("crypto-js/sha256");
class Block {
    constructor(index, hash, prevHash, transactions, timestamp) {
        this.index = index;
        this.hash = hash;
        this.prevHash = prevHash;
        this.transactions = transactions;
        this.timestamp = timestamp;
    }
    static validateStructure(_block) {
        const { index, hash, transactions, timestamp } = _block;
        return (typeof index === 'number')
            && (typeof hash === 'string')
            && (typeof transactions === 'string')
            && (typeof timestamp === 'number');
    }
}
Block.calculateBlockHash = (index, prevHash, timestamp, transactions) => SHA256(index + prevHash + timestamp + transactions).toString();
const genesisBlock = new Block(0, "0x1231023012301203", "0x0", "wjfekwjf", 123123123);
const blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (transaction) => {
    const prevBlock = getLatestBlock();
    const newIndex = prevBlock.index + 1;
    const newTimestamp = getNewTimestamp();
    const newHash = Block.calculateBlockHash(newIndex, prevBlock.hash, newTimestamp, transaction);
    addBlock(new Block(newIndex, newHash, prevBlock.hash, transaction, newTimestamp));
    return new Block(newIndex, newHash, prevBlock.hash, transaction, newTimestamp);
};
const getHashFromBlock = (_block) => Block.calculateBlockHash(_block.index, _block.prevHash, _block.timestamp, _block.transactions);
const isBlockValidate = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.prevHash) {
        return false;
    }
    else if (getHashFromBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    return true;
};
const addBlock = (candidateBlock) => {
    if (isBlockValidate(candidateBlock, getLatestBlock())) {
        getBlockchain().push(candidateBlock);
        return candidateBlock;
    }
    else {
        return {};
    }
};
createNewBlock('a');
createNewBlock('b');
console.log(blockchain);
//# sourceMappingURL=index.js.map