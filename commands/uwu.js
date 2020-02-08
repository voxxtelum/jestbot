// owo
const owoify = require('owoify-js').default;

/*========================= TODO ========================*
***   Ignore emojis somehow

*/
// Getting some !bogs technology
const isEmoji = (arr, i) => {
  const regex = /[0-z]*(<:|:)[0-z]+/;
  //const regex = /(<:)[A-z]+(:)[0-9]+(>)/;
  if (regex.test(arr[i])) {
    return true;
  } else {
    return false;
  }
};

exports.run = async (client, message, args) => {

  // Need to grab last 2 messages and .last() to get message to transform
  message.channel.fetchMessages({ limit: 2 })
    .then(messages => {
      if (messages.last().attachments.size > 0) {
        message.channel.send("I can't do that on picture ya dingus");
      }
      else {
        const lastMessage = messages.last().content.trim().split(/[ ,]+/),
          newMessage = [],
          regex = /[-0-z]*(<:|:)[-0-z]+/;

        lastMessage.forEach((word, index, array) => {
          console.log(word);
          if (regex.test(word)) {
            //console.log(word);
            newMessage.push(word);
          } else {
            newMessage.push(owoify(word, 'uwu'));
          }
        });

        message.channel.send(newMessage.join(' ').truncate(2000));

      }
    });

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["owo"],
};

exports.help = {
  name: "uwu",
  category: "Weeb shit",
  description: "UwU",
  usage: "uwu"
};