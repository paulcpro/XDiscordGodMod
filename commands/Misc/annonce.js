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

    let channelGeneral = message.guild.channels.cache.get("721707303174144003");
    let channelMusic = message.guild.channels.cache.get("775059158889267230");

    if(message.author.bot)
    {
        return;
    }

    if(message.content.startsWith(config.prefix + "annonce"))
    {
        var embed = new Discord.MessageEmbed()
            .setColor("#0099ff") //Used to modify the color on the left of the embed
            .setTitle("**Annonce**")
            .setAuthor("Ring0", "https://imgur.com/wSTFkRM.png", "https://www.youtube.com/watch?v=TJ13BA3-NR4")
            .setDescription("This is a little announcement\n[Click Me](https://www.youtube.com/watch?v=7KfVoEO9Ttg)")
            .setURL("https://www.youtube.com/watch?v=jAXDxug-1B4")
            .setThumbnail("https://imgur.com/wSTFkRM.png")
            // .setImage("image link")
            .addField("Titre", "Contenu", false)    //the third arguments is used to set if we align the field with the next
            .addField("\u200B", "\u200B", false)    //Content used to add an empty space
            .addField("Musique", "Channel : <#" + channelMusic + ">", true)
            .addField("General", "Channel : <#" + channelGeneral + ">", true)
            .setFooter("Message rédigé par votre dominatrice", "https://imgur.com/wSTFkRM.png")
            .setTimestamp()

        message.channel.send(embed);
    }

}

module.exports.config = {
    name: "annonce"
}