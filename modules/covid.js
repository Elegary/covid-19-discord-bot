var unirest = require("unirest");
const {MessageEmbed} = require("discord.js")
const config = require("../config.json")
const prefix = config.prefix
const countries = require("./countries.json")


function covid(message){
    var args = message.content.split(" ")

    if(args[1] != undefined){
        
        var pays = args[1].toLowerCase();

        if(countries[pays] != undefined){
          var req = unirest("GET", config.request.URL);
          req.headers(config.request.headers);

          req.end(function (res) {
            if (res.error) throw new Error(res.error);

            var response = JSON.parse(res.body)  

            let cases = response.countries_stat[countries[pays].id].cases.replace(",", "")
            let deaths = response.countries_stat[countries[pays].id].deaths.replace(",", "")
            fullname = countries[pays].fullname != undefined ? countries[pays].fullname : pays[0].toUpperCase() + pays.slice(1)
          
            let embed = new MessageEmbed()
            .setTitle('Il y a ' + cases + ' cas de COVID-19 en ' + fullname + '.')
            .setDescription('Total des cas reportés : ' + cases + '\n Total de morts : ' + deaths)
            .setColor(0xff0000)
            .setImage("https://www.countryflags.io/" + countries[pays].code + "/flat/64.png");
            
            message.channel.send(embed);
          
          });   
        } 

        else {
          message.channel.send("Pas de données pour ce pays.")
        }
      
    }

    else {
        message.channel.send(`Veuillez entrer un pays. \nUsage : ${prefix}covid <pays>`)
    }
  
  }

module.exports = covid