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

    if(message.content.startsWith(config.prefix + "serverinfo"))
    {
        let ServerEmbed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name)
        .setThumbnail(message.guild.iconURL({dynamic: true, size: 512}))
        .addField("Nom du serveur : ", message.guild.name)
        .addField("Propriétaire du serveur", message.guild.owner)
        .addField("Nombre de membres", message.guild.memberCount)
        .addField("Nom de rôle", message.guild.roles.cache.size)
        .setFooter("Informations du serveur")

        message.channel.send(ServerEmbed);
    }

}

module.exports.config = {
    name: "serverinfo"
}