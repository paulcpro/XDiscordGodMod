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

    //Define a time in millisecond to mute an user
    if(message.content.startsWith(config.prefix + "tempmute"))
    {
        let mention = message.mentions.members.first();

        if(mention == undefined)
        {
            message.reply("Utilisateur non existant ou mal écrit");
        }

        else
        {
            //Split the content of the message in an array
            args = message.content.split(" ");
            mention.roles.add("774962034244190229");

            //If we specific the time to mute in seconds, minutes, hours or days. Seconds by default (s, m, h, d)
            if(args[3] == "s")
            {
                message.channel.send("<@" + mention.id + "> a été bannit pour " + args[2] + " secondes !");
                //Function used to unmute the member until a specific time
                setTimeout(function() {
                    mention.roles.remove("774962034244190229");
                    message.channel.send("<@" + mention.id + "> peut revenir."); //Used to mention the member when we send a message
                }, args[2] * 1000);

            }

            if(args[3] == "m")
            {
                message.channel.send("<@" + mention.id + "> a été bannit pour " + args[2] + " minutes !");
                setTimeout(function() {
                    mention.roles.remove("774962034244190229");
                    message.channel.send("<@" + mention.id + "> peut revenir.");
                }, args[2] * 1000 * 60);

            }

            if(args[3] == "h")
            {
                message.channel.send("<@" + mention.id + "> a été bannit pour " + args[2] + " heures !");
                setTimeout(function() {
                    mention.roles.remove("774962034244190229");
                    message.channel.send("<@" + mention.id + "> peut revenir.");
                }, args[2] * 1000 * 60 * 60);

            }

            if(args[3] == "d")
            {
                message.channel.send("<@" + mention.id + "> a été bannit pour " + args[2] + " jours !");
                setTimeout(function() {
                    mention.roles.remove("774962034244190229");
                    message.channel.send("<@" + mention.id + "> peut revenir.");
                }, args[2] * 1000 * 60 * 60 * 24);

            }

            else
            {
                message.channel.send("<@" + mention.id + "> a été bannit pour " + args[2] + " secondes !");
                setTimeout(function() {
                    mention.roles.remove("774962034244190229");
                    message.channel.send("<@" + mention.id + "> peut revenir.");
                }, args[2] * 1000);

            }
            
        }

    }

}

module.exports.config = {
    name: "tempban"
}