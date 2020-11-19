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
    if(message.content.startsWith(config.prefix + "tempban"))
    {
        let mention = message.mentions.members.first();

        if(mention == undefined)
        {
            message.reply("Utilisateur non existant ou mal écrit");
        }

        else
        {
            mention.ban();

            //If we specific the time to mute in seconds, minutes, hours or days. Seconds by default (s, m, h, d)
            if(args[2] == "s")
            {
                message.channel.send("<@" + mention.id + "> a été bannit pour " + args[1] + " secondes !");
                //Function used to unmute the member until a specific time
                setTimeout(function() {
                    message.guild.members.unban(mention.id).then(member => {
                        message.channel.send("<@" + member.id + "> peut revenir");
                    }).catch(console.error);
                }, args[1] * 1000);

            }

            if(args[2] == "m")
            {
                message.channel.send("<@" + mention.id + "> a été bannit pour " + args[1] + " minutes !");
                setTimeout(function() {
                    message.guild.members.unban(mention.id).then(member => {
                        message.channel.send("<@" + member.id + "> peut revenir");
                    }).catch(console.error);
                }, args[1] * 1000 * 60);

            }

            if(args[2] == "h")
            {
                message.channel.send("<@" + mention.id + "> a été bannit pour " + args[1] + " heures !");
                setTimeout(function() {
                    message.guild.members.unban(mention.id).then(member => {
                        message.channel.send("<@" + member.id + "> peut revenir");
                    }).catch(console.error);
                }, args[1] * 1000 * 60 * 60);

            }

            if(args[2] == "d")
            {
                message.channel.send("<@" + mention.id + "> a été bannit pour " + args[1] + " jours !");
                setTimeout(function() {
                    message.guild.members.unban(mention.id).then(member => {
                        message.channel.send("<@" + member.id + "> peut revenir");
                    }).catch(console.error);
                }, args[1] * 1000 * 60 * 60 * 24);

            }

            else
            {
                message.channel.send("<@" + mention.id + "> a été bannit pour " + args[1] + " secondes !");
                setTimeout(function() {
                    message.guild.members.unban(mention.id).then(member => {
                        message.channel.send("<@" + member.id + "> peut revenir");
                    }).catch(console.error);
                }, args[1] * 1000);

            }
            
        }

    }

}

module.exports.config = {
    name: "tempban"
}