const  unirest = require("unirest");
const config = require("./config.json")

var req = unirest("GET", config.request.URL);

req.headers(config.request.headers);

req.end(function (res) {
	if (res.error) throw new Error(res.error);
    var rep = JSON.parse(res.body)
    console.log(rep)
});