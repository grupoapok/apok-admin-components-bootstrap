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
fs.copyFileSync('./assets/main.scss', `${dest}/assets/main.scss`);
fs.copyFileSync('./assets/_variables.scss', `${dest}/assets/_variables.scss`);
mkdir(`${dest}/config`);
console.log('Components Bootstrap - Installing default config files...');
fs.copyFileSync('./index.js', `${dest}/config/components.js`);
