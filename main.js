const {Client, MessageEmbed} = require("discord.js")
const bot = new Client()

const covid = require('./modules/covid')
const config = require('./config.json');

const prefix = config.prefix
const token = config.token


bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
  });
  
bot.on('message', message => {
   if (message.content.startsWith(`${prefix}ping`)) {
       message.channel.send('Wesh. ' + message.author.toString());
   }

   if (message.content.startsWith(`${prefix}covid`)) {
    covid(message)
  }     

  if (message.content.startsWith(`${prefix}help`)) {
    const embed = new MessageEmbed()
      .setTitle('CoronaLLKBot - Aide')
      .setColor(0xff0000)
      .setDescription('Tu as besoin d\'aide ? Voici les commandes disponibles : \n *help : afficher cette aide \n*ping : Pinger le bot \n*covid <pays> : Affiche les cas de CoronaVirus par pays.');
    message.channel.send(embed);
  }   
});

bot.login(token)
