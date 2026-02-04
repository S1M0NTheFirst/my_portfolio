const icons = require('simple-icons/icons');
const names = [
  'siPython', 'siTypescript', 'siJavascript', 'siCplusplus', 'siC', 'siPostgresql', 
  'siFirebase', 'siMongodb', 'siRedis', 'siReact', 'siNextdotjs', 'siNodedotjs', 
  'siFlask', 'siExpress', 'siTailwindcss', 'siDocker', 
  'siGit', 'siLinux', 'siPytorch', 'siTensorflow', 'siOpencv',
  'siAmazonaws', 'siKubernetes', 'siSupabase', 'siHtml5', 'siCss3', 'siScikitlearn'
];

names.forEach(name => {
  if (!icons[name]) {
    console.error(`ERROR: ${name} is NOT found in simple-icons/icons`);
  } else {
    console.log(`OK: ${name}`);
  }
});
