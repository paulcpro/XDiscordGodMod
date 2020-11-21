const { MessageEmbed, Message } = require("discord.js");
const { prefix } = require("../../db/config.json");

module.exports.run = async(bot, message, args) => {
    if(args[0] == prefix + "help")
    {
        return message.channel.send("Vous devez juste faire : " + help);
    }

    if(args[0])
    {
        let command = args[0];
        if(bot.commands.has(command))
        {
            command = bot.commands.get(command);
            let SHembed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Ring0", message.guild.iconURL({dynamic: true, size: 512}))
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 512}))
            .setDescription("Prefix : " + prefix)
            message.channel.send(SHembed)
        }

    }

    let cmdmember = " \"!help\" \"!serverinfo\" \"!userinfo\" ";
    let cmdadmin = " \"!kick\" \"!ban\" \"!mute\" \"!unmute\" \"!tempmute\"  \"!tempban\"  \"!avertissement\" ";
    if(!args[0])
    {
        message.delete();
        //Embed to display on the discord server
        let embed = new MessageEmbed()
        .setAuthor("Commandes d'aides", message.guild.iconURL({dynamic: true, size: 512}))
        .setColor("RANDOM")
        .setDescription("Voir tes MP")

        //Embed to display in PM to the user
        let Sembed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor("Ring0", message.guild.iconURL({dynamic: true, size: 512}))
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 512}))
        .setDescription("Voici toutes les commandes disponibles pour le bot " + bot.user.username)
        .addField("Commandes pour les membres :", cmdmember)
        .addField("Commandes pour les admins : ", cmdadmin)
        .setFooter("Made by Ring0", bot.user.displayAvatarURL({dynamic: true, size: 512}))
        message.channel.send(embed)
        .then(m => m.delete(5000))
        .catch(() => message.channel.send("Il est également possible de contacter les administrateurs."))   //Signal to contact admins in case of problems
        message.author.send(Sembed)
    }

}

module.exports.config = {
    name: "help"
}