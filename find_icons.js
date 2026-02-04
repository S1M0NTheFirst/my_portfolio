const icons = require('simple-icons/icons');
const keys = Object.keys(icons);
console.log('Amazon-like:', keys.filter(k => k.toLowerCase().includes('amazon')));
console.log('AWS-like:', keys.filter(k => k.toLowerCase().includes('aws')));
console.log('CSS-like:', keys.filter(k => k.toLowerCase().includes('css')));
