const { Command } = require('commander');

const program = new Command();

const optionForStartProgram = () => {
  program
    .option('--cimode', 'It provides the ability to control Chrome via external programs.')
    .option('--spec', '')
    .parse();

  const { cimode } = program.opts();

  const argsForChromeOptions = cimode ? [
    '--no-sandbox',
    '--disable-infobars',
    '--headless',
    '--disable-gpu',
    '--window-size=1920,1080',
  ] : [];
  return argsForChromeOptions;
};

module.exports = optionForStartProgram();
