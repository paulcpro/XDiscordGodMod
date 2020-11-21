const Discord = require("discord.js");
const config = require("../../db/config.json");

module.exports.run = async(pClient, pMessage, pArgs) => {
    if(pMessage.author.bot)
    {
        return;
    }

    if(pMessage.channel.type == "dm")
    {
        return;
    }

    if(message.member.hasPermission("ADMINISTRATOR"))
    {
        //Define a time in millisecond to mute an user
        if(pMessage.content.startsWith(config.prefix + "tempmute"))
        {
            let lMention = pMessage.mentions.members.first();

            if(lMention == undefined)
            {
                pMessage.reply("Utilisateur non existant ou mal écrit");
            }

            else
            {
                lMention.roles.add("774962034244190229");

                //We specific the time to mute in seconds, minutes, hours or days. Seconds by default (s, m, h, d)
                if(pArgs[2] == "s")
                {
                    SetTemporaryMute(pMessage, lMention, pArgs, 1000, "s");
                }

                else if(pArgs[2] == "m")
                {
                    SetTemporaryMute(pMessage, lMention, pArgs, 1000*60, "m");
                }

                else if(pArgs[2] == "h")
                {
                    SetTemporaryMute(pMessage, lMention, pArgs, 1000*60*60, "h");
                }

                else if(pArgs[2] == "d")
                {
                    SetTemporaryMute(pMessage, lMention, pArgs, 1000*60*60*24, "d");
                }

                else
                {
                    SetTemporaryMute(pMessage, lMention, pArgs, 1000, "s");
                }
                
            }

        }

    }

}

//Used to unmute an user until a precise time
let SetTemporaryMute = (pMessage, pMention, pArgs, pTime, pTimeUnit) => {
    if(pArgs[2] == pTimeUnit)
    {
        pMessage.channel.send("<@" + pMention.id + "> a été muté pour " + pArgs[1] + " " + pTimeUnit);
        setTimeout(function() {
            pMention.roles.remove("774962034244190229");
            pMessage.channel.send("<@" + pMention.id + "> peut reparler.");
        }, pArgs[1] * pTime);

    }

}

module.exports.config = {
    name: "tempmute"
}