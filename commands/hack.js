
const interval = require('interval-promise');

// What is the command listening for?
exports.run = async (client, message, args) => {

  const getUserName = (msg, argArr) => {
    if (msg.mentions.users.first()) {
      if (msg.mentions.users.first().id == client.user.id) {
        let hackTar = 'self';
        return hackTar;
      } else {
        let hackTar = msg.guild.members.find(val => val.id === msg.mentions.users.first().id).displayName;
        return hackTar;
      }
    } else {
      let hackTar = argArr.join(' ');
      return hackTar;
    }
  };

  let username = (args.length > 0)
    ? getUserName(message, args)
    : message.guild.members.find(val => val.id === message.author.id).displayName;

  if (username == 'self') {
    // message.channel.send(`You can't hack the hacker.`, { code: true });

    const userHack = message.guild.members.find(val => val.id === message.author.id).displayName;

    var hackBlock =
      `> You can't hack the hackerman, ${userHack}   \n[=                                              ]  4% `;
    const hackAppend = [
      `> You can't hack the hackerman, ${userHack}   \n[==                                             ] 11%`,
      `> You can't hack the hackerman, ${userHack}   \n[=======                                        ] 18%`,
      `> You can't hack the hackerman, ${userHack}   \n[==========                                     ] 24%\n> Initiating Defense Procotocol. `,
      `> You can't hack the hackerman, ${userHack}   \n[===============                                ] 33%\n> Initiating Defense Procotocol..`,
      `> You can't hack the hackerman, ${userHack}   \n[==================                             ] 42%\n> Initiating Defense Procotocol...`,
      `> You can't hack the hackerman, ${userHack}   \n[========================                       ] 48%\n> Initiating Defense Procotocol               READY ✓\n> Activating Drones.`,
      `> You can't hack the hackerman, ${userHack}   \n[===============================                ] 60%\n> Initiating Defense Procotocol               READY ✓\n> Activating Drones..`,
      `> You can't hack the hackerman, ${userHack}   \n[======================================         ] 79%\n> Initiating Defense Procotocol               READY ✓\n> Activating Drones...`,
      `> You can't hack the hackerman, ${userHack}   \n[=============================================  ] 91%\n> Initiating Defense Procotocol               READY ✓\n> Activating Drones....`,
      `> You can't hack the hackerman, ${userHack}   \n[============================================== ] 99%\n> Initiating Defense Procotocol               READY ✓\n> Activating Drones                        LAUNCHED ✓`,
      `> You can't hack the hackerman, ${userHack}   \n> Initiating Defense Procotocol               READY ✓\n> Activating Drones                        LAUNCHED ✓`
    ];

    const delay = 1000;
    let i = 0;

    message.channel.send(hackBlock, { code: true })
      .then((msg) => {
        interval(async () => {
          await msg.edit(hackAppend[i], { code: true });
          i++;
        }, delay, { iterations: hackAppend.length })
      });

  }

  else {

    username = username.truncate(30).padEnd(33, ' ');

    var hackBlock = `> Hacking ${username}                         \n[=                                              ]  4% `;

    const hackAppend = [
      `> Hacking ${username}                         \n[==                                             ] 11%`,
      `> Hacking ${username}                         \n[=======                                        ] 18%`,
      `> Hacking ${username}                         \n[==========                                     ] 24%\n> Creating GUI Interface in Visual Basic.`,
      `> Hacking ${username}                         \n[===============                                ] 33%\n> Creating GUI Interface in Visual Basic..`,
      `> Hacking ${username}                         \n[==================                             ] 42%\n> Creating GUI Interface in Visual Basic...`,
      `> Hacking ${username}                         \n[========================                       ] 48%\n> Creating GUI Interface in Visual Basic      READY ✓\n> Tracking IP Address.`,
      `> Hacking ${username}                         \n[===============================                ] 60%\n> Creating GUI Interface in Visual Basic      READY ✓\n> Tracking IP Address..`,
      `> Hacking ${username}                         \n[======================================         ] 79%\n> Creating GUI Interface in Visual Basic      READY ✓\n> Tracking IP Address...`,
      `> Hacking ${username}                         \n[=============================================  ] 91%\n> Creating GUI Interface in Visual Basic      READY ✓\n> Tracking IP Address....`,
      `> Hacking ${username}                         \n[============================================== ] 99%\n> Creating GUI Interface in Visual Basic      READY ✓\n> Tracking IP Address                      ACQUIRED ✓`,
      `> Hacking ${username}COMPLETE ✓\n> Creating GUI Interface in Visual Basic      READY ✓\n> Tracking IP Address                      ACQUIRED ✓`
    ];

    const delay = 1000;
    let i = 0;

    message.channel.send(hackBlock, { code: true })
      .then((msg) => {
        interval(async () => {
          await msg.edit(hackAppend[i], { code: true });
          i++;
        }, delay, { iterations: hackAppend.length })
      });
  }

};

exports.conf = {
  // Enbable/disable command
  enabled: true,
  // set true if only usable in normal channels
  // false lets bot respond to DMs
  guildOnly: false,
  // bot also reacts to these commands
  aliases: [],
};

exports.help = {
  // name of command that triggers response
  name: "hack",
  // bot category, might want to use this somehow later
  // with a !help command to tell people how to use it
  category: "Miscellaneous",
  // same as above; pretty explanatory
  description: "hack em",
  // also same as above, just useful for !help command
  usage: "hack"
};