const fs = require('fs');
const path = require('path');

const mkdir = (dest) => {
    if (!fs.existsSync(dest)) {
        try {
            fs.mkdirSync(path.resolve(dest), { recursive: true });
        } catch (err) {
            console.log(err);
            if (err.code !== 'EEXIST') throw err;
        }
    }
};

const pwd = process.env.INIT_CWD;

const dest = `${pwd}/src`;
mkdir(`${dest}/assets`);
console.log('Components Bootstrap - Installing default sass files...');
let destination = `${dest}/assets/main.scss`;
if (!fs.existsSync(destination)) {
    fs.copyFileSync('./assets/main.scss', destination);
}
destination = `${dest}/assets/_variables.scss`;
if (!fs.existsSync(destination)) {
    fs.copyFileSync('./assets/_variables.scss', destination);
}

mkdir(`${dest}/config`);
console.log('Components Bootstrap - Installing default config files...');
destination = `${dest}/config/components.js`;
if (!fs.existsSync(destination)) {
    fs.copyFileSync('./index.js', destination);
}
destination = `${pwd}/vue.config.js`;
if (!fs.existsSync(destination)) {
  fs.copyFileSync("./vue.config.js", destination);
}
