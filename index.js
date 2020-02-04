// Load up the discord.js library
const Discord = require("discord.js");
const client = new Discord.Client();

// Load config.json
const config = require("/config.json");

// Load manual emoji list
const emoji = require("./config/emoji.json");

// owo
const owoify = require('owoify-js').default;

// Replace botID in cofig.json with bot's ID
const botID = config.botID;

// wordpos
const WordPOS = require('wordpos'),
      wordpos = new WordPOS();

client.on("ready", () => {
  console.log(`Bogs are laffing, bot is ready.`);
  client.user.setActivity('with bogs').catch(console.error);
});

client.on("message", async message => {
  // Ignore other bot messages
  if (message.author.bot) return;

  // Ignore self and continue ruining the lives of everyone around you
  if (message.author.id == botID) return;
  
  // Ignore if message doesnt start with prefix
  if (message.content.indexOf(config.prefix) !== 0) return;
  
  // Remove prefix from !command message and separate out command only
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Grab all emoji list
  if (command === "listemojis") {
    const emojiList = message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' +e.name).join('\n');
    message.channel.send(emojiList);
  }

  // Jestbot command
  if (command === "jestbot") {
    let helpMessage = "To play with bogs, type !bogs. For a laff, type !laff. To make everyone around you feel disgusted and resent your presence type !uwu.";
    message.channel.send(helpMessage);
  }
  
  // Reply with image
  if (command === "laff") {
    message.channel.send({files: ["./img/laff.png"]});
  }
  
  /*
  // Basic template for commands
  // replace garbage with real word first
  if(command === "sdfasdfasdfasdgasdfasd") {
    message.channel.fetchMessages({ limit: 2 })
    .then(messages => {
          
    }).catch(err => {
        console.error(err)
    });
  }
  */

  // owo
  if (command === "uwu") {
    message.channel.fetchMessages({ limit: 2 })
    .then(messages => {
      if (messages.last().attachments.size > 0 ) {
        message.channel.send("I can't do that on picture ya dingus");
      } 
      else {
        const lastMessage = messages.last().content.trim();
        const newMessage = owoify(lastMessage, 'uwu');
        message.channel.send(newMessage);
        //console.log(newMessage); 
      }
    }).catch(console.error);
  }

  // bogs bogs bogs
  if (command === "bogs") {
    // Fetch !command message and previous message
    message.channel.fetchMessages({ limit: 2 })
    .then(messages => {

        // Sort to select message before command
        const lastMessage = messages.last().content.trim().split(/[ ,]+/);
        // Don't do pictures
        if (messages.last().attachments.size > 0 ) {
          message.channel.send("I can't do that on picture ya dingus");
        }
        else {

        // Get number of words in message
        const messageLength = lastMessage.length;
        // Create empty new message for bot to send
        const newMessage = []
        
        // Chance to turn emoji
        const nounChance = .2,
              verbChance = .25,
              adjChance = .3;
        
        // Grab random emoji from emoji.json based on type
        const grabRandEmoji = (emojiType) => {
          const keys = Object.keys(emojiType),
                randKey = keys[Math.floor(Math.random()*keys.length)],
                randEmoji = emojiType[randKey];
          return randEmoji;
        };

        // Create place for indices of changed words to go
        const replacedWords = [];

        for (let word of lastMessage) {
          // Get index of word we're working on
          let wordIndex = lastMessage.indexOf(word);
          // Offset checkIndex checks if pervious word was changed to prevent consecutive emojis
          let checkIndex = wordIndex - 1;
          // Don't transform first word in message
          if (wordIndex == 0 ) {
            newMessage.push(word);
          }
          // Don't transform words shorter than 4 characters
          else if (word.length < 4 ) {
            newMessage.push(word);
          }
          // Check if previous word was transformed before continuing
          else if (!replacedWords.includes(checkIndex)) {
            if (wordpos.isNoun(word)) {
              if (Math.random() < nounChance ) {
                // Add index of transformed word to the replacedWords array
                replacedWords.push(wordIndex);
                newMessage.push(grabRandEmoji(emoji.noun));
              } else if (wordpos.isVerb(word)) {
                if (Math.random() < verbChance ) {
                  replacedWords.push(wordIndex);
                  newMessage.push(grabRandEmoji(emoji.verb));
                } else if (wordpos.isAdjective(word)) {
                  if (Math.random() < adjChance ) {
                    replacedWords.push(wordIndex);
                    newMessage.push(grabRandEmoji(emoji.adj));
                  } else {
                    newMessage.push(word);
                  }
                }
              }
            }
          }
          else {
            newMessage.push(word);
          }
        }

        // How many words were replaced?
        //const replacedLen = replacedWords.length;
        
        message.channel.send(newMessage.join(" ")).catch(console.error);
        //message.channel.send(newMessage.join(" ") + " | Total: " + messageLength + " | Replaced: " + replacedLen);

        //console.log(newMessage.join(" ") + " | Total: " + messageLength + " | Replaced: " + replacedLen);
      
      }

    });
  }
  /* Don't want fuckheads
  // Purge Command
  if (command === "purge") {
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  } */
});

client.login(config.token);