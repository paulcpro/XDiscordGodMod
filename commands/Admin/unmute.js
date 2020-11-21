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
        if(message.content.startsWith(prefix + "unmute"))
        {
            let mention = message.mentions.members.first();

            if(mention == undefined)
            {
                message.reply("Utilisateur non existant ou mal écrit.");
            }

            else
            {
                mention.roles.remove("774962034244190229"); //Remove the roles assigned used to mute a member
                message.channel.send("Tu peux maintenant parler " + mention.displayName);
            }

        }

    }

}

module.exports.config = {
    name: "unmute"
}