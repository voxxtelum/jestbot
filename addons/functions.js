module.exports = client => {
  const random = require('../addons/random.js');

  // Set detfault setings
  // Will be overwritting by settings in ./config/config.js
  const defaultSettings = {
    prefix: '!',
    modLogChannel: 'mod-log',
    modRole: 'Moderator',
    adminRole: 'Administrator',
    systemNotice: 'true',
    welcomeChannel: 'welcome',
    welcomeMessage:
      'Say hello to {{user}}, everyone! We all need a warm welcome sometimes xD',
    welcomeEnabled: 'false'
  };

  client.getSettings = guild => {
    client.settings.ensure('default', defaultSettings);
    if (!guild) return client.settings.get('default');
    const guildConf = client.settings.get(guild.id) || {};
    return { ...client.settings.get('default'), ...guildConf };
  };

  // Load command from ./commands
  // Command name is set in exports.help
  client.loadCommand = commandName => {
    try {
      client.logger.log(`Loading Command: ${commandName}`);
      const props = require(`../commands/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  client.unloadCommand = async commandName => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command)
      return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

    if (command.shutdown) {
      await command.shutdown(client);
    }
    const mod =
      require.cache[require.resolve(`../commands/${command.help.name}`)];
    delete require.cache[
      require.resolve(`../commands/${command.help.name}.js`)
    ];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
    return false;
  };

  // Misc functions

  // Check if array value is emoji. Can be used to check current or previous
  // values, etc are emojis

  client.checkEmojiArr = (a, i) => {
    const regex = /[-0-z]*(<:|:)[-0-z]+/;
    return regex.test(a[i]);
  };

  client.checkEmojiStr = w => {
    const regex = /[-0-z]*(<:|:)[-0-z]+/;
    return regex.test(w);
  };

  // Turning !roll into something I can use anywhere
  client.rollNumbers = async (message, args) => {
    const messageAuthor = `<@${message.author.id}>`;

    try {
      if (!args.length) {
        // Basic /roll with no arguments
        const roll = random.integer(1, 100);
        const messageOut = `${messageAuthor} rolls ${roll} (1-100)`;
        return messageOut;
      } else {
        // Joins args
        const longArgs = args.join(' ');
        // Create array of all integers in argument
        const integers = longArgs.match(/[0-9]+/g);
        // If no integers were found
        if (!integers) {
          const messageOut = `Hey ${messageAuthor}, there no number`;
          return messageOut;
        } else if (integers.length == 1) {
          // If only 1 integer was found
          const intMax = Math.abs(parseInt(integers[0]));
          const roll = random.integer(1, intMax);

          const messageOut = `${messageAuthor} rolls ${roll} (1-${intMax})`;
          return messageOut;
        } else if (integers.length == 2) {
          // If integers has 2 args
          const intMin = integers[0];
          const intMax = integers[1];

          if (intMin > intMax) {
            const roll = random.integer(intMax, intMin);
            const messageOut = `${messageAuthor} rolls ${roll} (${intMax}-${intMin})`;
            return messageOut;
          } else {
            const roll = random.integer(intMin, intMax);
            const messageOut = `${messageAuthor} rolls ${roll} (${intMin}-${intMax})`;
            return messageOut;
          }
        } else {
          // If integers has > 2 args
          const messageOut = `Hey ${messageAuthor}, you have to give me 0, 1 or 2 number ya dingus`;
          return messageOut;
        }
      }
    } catch (e) {
      return `Roll broken: ${e}`;
    }
  };

  // Truncate string to avoid discord character limit
  Object.defineProperty(String.prototype, 'truncate', {
    value: function(len = 0, end = '') {
      len -= end.length;
      return this.substr(0, len) + end;
    }
  });

  // Neat little thing to fix case of string
  Object.defineProperty(String.prototype, 'toProperCase', {
    value: function() {
      return this.replace(
        /([^\W_]+[^\s-]*) */g,
        txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    }
  });

  // `await client.wait(1000);` to "pause" for 1 second.
  client.wait = require('util').promisify(setTimeout);

  // Catching exceptions with more details because I am dumb
  // eslint-disable-next-line no-undef
  process.on('uncaughtException', err => {
    // eslint-disable-next-line no-undef
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    client.logger.error(`Uncaught Exception: ${errorMsg}`);
    console.error(err);
    // eslint-disable-next-line no-undef
    process.exit(1);
  });

  // eslint-disable-next-line no-undef
  process.on('unhandledRejection', err => {
    client.logger.error(`Unhandled rejection: ${err}`);
    console.error(err);
  });
};
