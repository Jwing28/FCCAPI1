var express = require('express');
var app = express();
var moment = require('moment');
var port = process.env.PORT || 8080;
var path = require('path');
//takes care of "/" path
app.use(express.static(path.resolve(__dirname, 'myClient')));
//any other file path
app.get("/:query",function(req,res){
  var date;
  //look path with 8 or more
  if(/^\d{8,}$/.test(req.params.query)) {
    date = moment(req.params.query, "X");
  } else {
    date = moment(req.params.query, "MMMM D, YYYY");
  }

  if(date.isValid()) {
    res.json({
      unix: JSON.parse(date.format("X")),
      natural: date.format("MMMM D, YYYY")
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }
});

app.listen(port,function(){
  console.log('listening on port: ', port);
});