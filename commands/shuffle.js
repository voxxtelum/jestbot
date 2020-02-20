const random = require('../addons/random.js');

exports.run = async (client, message) => {
  // Need to grab last 2 messages and .last() to get message to transform
  message.channel.fetchMessages({ limit: 2 }).then(messages => {
    const lastMessage = messages
      .last()
      .content.trim()
      .split(/[ ,]+/);
    if (messages.last().attachments.size > 0) {
      message.channel.send("I can't do that on picture ya dingus");
    } else if (lastMessage.length === 1) {
      message.channel.send(
        'What did you think would happen there, smooth brain?'
      );
    } else {
      var newMessage = random.shuffle(lastMessage).join(' ');
      message.channel.send(newMessage);
    }
  });
};

exports.conf = {
  // Enbable/disable command
  enabled: true,
  // set true if only usable in normal channels
  // false lets bot respond to DMs
  guildOnly: true,
  // bot also reacts to these commands
  aliases: []
};

exports.help = {
  // name of command that triggers response
  name: 'shuffle',
  // bot category, might want to use this somehow later
  // with a !help command to tell people how to use it
  category: 'Miscellaneous',
  // same as above; pretty explanatory
  description: 'Shuffles message',
  // also same as above, just useful for !help command
  usage: 'shuffle'
};
