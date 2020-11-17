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

const ReadFile = (pFilePath) => {
    //Used to retrieve every files from specific repository
    fs.readdir(pFilePath, (err, files) => {
        if(err)
        {
            console.log(err);
        }
    
        let jsfile = files.filter(f => f.split(".").pop() == "js"); //Filtred to get only .js files
        if(jsfile.length <= 0)
        {
            console.log("[HANDLER]: Aucune commande trouvée");
        }
    
        //Retrieve name and of .js files from specific folder
        jsfile.forEach((f, i) => {
            let props = require(pFilePath + f);
            console.log("[HANDLER]: " + f + " ok ! ");
            Client.commands.set(props.config.name, props);
        })
    
    
    })

}

//Read the content of a folder and the code contained by every files
ReadFile("./cmds/");

//Loading Events
// fs.readdir("./events/", (err, files) => {
//     if (err) return console.error(err);
//     files.forEach((file) => {
//       const event = require("./events/" + file);
//       let eventName = file.split(".")[0];
//       Client.on(eventName, event.bind(null, Client));
//       console.log("Loading Event: " + eventName)
//     });
// });

Client.on("ready", async() => {
    console.log(Client.user.username + ": Online");

    let statuses = [ "Un site", "Un stream", "DictatriX" ]; //Activity status

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)]; //Random number to change randomly the activity
        Client.user.setActivity(status, {type: "WATCHING"})    //Used to change the BOT Acitvity every 5 seconds
    }, 5000)
});

Client.on("message", async message => {
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
    let commandeFile = Client.commands.get(command.slice(prefix.length)); //Retrieve the typed commands without the prefix
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