
/*======================================================*

 /$$                                        /$$$$$$ 
| $$                                       /$$__  $$
| $$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$$  |__/  \ $$
| $$__  $$ /$$__  $$ /$$__  $$ /$$_____/    /$$$$$$/
| $$  \ $$| $$  \ $$| $$  \ $$|  $$$$$$    /$$____/ 
| $$  | $$| $$  | $$| $$  | $$ \____  $$  | $$      
| $$$$$$$/|  $$$$$$/|  $$$$$$$ /$$$$$$$/  | $$$$$$$$
|_______/  \______/  \____  $$|_______/   |________/
                     /$$  \ $$                    
                    |  $$$$$$/                    
                     \______/     electric bogaloo

*=======================================================*

*========================= TODO ========================*
*     Allow bogs to be tab-targeted

*/
// Random stuff
const random = require('../addons/random.js');

// Load manual emoji list
const emoji = require('../config/emoji.json');

// check if previous word was transformed
// with regex pattern matching emoji like <:bogs:672137714266537988>
const checkPreviousWord = (arr, i) => {
  const regex = /(<:)[A-z]+(:)[0-9]+(>)/;
  if (regex.test(arr[(i - 1)])) {
    return true;
  } else {
    return false;
  }
};

exports.run = async (client, message) => {

  // Fetch !command message and previous message
  message.channel.fetchMessages({ limit: 2 })

    .then(messages => {

      if (messages.last().attachments.size > 0) {
        message.channel.send("I can't do that on picture ya dingus");
      } else {
        // Sort out messge before command
        const lastMessage = messages.last().content.trim().split(/[ ,]+/),
          newMessage = [],
          transformChance = .4;

        lastMessage.forEach((word, index, array) => {

          // skip first word
          if (index === 0) {
            newMessage.push(word);
          } else if (checkPreviousWord(newMessage, index)) {
            newMessage.push(word);
          } else if (word.length < 4) {
            newMessage.push(word);
          } else if (random.chance(transformChance)) {
            //transform word
            //newEmoji = r.picker(emoji);
            newMessage.push(random.element(emoji));
          } else {
            newMessage.push(word);
          }
        });

        console.log(newMessage.join(' '));
        message.channel.send(newMessage.join(" "));

      }

    })
    .catch(console.error());

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
};

exports.help = {
  name: "bbogs",
  category: "bogs",
  description: "play with some bogs",
  usage: "bogs"
};