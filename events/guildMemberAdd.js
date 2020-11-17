const Discord = require("discord.js");
const config = require("../db/config.json");

module.exports.run = async(member) => {
    // lMember.guild.name //Discord name
    // lMember.guild.id //Tag member
    member.guild.channels.cache.find(lChannel => lChannel.id === "721707303174144003").send("Bienvenue à toi " + member.displayName + " !\nNous sommes : " + member.guild.memberCount + " membres");  //guild => reference the server and channels.cache every channels of the discord server
    member.roles.add("774688329916219392").then(lError => {
        console.log("Rôle attribué avec succès pour " + lError.displayName);
    }).catch(() => {
        console.log("le rôle n'a pas pu être attribué");
    });    //Assign a role directly to the new users
}

module.exports.config = {
    name: "guildMemberAdd"
}