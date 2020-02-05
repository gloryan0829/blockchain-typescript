const SHA256 = require("crypto-js/sha256");

class Block {
  public index: number;
  public hash: string;
  public prevHash: string;
  public transactions: string;
  public timestamp: number;

  static calculateBlockHash = (
    index: number,
    prevHash: string,
    timestamp: number,
    transactions: string
  ): string => SHA256(index + prevHash + timestamp + transactions).toString();

  constructor(
    index: number,
    hash: string,
    prevHash: string,
    transactions: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.prevHash = prevHash;
    this.transactions = transactions;
    this.timestamp = timestamp;
  }

  static validateStructure(_block: Block): boolean {
    const {
      index,
        hash,
        transactions,
        timestamp
    } = _block;
    return (typeof index === 'number')
        && (typeof hash === 'string')
        && (typeof transactions === 'string')
        && (typeof timestamp === 'number')
  }
}

const genesisBlock: Block = new Block(
  0,
  "0x1231023012301203",
  "0x0",
  "wjfekwjf",
  123123123
);

const blockchain: [Block] = [genesisBlock];

const getBlockchain = () : Block[] => blockchain;

const getLatestBlock = () : Block => blockchain[blockchain.length -1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (transaction: string):Block => {
  const prevBlock : Block = getLatestBlock();
  const newIndex: number = prevBlock.index + 1;
  const newTimestamp: number = getNewTimestamp();
  const newHash: string = Block.calculateBlockHash(newIndex, prevBlock.hash, newTimestamp, transaction);
  addBlock(new Block(newIndex, newHash, prevBlock.hash, transaction, newTimestamp));
  return new Block(newIndex, newHash, prevBlock.hash, transaction, newTimestamp);
};

const getHashFromBlock = (_block: Block): string =>
   Block.calculateBlockHash(_block.index, _block.prevHash, _block.timestamp, _block.transactions);

const isBlockValidate = (candidateBlock: Block, previousBlock: Block): boolean => {
  if(!Block.validateStructure(candidateBlock)) {
    return false;
  }
  else if(previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  }
  else if(previousBlock.hash !== candidateBlock.prevHash) {
    return false;
  }
  else if(getHashFromBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  }
  return true;
};

const addBlock = (candidateBlock: Block):object => {
  if(isBlockValidate(candidateBlock, getLatestBlock())) {
    getBlockchain().push(candidateBlock);
    return candidateBlock;
  } else {
    return {};
  }
};
createNewBlock('a');
createNewBlock('b');

console.log(blockchain);
export {};
