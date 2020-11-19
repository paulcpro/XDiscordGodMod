const Discord = require("discord.js");
const config = require("../db/config.json");

module.exports.run = async(pClient, pMessage, pArgs) => {
    if(pMessage.author.bot)
    {
        return;
    }

    if(pMessage.channel.type == "dm")
    {
        return;
    }

    //Define a time in millisecond to ban an user
    if(pMessage.content.startsWith(config.prefix + "tempban"))
    {
        let lMention = pMessage.mentions.members.first();

        if(lMention == undefined)
        {
            pMessage.reply("Utilisateur non existant ou mal écrit");
        }

        else
        {
            lMention.ban();

            if(pArgs[2] == "s")
            {
                SetTemporaryBan(pMessage, lMention, pArgs, 1000, "s");
            }
            
            else if(pArgs[2] == "m")
            {
                SetTemporaryBan(pMessage, lMention, pArgs, 1000 * 60, "m");
            }

            else if(pArgs[2] == "h")
            {
                SetTemporaryBan(pMessage, lMention, pArgs, 1000 * 60 * 60, "h");

            }

            else if(pArgs[2] == "d")
            {
                SetTemporaryBan(pMessage, lMention, pArgs, 1000 * 60 * 60 * 24, "d");
            }

            else
            {
                SetTemporaryBan(pMessage, lMention, pArgs, 1000, "s");
            }
            
        }

    }

}

let SetTemporaryBan = (pMessage, pMention, pArgs, pTime, pTimeUnit) => {
    if(pArgs[2] == pTimeUnit)
    {
        pMessage.channel.send("<@" + pMention.id + "> a été bannit pour " + pArgs[1] + " " + pTimeUnit);
        //Function used to unban the member until a specific time
        setTimeout(function() {
            pMessage.guild.members.unban(pMention.id).then(pMember => {
                pMessage.channel.send("<@" + pMember.id + "> peut revenir");
            }).catch(console.error);
        }, pArgs[1] * pTime);

    }

}

module.exports.config = {
    name: "tempban"
}