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

    //Check the administrator permissions of the member
    if(message.member.hasPermission("ADMINISTRATOR"))
    {
        if(message.content.startsWith(config.prefix + "kick"))
        {
            let mention = message.mentions.members.first();    //Get the first member of the mention list

            //Check if the user exist
            if(mention == undefined)
            {
                message.reply("Membre non existant ou mal mentionné.");
            }

            else
            {
                //Check the availability to kick the member
                if(mention.kickable)
                {
                    mention.kick();
                    message.channel.send(mention.displayName + " a été kické.", {files: ["./img/vnr.gif"]});
                }

                else
                {
                    message.reply("Impossible de le kicker.");
                }

            }
                
        }

    }

}

//We set module.exports.config because in the index.js we retrieve the file by using command.config.name => here config is the same than here
//The name used will be "kick"
module.exports.config = {
    name: "kick"
}