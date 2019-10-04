const path = require('path');
const fs = require('fs-extra');

console.log('Moving Files');

const moveFiles = async () => {
  const files = await fs.readdirSync(path.join(__dirname, '/public'));
  await files.forEach(file => {
    if (
      (path.extname(file) === '.js' && file !== 'sw.js') ||
      path.extname(file) === '.map' ||
      path.extname(file) === '.webmanifest' ||
      (path.extname(file) === '.css' && file !== 'fonts.css')
    ) {
      fs.move(
        path.join(__dirname, '/public/', file),
        path.join(__dirname, '/public/lxiv/', file),
        { overwrite: true },
        err => {
          if (err) console.error(err);
          return console.log('Moved:', file);
        },
      );
    }
  });
  fs.move(
    path.join(__dirname, '/public/static'),
    path.join(__dirname, '/public/lxiv/static'),
    { overwrite: true },
    err => {
      if (err) console.error(err);
      return console.log('Moved Static Directory');
    },
  );
  fs.move(
    path.join(__dirname, '/public/offline-plugin-app-shell-fallback'),
    path.join(__dirname, '/public/lxiv/offline-plugin-app-shell-fallback'),
    { overwrite: true },
    err => {
      if (err) console.error(err);
      return console.log('Moved Offline Plugin Directory');
    },
  );
  console.log('Moving Files Complete!');
};
moveFiles();
