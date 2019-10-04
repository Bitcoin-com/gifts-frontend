const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const sizeOf = require('image-size');
const chalk = require('chalk');
const moment = require('moment');

async function imageCompressor() {
  const startTime = moment();
  let ignoredFiles = 0;
  let skippedFiles = 0;
  let compressedFiles = 0;

  try {
    console.log(`${chalk.cyan('Starting')} images compression process`);
    const extensions = ['png', 'jpg', 'gif', 'jpeg'];

    const paths = [
      'uploads',
      'compressed2x',
      'compressed4x',
      'compressed8x',
      'compressed16x',
    ];

    for (let i = 0; i < paths.length - 1; i += 1) {
      const sourceFolder = path.join(__dirname, `static/images/${paths[i]}`);
      const destinationFolder = path.join(
        __dirname,
        `static/images/${paths[i + 1]}`,
      );

      if (fs.existsSync(destinationFolder) === false) {
        fs.mkdirSync(destinationFolder);
      }

      const files = fs.readdirSync(sourceFolder);

      const promises = [];

      // eslint-disable-next-line no-loop-func
      files.forEach(file => {
        const extension = file.split('.').pop();
        if (extensions.includes(extension) === false) {
          if (i === 0) {
            console.log(`${chalk.yellow('Ignoring')} ${file}`);
            ignoredFiles += 1;
          }
          return;
        }

        const sourceFile = `${sourceFolder}/${file}`;
        const destinationFile = `${destinationFolder}/${file}`;

        if (fs.existsSync(destinationFile) === true) {
          if (i === 0) {
            console.log(`${chalk.blue('Skipping')} ${file}`);
            skippedFiles += 1;
          }
          return;
        }

        const { width } = sizeOf(sourceFile);

        let newWidth = width;

        if (width % 2 !== 0) {
          newWidth = width - 1;
        }

        if (i === 0) {
          console.log(`${chalk.green('Compressing')} ${file}`);
          compressedFiles += 1;
        }

        const promise = sharp(sourceFile)
          .resize({
            width: newWidth / 2,
          })
          .toFile(destinationFile);

        promises.push(promise);
      });

      // eslint-disable-next-line no-await-in-loop
      await Promise.all(promises);
    }
  } catch (err) {
    console.log(chalk.red('Error'), err);
  } finally {
    const endTime = moment();
    const diff = endTime.diff(startTime, 'ms');
    console.log(
      `${chalk.cyan('Ending')} images compression process - ${chalk.cyan(
        `${diff}ms`,
      )}`,
    );
    console.log(`${chalk.cyan(ignoredFiles)} ${chalk.yellow('ignored')} files`);
    console.log(`${chalk.cyan(skippedFiles)} ${chalk.blue('skipped')} files`);
    console.log(
      `${chalk.cyan(compressedFiles)} ${chalk.green('compressed')} files`,
    );
  }
}

imageCompressor();
