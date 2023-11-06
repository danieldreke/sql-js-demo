
// 1. Install sql.js: npm install sql.js
// 2. Download sql-wasm.js: https://sql.js.org/dist/sql-wasm.js
// 3. Run this file in terminal: node test-sql.js

// Initialize sql.js: https://blog.logrocket.com/detailed-look-basic-sqljs-features/#Installation-browser-node.js
var initSqlJs = require("./sql-wasm.js");
initSqlJs().then(function (SQL) {
  console.log("sql.js initialized 🎉");
});

// Create SQL database: https://sql.js.org/#/?id=example-html-file
initSqlJs().then(function (SQL) {
  const db = new SQL.Database();
  db.run("CREATE TABLE test (col1, col2);");
  // Insert two rows: (1,A) and (2,B)
  db.run("INSERT INTO test VALUES (?,?), (?,?)", [1,'A',2,'B']);
  const stmt = db.prepare("SELECT * FROM test WHERE col1 BETWEEN $start AND $end");
  stmt.getAsObject({$start:1, $end:1}); // {col1:1, col2:111}
  stmt.bind({$start:1, $end:2});
  while(stmt.step()) {
    const row = stmt.getAsObject();
    console.log('Here is a row: ' + JSON.stringify(row));
  }
});
