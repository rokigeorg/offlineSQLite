//load the database from the server
var xhr = new XMLHttpRequest();
xhr.open('GET', 'db_data/chinook.db', true);
xhr.responseType = 'arraybuffer';

xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response);
  var _db = new SQL.Database(uInt8Array);

  main(_db);
};
xhr.send();


//--- Helper ---
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

//main function where the magic happens
function main(db) {

  var contents = db.exec("SELECT * FROM artists");
  // contents is now [{columns:['col1','col2',...], values:[[first row], [second row], ...]}]
  console.log(contents);

  db.each("SELECT Name FROM artists WHERE Name == $sName ", {
      $sName: "AC/DC"
    },
    function(row) {
      console.log(row.name)
    }
  );

  // --- SAVE the DB into the localstorage ---
  if (typeof(Storage) !== "undefined") {
    // Code for saving the data into the localStorage
    console.log("export DB and save it in localStorage");
    localStorage.setItem("mydata", toBinString(db.export()));
  } else {
    // Sorry! No Web Storage support..
    console.log("The Browser does not support localstorage.");
  }


}
