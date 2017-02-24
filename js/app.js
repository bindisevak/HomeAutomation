var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.post("/data", function(req, res) {

	var obj = req.body;
	var array = obj.data;
	//console.log(array);

	fs.writeFile(__dirname + "/data.json", array, 'utf8', function(err) {
		if (err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	});
});

app.listen(3000, function() {
	console.log("Started on PORT 3000");
})