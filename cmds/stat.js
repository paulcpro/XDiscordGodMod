const Discord = require("discord.js");
const config = require("../db/config.json");

module.exports.run = async(bot, message, args) => {
    if(message.author.bot)
    {
        return;
    }

    if(message.channel.type == "dm")
    {
        return;
    }
    
    //Get !stat command
    if(message.content == config.prefix + "stat")
    {
        message.channel.send("ID : *" + message.author.id + "* __" + message.author.username + "__ \nMerci de ne pas m'appeler pour rien.");    //Send the nickname of the author
    }

}


module.exports.config = {
    name: "stat"
}