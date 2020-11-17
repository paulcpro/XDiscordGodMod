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

    //Check the permission of the author
    if(message.member.hasPermission("ADMINISTRATOR"))
    {
        //Check the commands "ban" to ban a member
        if(message.content.startsWith(config.prefix + "ban"))
        {
            let mention = message.mentions.members.first(); //Retrieve the first member in the mention list (list which display every members when we type the nickname)

            //Stop if we don't find the users that we're looking for
            if(mention == undefined)
            {
                message.reply("Je n'arrive pas à trouver cet utilisateur");
            }
            
            else
            {
                if(mention.bannable)
                {
                    mention.ban();
                    message.channel.send(mention.displayName + " a été bannit du serveur.", {files: ["./img/vnr.gif"]});
                }
                
                else
                {
                    message.reply("Impossible de bannir ce membre.");
                }

            }

        }

    }

}

module.exports.config = {
    name: "ban"
}