const Discord = require("discord.js");
const config = require("../db/config.json");

module.exports.run = async(member) => {
    if(member.bot)
    {
        return;
    }

    member.guild.channels.cache.find(lChannel => lChannel.id === "721707303174144003").send("Le membre : " + member.displayName + " nous a quitté ! :cry:\nNous sommes plus que : " + member.guild.memberCount + " membres");   //Display the member left with a little emoji
}

module.exports.config = {
    name: "guildMemberRemove"
}
