/*
// eslint-disable-next-line no-warning-comments
todo Add emojis to file or enmap
*/
exports.run = async (client, message) => {
  const emojiList = message.guild.emojis
    .map((e, x) => '"' + e.name + '": ' + '"<:' + e.name + ':' + x + '>"')
    .join(',\n');
  message.channel.send(`{\n${emojiList} \n}`, { code: true });
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
  name: 'listemojis',
  // bot category, might want to use this somehow later
  // with a !help command to tell people how to use it
  category: 'Miscellaneous',
  // same as above; pretty explanatory
  description: 'Lists all emojis on server',
  // also same as above, just useful for !help command
  usage: 'listemojis'
};
