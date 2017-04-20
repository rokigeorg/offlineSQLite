  // get the DB-File from the localStorage and reconstructe the SQLite DB
  function toBinArray(str) {
    var l = str.length,
      arr = new Uint8Array(l);
    for (var i = 0; i < l; i++) arr[i] = str.charCodeAt(i);
    return arr;
  }
  var db = new SQL.Database(toBinArray(localStorage.getItem("mydata")));


  var stmt = db.prepare("SELECT * FROM artists";

      while (stmt.step()) { //
        var row = stmt.getAsObject();
        // [...] do something with the row of result
        console.log(row.Books);
        createEle(row.Books);
      }

      function createEle(someText) {
        var box = document.getElementById('cd');
        console.log(document.body);
        document.body.innerHTML += " ";
        document.body.innerHTML += someText;
      }
