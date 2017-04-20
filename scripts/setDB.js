//Create the database
var db = new SQL.Database();
// Run a query without reading the results
db.run("CREATE TABLE Library (Books, DVDs);");
// Insert two rows: (1,111) and (2,222)
db.run("INSERT INTO Library VALUES (?,?), (?,?)", ["Titel", "TheBook", 2, 222]);

// Prepare a statement
//var stmt = db.prepare("SELECT * FROM Library WHERE Books BETWEEN $start AND $end");
var stmt = db.prepare("SELECT * FROM Library");
/*
  stmt.getAsObject({
    $start: 1,
    $end: 1
  }); // {col1:1, col2:111}

  // Bind new values
  stmt.bind({
    $start: 1,
    $end: 2
  });
*/

while (stmt.step()) { //
  var row = stmt.getAsObject();
  // [...] do something with the row of result
  console.log(row);
}

// --- SAVE the DB into the localstorage ---
function toBinString(arr) {
  var uarr = new Uint8Array(arr);
  var strings = [],
    chunksize = 0xffff;
  // There is a maximum stack size. We cannot call String.fromCharCode with as many arguments as we want
  for (var i = 0; i * chunksize < uarr.length; i++) {
    strings.push(String.fromCharCode.apply(null, uarr.subarray(i * chunksize, (i + 1) * chunksize)));
  }
  return strings.join('');
}

//
if (typeof(Storage) !== "undefined") {
  // Code for saving the data into the localStorage
  localStorage.setItem("mydata", toBinString(db.export()));
} else {
  // Sorry! No Web Storage support..
  console.log("The Browser does not support localstorage.");
}
