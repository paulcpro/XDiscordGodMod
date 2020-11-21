const Discord = require("discord.js");
const config = require("../../db/config.json");
const mysql = require("mysql");

//Make the connection to the local db
const db = mysql.createConnection({
    host: "localhost",
    password: "",
    user: "root",
    database: "dictatrix"
});

module.exports.run = async(bot, message, args) => {
    if(message.author.bot)
    {
        return;
    }

    if(message.channel.type == "dm")
    {
        return;
    }

    if(message.content.startsWith(config.prefix + "userinfo"))
    {
        //Retrieve the informations from the user table
        db.query("SELECT * FROM user WHERE user = " + message.author.id, async(err, req) => {

        let UserEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512}))
        .addField("Nom de l\'utilisateur : ", message.author.username)
        .addField("Tag : ", message.author.discriminator)
        .addField("ID : ", message.author.id)
        .addField("Status : ", message.author.presence.status)
        .addField("Création du compte le : ", message.author.createdAt)
        .addField("Informations de la base de données", "===============")
        .addField("Saved ID : ", req[0].user)   //Get field information of the message author
        .addField("Saved username : ", req[0].username)
        .addField("Saved message : ", req[0].message)
        .setFooter("Informations sur vous")

        message.channel.send(UserEmbed);
        });

    }

}

module.exports.config = {
    name: "userinfo"
}