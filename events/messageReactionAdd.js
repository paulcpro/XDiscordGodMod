const Discord = require("discord.js");
const config = require("../db/config.json");

module.exports.run = async(reaction, member) => {
    //We gonna check the message that has been used to get a role and after the emoji
    if(reaction.message.id === "774689046717923328")
    {
        //Change "id" by a custom emoji name that you added to your discord server
        if(reaction.emoji.name === "ig")
        {
            var lSpecificMember = reaction.message.guild.members.cache.find(member => member.id === lUser.id); //Get the user who reacted to the message

            lSpecificMember.roles.add("774652972134301737").then(lMember => {
                console.log("Rôle attribué avec succès pour " + lMember.displayName);
            }).catch(lError => {
                console.log("le rôle n'a pas pu être attribué : " + lError);
            });    //Assign a specific role

        }

    }

    //This will delete every reactions from the user
    // lReaction.users.remove(lUser.id).then(react => {
    //     console.log("reaction" + react.emoji.name + " retiré par le bot");
    // }).catch(lError => {
    //     console.log("La reaction n'a pas pu être supprimé : " + lError);
    // });

    //Remove every reactions added
    // lReaction.remove().then(react => {
    //         console.log("reaction" + react.emoji.name + " retiré par le bot");
    // }).catch(lError => {
    //         console.log("La reaction n'a pas pu être supprimé : " + lError);
    // });
}

module.exports.config = {
    name: "messageReactionAdd"
}