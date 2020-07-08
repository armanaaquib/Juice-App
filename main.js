const sqlite3 = require('sqlite3').verbose();
const vorpal = require('vorpal')();
const JuiceApp = require('./src/juiceApp');

const db = new sqlite3.Database('./db/juices.db');
const juiceApp = JuiceApp.load(db);

vorpal
  .command('save <empId> <beverage> <qty>')
  .description('save a transaction')
  .alias('s')
  .autocomplete(['orange', 'papaya'])
  .action((args, cb) => {
    const { empId, beverage, qty } = args;
    juiceApp.save({ empId, beverage, qty }).then((rows) => {
      console.table(rows);
      cb();
    });
  });

vorpal.delimiter('juiceApp $ ').show();
