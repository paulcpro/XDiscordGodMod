const Discord = require("discord.js");
const config = require("../db/config.json");
const Client = new Discord.Client();

module.exports.run = async(pClient) => {
    console.log(Client.user.username + ": Online");

    let statuses = [ "Un site", "Un stream", "DictatriX" ]; //Activity status

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)]; //Random number to change randomly the activity
        Client.user.setActivity(status, {type: "WATCHING"})    //Used to change the BOT Acitvity every 5 seconds
    }, 5000)

    let commandFile = Client.commands.get(command.slice(config.prefix.length)); //Récupère une partie d'un tableau et une copie
    if(commandFile) {
        commandFile.run(Client, message, args);
    }

    //Rajouter au cache du serveur les anciens messages pour les stocker dans la mémoire
    Client.guilds.cache.find(guild => guild.id === "721707302658506763").channels.cache.find(channel => channel.id === "721707303174144003").messages.fetch("774677863500349440").then(lMessage => {
        console.log("message ajouté à la mémoire : " + lMessage.content);
    }).catch(lError => {
        console.log("Impossible d'ajouter le message en mémoire : " + lError);
    });

}

//The command will be config.name
module.exports.config = {   //Config here
    name: "ready"   //Name here; so we will call them from the index.js command.config.name and its will run it
}