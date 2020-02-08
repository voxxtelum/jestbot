// owo
const owoify = require('owoify-js').default;

/*========================= TODO ========================*
***   Ignore emojis somehow

*/

const checkEmoji = (w) => {
  const regex = /[-0-z]*(<:|:)[-0-z]+/;
  if (regex.test(w)) {
    return true
  } else {
    return false
  }
};

exports.run = async (client, message, args) => {

  // Need to grab last 2 messages and .last() to get message to transform
  message.channel.fetchMessages({ limit: 2 })
    .then(messages => {
      if (messages.last().attachments.size > 0) {
        message.channel.send("I can't do that on picture ya dingus");
      }
      else if (args[0] == 'leaderboard') {
        const key = `${message.guild.id}-${message.author.id}`;
        client.uwuCount.ensure(key, {
          user: message.author.id,
          guild: message.guild.id,
          points: 0,
        });
        // Creata array out of the uwuCount enmap, sort by points desc,
        // and take only the top 10 ones
        const countArray = client.uwuCount.array().sort((a, b) => (a.points < b.points) ? 1 : -1).slice(0, 10);
        //console.log(countArray);

        const uwuBoard = ["･ﾟ★ヽ(*・ω・)ﾉuwu Leaderboard ★･ﾟ\n"];

        var p = 1;

        countArray.forEach((uwuser) => {

          // Returns and GuildMember object from discrod
          const userObj = message.guild.members.find(val => val.id === uwuser.user),
            // displayName property returns server set Nickname, otherwise
            // returns username if Nickname not set
            userNick = userObj.displayName.truncate(20);
          var spacing = 20 - userNick.length,
            spacer = "--";
          for (i = 0; i < spacing; i++) {
            spacer += "-";
          };
          uwuBoard.push(`${p}. ${userNick} ${spacer} ${uwuser.points} uwus!`);
          p++;

        });
        // Send the message as a code block
        message.channel.send("```" + uwuBoard.join('\n') + "```");
      }
      else if (args[0] == 'stats') {
        const key = `${message.guild.id}-${message.author.id}`;
        client.uwuCount.ensure(key, {
          user: message.author.id,
          guild: message.guild.id,
          points: 0,
        });

        const messageAuthor = `<@${message.author.id}>`;
        const uwuPoints = client.uwuCount.get(key, 'points');

        message.channel.send(`${messageAuthor} has used !uwu ${uwuPoints} times!`);

      }
      else if (!args.length) {
        const lastMessage = messages.last().content.trim().split(/[ ,]+/),
          newMessage = [];

        lastMessage.forEach((word, index, array) => {
          //if (client.checkEmojiArr(array[index])) {
          if (checkEmojiStr(word)) {
            newMessage.push(word);
          } else {
            newMessage.push(owoify(word, 'uwu'));
          }
        });

        const key = `${message.guild.id}-${message.author.id}`;
        client.uwuCount.ensure(key, {
          user: message.author.id,
          guild: message.guild.id,
          points: 1,

        });
        client.uwuCount.inc(key, "points");

        message.channel.send(newMessage.join(' ').truncate(2000));

      }
      else {
        console.log('something went wrong with uwu');
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