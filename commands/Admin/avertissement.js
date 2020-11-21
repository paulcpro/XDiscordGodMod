const Discord = require("discord.js");
const config = require("../../db/config.json");
const mysql = require("mysql");

//Connection to the database
const db = mysql.createConnection({
    host: "localhost",
    password: "",
    user: "root",
    database: "dictatrix"
});

module.exports.run = async(bot, message, args, pMemberWarnings) => {
    if(message.author.bot)
    {
        return;
    }

    if(message.channel.type == "dm")
    {
        return;
    }

    //Check la commande rentrée
    if(message.content.startsWith(config.prefix + "avert"))
    {
        //Check permission to write this
        if(message.member.hasPermission("ADMINISTRATOR"))
        {
            let lMention = message.mentions.members.first();

            //Get datas
            db.query("SELECT * FROM user WHERE user = " + lMention.id, async(err, req) => {
                if(err)
                {
                    throw err;
                }
        
                //Check if the user has been set
                if(args[0] != undefined)
                {
                    let lNumberWarning = req[0].avertissement + 1;
                    //Add a warnings to an user
                    db.query("UPDATE user SET avertissement = '" + lNumberWarning + "' WHERE user = " + lMention.id)

                    //If the user has 3 or more than 3 warnings he get banned
                    if(lNumberWarning >= 3)
                    {
                        lMention.ban();
                        message.channel.send(lMention.displayName + " a été bannit du serveur.", {files: ["./img/vnr.gif"]} );
                    }

                    else
                    {
                        message.channel.send("Tu possèdes maintenant " + lNumberWarning + " avertissements !");
                    }

                }
                
                else if(pMemberWarnings != undefined)
                {
                    let lNumberWarning = req[0].avertissement + 1;
                    //Add a warnings to an user
                    db.query("UPDATE user SET avertissement = '" + lNumberWarning + "' WHERE user = " + pMemberWarnings.id)

                    //If the user has 3 or more than 3 warnings he get banned
                    if(lNumberWarning >= 3)
                    {
                        pMemberWarnings.ban();
                        message.channel.send(pMemberWarnings.displayName + " a été bannit du serveur.", {files: ["./img/vnr.gif"]} );
                    }

                    else
                    {
                        message.channel.send("Tu possèdes maintenant " + lNumberWarning + " avertissements !");
                    }
                }
                
                else if(args[0] == undefined)
                {
                    message.channel.send("Membre non existant ou mal écrit.");
                }

            });

        }
        
    }

}

module.exports.config = {
    name: "avert"
}