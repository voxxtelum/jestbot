const quotes = require('../lang/fieri.json');
const random = require('../addons/random.js');

exports.run = async (client, message, args) => {

  const guyQuote = random.element(quotes);

  var flavor = message.guild.emojis.find(emoji => emoji.name == 'flavor');

  let flavorEmoji = (flavor) ? `<:flavor:${flavor.id}>` : '';

  message.channel.send(`${flavorEmoji} ${guyQuote}`);


}


exports.conf = {
  // Enbable/disable command
  enabled: true,
  // set true if only usable in normal channels
  // false lets bot respond to DMs
  guildOnly: true,
  // bot also reacts to these commands
  aliases: ['guyfieri', 'fieri', 'guy'],
};

exports.help = {
  // name of command that triggers response
  name: "flavor",
  // bot category, might want to use this somehow later
  // with a !help command to tell people how to use it
  category: "Miscellaneous",
  // same as above; pretty explanatory
  description: "we're going to flavor town",
  // also same as above, just useful for !help command
  usage: "flavor"
};