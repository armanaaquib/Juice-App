const sqlite3 = require('sqlite3').verbose();
const JuiceApp = require('./src/juiceApp');

const db = new sqlite3.Database('./db/juices.db');

const main = () => {
  const juiceApp = JuiceApp.load(db);
  juiceApp
    .save({ empId: 25275, beverage: 'papaya', qty: 2 })
    .then(console.table);
};

main();
