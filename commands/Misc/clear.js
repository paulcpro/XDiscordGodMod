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

    //Check the permission to clear the messages
    if(message.member.permissions.has("MANAGE_MESSAGES"))
    {
        if(message.content.startsWith(config.prefix + "clear"))
        {
            args = message.content.split(" ");

            //Check if something has been typed after the commands
            if(args[1] == undefined)
            {
                message.reply("Nombre de messages non existant ou mal défini.");
            }

            else
            {
                let lNumberMessages = parseInt(args[1]);    //We parse in number

                //Check if the typed is a number
                if(isNaN(lNumberMessages))
                {
                    message.reply("Merci de saisir un nombre.");
                }

                else
                {
                    //Delete multiple message
                    message.channel.bulkDelete(lNumberMessages).then(messages => {  //Possibility to add "true" in second argument to delete the messages every two weeks
                        console.log("Suppression de " + messages.size + " messages.");
                    }).catch(lErreur => {
                        console.log("Erreur de suppression des messages : " + lErreur);
                    });

                }
                
            }

        }

    }

}

//The name is used to call this module(clear) from the index.js, if we tape !clear so this module will be called
module.exports.config = {
    name: "clear"
}