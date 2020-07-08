class JuiceApp {
  constructor(db) {
    this.db = db;
  }

  save(tranDetail) {
    const { empId, beverage, qty } = tranDetail;

    const insertTranSql = `INSERT INTO juices(
      empId, beverage, qty, date
    )
    values(?, ?, ?, DATE("now"))`;

    return new Promise((res, rej) => {
      this.db.run(insertTranSql, [empId, beverage, qty], (err) => {
        if (err) throw err;
        this.query({ empId }).then((rows) => {
          res(rows);
        });
      });
    });
  }

  query(wheres) {
    const entities = Object.keys(wheres);
    let whereCause = `${entities[0]}="${wheres[entities[0]]}"`;
    whereCause = entities
      .slice(1)
      .reduce(
        (whereCause, entity) => (whereCause += `${entity}="${wheres[entity]}"`),
        whereCause
      );

    const query = `SELECT empId, beverage, qty, date
      FROM juices WHERE ${whereCause}`;

    return new Promise((res, rej) => {
      this.db.all(query, [], (err, rows) => {
        if (err) throw err;
        res(rows);
      });
    });
  }

  static load(db) {
    const schema = `CREATE TABLE IF NOT EXISTS juices(
      empId varchar(5),
      beverage varchar(20),
      qty NUMERIC(2),
      date DATE
    )`;

    db.run(schema);
    return new JuiceApp(db);
  }
}

module.exports = JuiceApp;
