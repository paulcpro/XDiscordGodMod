const Discord = require("discord.js");
const config = require("../db/config.json");
const Client = new Discord.Client();

module.exports.run = async(member) => {
    console.log("bot ready");

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

module.exports.config = {
    name: "ready"
}