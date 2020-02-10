const Discord = require("discord.js");

const Canvas = require('canvas');


exports.run = async (client, message, args) => {

  // set default font size at 70pt and scale it down
  // if the width of the text string is wider than the 
  // image width * .98 untll it fits
  const setFont = (canvas, text) => {
    const ctx = canvas.getContext('2d');
    // default maximum font size
    let fontSize = 70;
    do {
      ctx.font = `bold ${fontSize -= 4}px sans-serif`;
    } while (ctx.measureText(text).width > canvas.width * .98);
    return ctx.font;
  };

  if (args.length > 0) {
    // eslint-disable-next-line no-useless-escape
    const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    if (regex.test(args[0])) {

      // remove URL from args array
      const messageArgs = args.splice(1).join(' ');

      let messageArr = (messageArgs.includes(',' || ';'))
        ? messageArgs.split(/[,;]+/g)
        : messageArgs.split(' ');

      const topText = messageArr[0].trim(),
        botText = messageArr[1].trim();

      let imgURL = args[0];

      const background = await Canvas.loadImage(imgURL);
      var bW = background.width;
      var bH = background.height;

      const canvas = Canvas.createCanvas(bW, bH);
      const ctx = canvas.getContext('2d');

      ctx.drawImage(background, 0, 0);

      ctx.scale(1, 1);

      ctx.font = setFont(canvas, topText);
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = "#000000";
      ctx.textAlign = 'center';
      ctx.textBaseline = "top";
      ctx.fillText(topText, canvas.width * .5, canvas.height * .02, canvas.width);
      ctx.strokeText(topText, canvas.width * .5, canvas.height * .02, canvas.width);
      ctx.font = setFont(canvas, botText);
      ctx.textBaseline = "bottom";
      ctx.fillText(botText, canvas.width * .5, canvas.height * .98, canvas.width);
      ctx.strokeText(botText, canvas.width * .5, canvas.height * .98, canvas.width);

      const attachment = new Discord.Attachment(canvas.toBuffer(), 'meme-image.png');

      message.channel.send('', attachment);

      if (message) message.delete();

    } else {
      message.channel.send(`Idk what's wrong figure it out`);
    }
  }
}

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
  name: "meme",
  // bot category, might want to use this somehow later
  // with a !help command to tell people how to use it
  category: "Miscellaneous",
  // same as above; pretty explanatory
  description: "oh no",
  // also same as above, just useful for !help command
  usage: "meme"
};