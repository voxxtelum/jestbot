exports.run = async (client, message) => {
  let helpMessage = `                    __    __              __            ___      \r\n __                \/\\ \\__\/\\ \\            \/\\ \\__       \/\'___\`\\    \r\n\/\\_\\     __    ____\\ \\ ,_\\ \\ \\____    ___\\ \\ ,_\\     \/\\_\\ \/\\ \\   \r\n\\\/\\ \\  \/\'__\`\\ \/\',__\\\\ \\ \\\/\\ \\ \'__\`\\  \/ __\`\\ \\ \\\/     \\\/_\/\/\/ \/__  \r\n \\ \\ \\\/\\  __\/\/\\__, \`\\\\ \\ \\_\\ \\ \\L\\ \\\/\\ \\L\\ \\ \\ \\_       \/\/ \/_\\ \\ \r\n _\\ \\ \\ \\____\\\/\\____\/ \\ \\__\\\\ \\_,__\/\\ \\____\/\\ \\__\\     \/\\______\/ \r\n\/\\ \\_\\ \\\/____\/\\\/___\/   \\\/__\/ \\\/___\/  \\\/___\/  \\\/__\/     \\\/_____\/  \r\n\\ \\____\/                                                         \r\n \\\/___\/        \/)               ,       \/)             \/)        \r\n           _  \/\/  _  _ _\/_ __     _    (\/_ ____   _   \/\/ ______  \r\n         _(\/_(\/__(\/_(__(__\/ (__(_(__  \/_) (_)(_\/_(_(_(\/_(_)(_)   \r\n                                            .-\/                  \r\n                                           (_\/                   `;
  helpMessage += `\nTo play with bogs, type !bogs.\nFor a laff, type !laff.\nTo disgust everyone around you, type !uwu.\n\n★NEW IN JESTBOT2: ELECTRIC BOGALOO★\n`;
  helpMessage += `Find the biggest losers with "!uwu leaderboard"\n`;
  helpMessage += `To find out how big of a loser you are, try "!uwu stats"\n`;
  helpMessage += `!shuffle well, shuffles up the last message.\n!roll works just like you expect it to.`;
  message.channel.send(helpMessage, { code: true });

  /* 
  ? Keeping here as a basic embed template
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
  aliases: ['jestbeta']
};

exports.help = {
  // name of command that triggers response
  name: 'jestbot',
  // bot category, might want to use this somehow later
  // with a !help command to tell people how to use it
  category: 'Miscellaneous',
  // same as above; pretty explanatory
  description: 'wat are bogs',
  // also same as above, just useful for !help command
  usage: 'jestbot'
};
