// Load up the discord.js library
const Discord = require("discord.js");
const client = new Discord.Client();

// Load config.json
const config = require("./config.json");

// Load manual emoji list
const emoji = require("./emoji.json");

client.on("ready", () => {
  console.log(`Bogs are laffing, bot is ready.`);
  client.user.setActivity('with bogs').catch(console.error);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity('with bogs');
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity('with bogs');
});


client.on("message", async message => {
  // Ignore bot messages
  if(message.author.bot) return;
  
  // Ignore if message doesnt start with prefix
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Grab all emoji list
  if (command === "listemojis") {
    const emojiList = message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' +e.name).join('\n');
    message.channel.send(emojiList);}

  // Jestbot command
  if(command === "jestbot") {
      let helpMessage = "To play with bogs, type !bogs";
      message.channel.send(helpMessage);
  }
  
  if(command === "laff") {
    message.channel.send({files: ["./img/laff.png"]});
    }
  
    // Jest Command
  // Basic template for commands
  // replace garbage with real word first
  if(command === "sdfasdfasdfasdgasdfasd") {
      message.channel.fetchMessages({ limit: 2 })
      .then(messages => {
          
      }).catch(err => {
          console.error(err)
      });
  }
  
  // bogs bogs bogs
  if(command === "bogs") {
    // fetch command message and previous message
    message.channel.fetchMessages({ limit: 2 })
    .then(messages => {
        // sort to select message before command
        const lastMessage = messages.last().content.trim().split(/[ ,]+/);
        const newMessage = []
        //const regex = /\b\w{5,10}\b/gm;

        lastMessage.forEach(word => {
            if (word.length >= 6 ) {
                const keys = Object.keys(emoji);
                const randKey = keys[Math.floor(Math.random()*keys.length)];
                const randEmoji = emoji[randKey];
                //console.log(randEmoji);
                newMessage.push(randEmoji);
            } else {
                newMessage.push(word);
            }
        });
        message.channel.send(newMessage.join(" "));
        //console.log(newMessage.join(" "));

    });
  }
  // Purge Command
  /*
  if(command === "purge") {
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
*/
});
client.login(config.token);