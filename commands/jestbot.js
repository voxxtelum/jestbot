exports.run = async (client, message) => {

  let helpMessage = "```" +
    "                    __    __              __            ___     \n" +
    "  __               /\\ \\__/\\ \\            /\\ \\__       /'___`\\   \n" +
    " /\\_\\     __    ___\\ \\ ,_\\ \\ \\____    ___\\ \\ ,_\\     /\\_\\ /\\ \\  \n" +
    " \\/\\ \\  /'__`\\ /',__\\ \\ \\/\\ \\ '__`\\  / __`\\ \\ \\/     \\/_/// /__ \n" +
    "  \\ \\ \\/\\  __//\\__, `\\ \\ \\_\\ \\ \\L\\ \\/\\ \\L\\ \\ \\ \\_       // /_\\ \\ \n" +
    "  _\\ \\ \\ \\____\\/\\____/\\ \\__\\\\ \\_,__/\\ \\____/\\ \\__\\     /\\______/ \n" +
    " /\\ \\_\\ \\/____/\\/___/  \\/__/ \\/___/  \\/___/  \\/__/     \\/_____/ \n" +
    " \\ \\____/\n" +
    "  \\/___/                             Electric BOGaloo\n\n" +
    "To play with bogs, type !bogs. For a laff, type !laff\n" +
    "To disgust everyone around you, type !uwu.\n\n" +
    "***NEW IN JESTBOT2: ELECTRIC BOGALOO***\n" +
    "!shuffle well, shuffles up the last message.\n" +
    "!roll works just like you expect it to.```";

  message.channel.send(helpMessage);

  /* Keeping here as a basic embed template
  const newEmbed = {
    color: 0x0099ff,
    title: 'Jestbot Beta',
    author: {
      name: 'voxxtelum',
      url: 'https://github.com/voxxtelum'
    },
    description: 'laffing at bogs since 2020'

  }
  message.channel.send({ embed: newEmbed });

  */
};

exports.conf = {
  // Enable/disable command
  enabled: true,
  // set true if only usable in normal channels
  // false lets bot respond to DMs
  guildOnly: true,
  // bot also reacts to these commands
  aliases: [],
};

exports.help = {
  // name of command that triggers response
  name: "jestbeta",
  // bot category, might want to use this somehow later
  // with a !help command to tell people how to use it
  category: "Miscellaneous",
  // same as above; pretty explanatory
  description: "wat are bogs",
  // also same as above, just useful for !help command
  usage: "jestbot"
};