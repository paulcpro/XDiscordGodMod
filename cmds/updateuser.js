const Discord = require("discord.js");
const config = require("../db/config.json");
const mysql = require("mysql");

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

    if(message.content.startsWith(config.prefix + "updateuser"))
    {
        //Get every words contained after the commands
        let result = " ";
        for(arg of args)
        {
            if(arg != "undefined")
            {
                result += " " + arg;
            }
            
        }
        //Update information from the database
        db.query("UPDATE user SET message = '" + result + "' WHERE user = " + message.author.id)
    }

}

module.exports.config = {
    name: "updateuser"
}