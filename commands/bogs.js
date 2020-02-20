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

exports.run = async (client, message) => {
  // Fetch !command message and previous message
  message.channel
    .fetchMessages({ limit: 2 })

    .then(messages => {
      if (messages.last().attachments.size > 0) {
        message.channel.send("I can't do that on picture ya dingus");
      } else {
        // Sort out messge before command
        const lastMessage = messages
            .last()
            .content.trim()
            .split(/[ ,]+/),
          newMessage = [],
          transformChance = 0.4;

        lastMessage.forEach((word, index) => {
          // skip first word
          if (index === 0) {
            newMessage.push(word);
          } else if (client.checkEmojiArr(newMessage, index - 1)) {
            newMessage.push(word);
          } else if (word.length < 4) {
            newMessage.push(word);
          } else if (random.chance(transformChance)) {
            //transform word
            newMessage.push(random.element(emoji));
          } else {
            newMessage.push(word);
          }
        });

        message.channel.send(newMessage.join(' '));
      }
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['bbogs']
};

exports.help = {
  name: 'bogs',
  category: 'bogs',
  description: 'play with some bogs',
  usage: 'bogs'
};
