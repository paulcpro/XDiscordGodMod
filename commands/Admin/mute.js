const Discord = require("discord.js");
const config = require("../../db/config.json");

module.exports.run = async(bot, message, args) => {
    if(message.author.bot)
    {
        return;
    }

    if(message.channel.type == "dm")
    {
        return;
    }

    if(message.member.hasPermission("ADMINISTRATOR"))
    {
        //Get the mute command
        if(message.content.startsWith(config.prefix + "mute"))
        {
            let mention = message.mentions.members.first();

            if(mention == undefined)
            {
                message.reply("Je n'arrive pas à trouver ce membre");
            }

            else
            {
                mention.roles.add("774962034244190229");    //We set a role without the permissions to read channels
                message.channel.send("Le membre : " + mention.displayName + " a été muté indéfiniment.");
            }

        }

    }
    
}

module.exports.config = {
    name: "mute"
}