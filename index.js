const Discord = require("discord.js");
const config = require("./db/config.json");
const fs = require("fs");

let sql; //Used to make our requests
const mysql = require("mysql");
const db = new mysql.createConnection({
    host: "localhost",
    password: "",
    user: "root",
    database: "dictatrix"
});

//Used for discord v12, need to tips Intents from discord dashboard of your application
const Client = new Discord.Client({
    ws: {
        intents: Discord.Intents.ALL,
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'],
})

Client.commands = new Discord.Collection();

//Test the connection between the database and our script
db.connect(function (err) {
    if(err)
    {
        throw err;
    } 

    console.log("La connexion a été réussi");
});

//Loading Commands
const LoadCommands = (dir = "./commands/") => {
    //We put the dir as arguments to get the files pointed in a subfolder of commands. ex: ./commands/Misc/
    fs.readdirSync(dir).forEach(dirs => {
        const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js")); //Get the commands file ended by .js

        for(const command of commands)
        {
            const commandFileName = require(`${dir}/${dirs}/${command}`); //Récupère le nom de chaque fichier
            console.log("[COMMANDS HANDLER] " + command + " Loaded");
            //module.exports.config.name
            Client.commands.set(commandFileName.config.name, commandFileName); //We make a commands collection with the name of the command (config.name <= commandFileName)
        }

    });

}

//Loading Events
const LoadEvents = ("./events/", () => {
    fs.readdir( (err, dirs) => {
        if(err)
        {
            throw err;
        }

        const events = dirs.filter(files => files.endsWith(".js")); //make an array of every .js files

        if(jsfile.length <= 0)
        {
            console.log("[HANDLER]: Aucune commande trouvée");
        }

        for(const event of events)
        {
            const evt = require(`${dir}/${dirs}/${event}`); //require the actual file.js
            const eventName = event.split(".")[0];  //Retrieve each time the name of the file
            //firstArg: get the name of the event file ; secondArg: get parameter of the event
            Client.on(eventName, evt.bind(null, Client));   //In the bind, if the event don't have any parameter we set the bind null by default
            console.log(`Evenement chargé : ${eventName}`);
        }

    });

});

LoadCommands();
// LoadEvents();

Client.on("ready", async() => {
    console.log(Client.user.username + ": Online");

    let statuses = [ "Un site", "Un stream", "DictatriX" ]; //Activity status

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)]; //Random number to change randomly the activity
        Client.user.setActivity(status, {type: "WATCHING"})    //Used to change the BOT Acitvity every 5 seconds
    }, 5000)
});

Client.on("message", async message => {
    //Array of french FWord to check if the user say insult and get warnings for it
    // let lFWord = ["pute", "salope", "enculé", "connard"];

    //Check if the message come from the bot, if yes, the bot don't send a message to himself
    if(message.author.Client)
    {
        return;
    }

    //Block the bot from sending to the PM
    if(message.channel.type == "dm")
    {
        return;
    }

    // ========= Warnings Insult ===========
    // let lMessageContent = message.content.split(" ");
    // for(let lWord of lMessageContent)
    // {
    //     if(lFWord.includes(lWord))
    //     {
    //         let lCallWarnings = "avertissement";
    //         let lMemberWarnings = message.author.username;
    //         let lWarningsCall = Client.commands.get(lCallWarnings);
    //         if(lWarningsCall)
    //         {
    //             lWarningsCall.run(Client, message, args, lMemberWarnings);
    //         }

    //         message.channel.send("Merci de parler correctement, vous avez gagné un avertissement vers le ban !");
    //     }

    // }

    //Reading of the user table
    db.query("SELECT * FROM user WHERE user = " + message.author.id, async(err, req) => {
        if(err)
        {
            throw err; //Used to get an error in case of wrong SQL command
        }

        //Add the new user in the database
        if(req.length < 1)
        {
            message.channel.send("Nous allons vous enregistrer dans la base de données.");
            //Used to add a new member to the database with his id, username informations and his first message
            sql = " INSERT INTO user (user, username, message) VALUES ('" + message.author.id +"', '" + message.author.username + "', '" + message.content + "') ";
            db.query(sql, function(err) {
                if(err)
                {
                    throw err;
                }

                else
                {
                    console.log("Un membre a été ajouté à la base de données");
                    return;
                }

            });

        }

    });

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    //Retrieve the typed commands without the prefix
    let commandeFile = Client.commands.get(command.slice(prefix.length)); //Client.commands.get Retrieve every commandFileName from our collection with the name of the commands
    // let eventFile = Client.commands.get();
    if(commandeFile)
    {
        commandeFile.run(Client, message, args); //The command will be used to retrieve the right modules (example: name !clear => clear.js)
        // eventFile.run(member);
    }

})

//If the member leave the discord server, we will remove his informations
Client.on("guildMemberRemove", async member => {
    //Remove an user from the database by id
    db.query("DELETE FROM user WHERE user = " + member.id);
});

Client.login(config.token);