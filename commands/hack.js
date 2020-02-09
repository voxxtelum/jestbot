/*========================= TODO ========================*


*/
const interval = require('interval-promise')

// What is the command listening for?
exports.run = async (client, message, args) => {

  const username = message.guild.members.find(val => val.id === message.author.id).displayName;
  var hackBlock = `Hacking ${username}.`;

  const hackAppend = [
    `Hacking ${username}..`,
    `Hacking ${username}...`,
    `Hacking ${username}....\nCreating GUI Interface in Visual Basic.`,
    `Hacking ${username}.\nCreating GUI Interface in Visual Basic..`,
    `Hacking ${username}..\nCreating GUI Interface in Visual Basic...`,
    `Hacking ${username}...\nCreating GUI Interface in Visual Basic....READY\nTracking IP Address.`,
    `Hacking ${username}....\nCreating GUI Interface in Visual Basic....READY\nTracking IP Address..`,
    `Hacking ${username}.\nCreating GUI Interface in Visual Basic....READY\nTracking IP Address...`,
    `Hacking ${username}..\nCreating GUI Interface in Visual Basic....READY\nTracking IP Address....`,
    `Hacking ${username}...\nCreating GUI Interface in Visual Basic....READY\nTracking IP Address....ACQUIRED`,
    `Hacking ${username}...COMPLETE\nCreating GUI Interface in Visual Basic....READY\nTracking IP Address....ACQUIRED`
  ];

  const delay = 1000;
  var i = 0;

  message.channel.send(hackBlock, { code: true })
    .then((msg) => {
      interval(async () => {
        await msg.edit(hackAppend[i], { code: true });
        i++;
      }, delay, { iterations: hackAppend.length })
    });



  /*
  message.channel.send(hackBlock, { code: true })
    .then((msg) => {
      setTimeout(function () {
        msg.edit(`Hacking ${username}..`, { code: true });
        setTimeout(function () {
          msg.edit(`Hacking ${username}...`, { code: true });
          setTimeout(function () {
            msg.edit(`Hacking ${username}.... \nCreating GUI Interface in Visual Basic.`, { code: true });
            setTimeout(function () {
              msg.edit(`Hacking ${username}.... \nCreating GUI Interface in Visual Basic..`, { code: true });
              setTimeout(function () {
                msg.edit(`Hacking ${username}.... \nCreating GUI Interface in Visual Basic...`, { code: true });
                setTimeout(function () {
                  msg.edit(`Hacking ${username}.... \nCreating GUI Interface in Visual Basic....`, { code: true });
                  setTimeout(function () {
                    msg.edit(`Hacking ${username}.... \nCreating GUI Interface in Visual Basic.... \nTracking IP Address.`, { code: true });
                    setTimeout(function () {
                      msg.edit(`Hacking ${username}.... \nCreating GUI Interface in Visual Basic.... \nTracking IP Address..`, { code: true });
                      setTimeout(function () {
                        msg.edit(`Hacking ${username}.... \nCreating GUI Interface in Visual Basic.... \nTracking IP Address...ACQUIRED`, { code: true });
                      }, delay);
                    }, delay);
                  }, delay);
                }, delay);
              }, delay);
            }, delay);
          }, delay);
        }, delay);
      }, delay);
    });  // Properties of each command
  // Used to check requirements in events/message.js
  */

};

exports.conf = {
  // Enbable/disable command
  enabled: true,
  // set true if only usable in normal channels
  // false lets bot respond to DMs
  guildOnly: true,
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