
const jwt = require('../src/jwtHandler');
const db = require('../src/mysqlHandler');
const redisHandler = require('../src/redisHandler');

let encoded;
before(() => {
  encoded = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsdyIsInBhc3N3b3JkIjoiMTIzNDUiLCJpYXQiOjE2MjMxNTU5NDd9.z-51LvZ8I0RZM61wdIHsTQKRnfcwvX8FsGquKRScyds';
});

describe('/auth', () => {
  let o;
  let token;

  it('#1. should decode using jwt', () => {
    this.o = jwt.verify(encoded).decoded;
    // console.log(`${o.id}, ${o.password}`);
  });

  it('#2. should exist user data', async () => {
    await db.validateCorp(this.o);
  });

  it('#2. should make a token', () => {
    this.token = jwt.createToken();
    // console.log(this.token);
  });

  it('#3. should set to token to redis', async () => {
    await redisHandler.set(`${this.o.id}_${this.token}`);
    // console.log(`${this.o.id}_${this.token}`);
  });

});
