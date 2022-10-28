const sha256 = require("sha256");

("use strict");

module.exports = class Blockchain {
  constructor(proofOfWork, transactionsLimit) {
    this.chain = [
      {
        index: 0,
        transactionsHash: "",
        hash: this.getSeed(),
      },
    ];

    this.proofOfWork = proofOfWork;
    this.transactionsLimit = transactionsLimit;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  getSeed() {
    let seed = "";

    for (let i = 0; i < this.proofOfWork; i++) {
      seed + 0;
    }

    return sha256(seed + "default");
  }

  async blockHash(transactions) {
    const transactionsHash = await this.transactionsHash(transactions);
    const data =
      `${this.chain.length + 1}` +
      this.getLastBlock()["hash"] +
      transactionsHash;

    let nonce = 0;
    let hash = sha256(data + nonce);

    while (!this.isValidHash(hash)) {
      hash = sha256(data + nonce);
      nonce++;
    }

    return hash;
  }

  async transactionsHash(transactions) {
    const data = transactions
      .map((t) => t.id + t.sender + t.recipient + t.amount)
      .join();

    let nonce = 0;
    let hash = sha256(data + nonce);

    while (!this.isValidHash(hash)) {
      hash = sha256(data + nonce);
      nonce++;
    }

    return hash;
  }

  isValidHash(hash) {
    let count = 0;
    for (let i = 0; i < this.proofOfWork; i++) {
      if (hash[i] === "0") {
        count++;
      }
    }

    return count === this.proofOfWork;
  }
};

// make new file  json 

{
  "name": "first-bc-project",
  "version": "1.0.0",
  "description": "blockchain project lea",
  "scripts": {
    "start": "nodemon starter.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.27.2",
    "body-parse": "^0.1.0",
    "cron": "^2.1.0",
    "express": "^4.18.1",
    "sha256": "^0.2.0",
    "uuid": "^8.3.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.19"
  }
}

// make strater using js

const { exec } = require("child_process");

for (let i = 3001; i <= 3003; i++) {
  exec(`nodemon api.js ${i}`, console.log(`node on port ${i}`));
}

