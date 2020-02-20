/*
// eslint-disable-next-line no-warning-comments
todo -> allow more arguments for customisation
?    -> -color red, -font impact
todo -> set a minimum font size
*/

const Discord = require('discord.js');

const Canvas = require('canvas');

exports.run = async (client, message, args) => {
  //* "font: impact" regex ([-]{0,2}(font)[:;-]\s?[\w\d]+)
  //* string with comma regex (([ ]*[\w]+)+(?=,))

  if (args[0] == 'help') {
    //! show help message
  } else {
    const filterArgs = userArgs => {
      // eslint-disable-next-line no-useless-escape
      const regexURL = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;
      const regexTop = /(?<=(-(t+[op]*)+[ ;:]+))[^-|.]+/g;
      const regexBot = /(?<=(-(b+[ottom]*)+[ ;:]+))[^-|.]+/g;

      const inputStr = userArgs.join(' ');

      let inputError = '';

      const inputURL = inputStr.match(regexURL);
      if (!inputURL) {
        inputError += 'urlError ';
      }
      let url = inputURL ? inputURL[0].trim() : '';
      const textStr = inputStr.replace(new RegExp(url, 'g'), ''),
        matchTop = textStr.match(regexTop),
        matchBot = textStr.match(regexBot),
        inputTop = matchTop ? matchTop[0].trim() : '',
        inputBot = matchBot ? matchBot[0].trim() : '';

      if (!matchTop && !matchBot) {
        inputError += 'strError';
      }

      return {
        imgURL: url,
        topText: inputTop,
        bottomText: inputBot,
        error: inputError
      };
    };

    // set default font size at 70pt and scale it down
    // if the width of the text string is wider than the
    // image width * .98 untll it fits
    const setFont = (canvas, text) => {
      const ctx = canvas.getContext('2d');
      // default maximum font size
      let fontSize = 70;
      do {
        ctx.font = `bold ${(fontSize -= 2)}px sans-serif`;
      } while (
        ctx.measureText(text).width > canvas.width * 0.98 ||
        fontSize <= 24
      ); //* trying a min font size
      return ctx.font;
    };

    const userInput = filterArgs(args);

    console.log(userInput);

    if (userInput.error.includes('urlError')) {
      //! user didnt include text
      console.log(`didnt add utl`);
    } else if (userInput.error.includes('strError')) {
      //! user didnt add url
      console.log(`didnt add text`);
    } else {
      const topText = userInput.topText,
        botText = userInput.bottomText;

      await Canvas.loadImage(userInput.imgURL)
        .then(background => {
          //? Begin Draw -->

          var bgWidth = background.width;
          var bgHeight = background.height;

          const canvas = Canvas.createCanvas(bgWidth, bgHeight);
          const ctx = canvas.getContext('2d');

          ctx.drawImage(background, 0, 0);

          ctx.font = setFont(canvas, topText);
          ctx.fillStyle = '#FFFFFF';
          ctx.strokeStyle = '#000000';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(
            topText,
            canvas.width * 0.5,
            canvas.height * 0.02,
            canvas.width
          );
          ctx.strokeText(
            topText,
            canvas.width * 0.5,
            canvas.height * 0.02,
            canvas.width
          );
          ctx.font = setFont(canvas, botText);
          ctx.textBaseline = 'bottom';
          ctx.fillText(
            botText,
            canvas.width * 0.5,
            canvas.height * 0.98,
            canvas.width
          );
          ctx.strokeText(
            botText,
            canvas.width * 0.5,
            canvas.height * 0.98,
            canvas.width
          );

          //? End Draw

          const attachment = new Discord.Attachment(
            canvas.toBuffer(),
            'meme-image.png'
          );

          message.channel.send('', attachment);

          // delete message to reduce clutter
          if (message.channel.type == 'guild') message.delete();
        })
        .catch(error => {
          //! URL doesn't point to image
          console.log(`${error} - URL NOT IMAGE`);
        });
    }
  }
};

exports.conf = {
  // Enbable/disable command
  enabled: true,
  // set true if only usable in normal channels
  // false lets bot respond to DMs
  guildOnly: false,
  // bot also reacts to these commands
  aliases: []
};

exports.help = {
  // name of command that triggers response
  name: 'meme',
  // bot category, might want to use this somehow later
  // with a !help command to tell people how to use it
  category: 'Miscellaneous',
  // same as above; pretty explanatory
  description: 'oh no',
  // also same as above, just useful for !help command
  usage: 'meme'
};
