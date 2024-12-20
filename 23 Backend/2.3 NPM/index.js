// package.json 
// "type" : "commonjs" <= default 
// const generateName = require('sillyname');
import generateName from "sillyName"
const sillyName = generateName();
console.log(`My silly ${sillyName}.`);

import superHeroName from "superheros";
superHeroName();
// const heroName = superHeroName(); 
// console.log(`My name is ${heroName}.`);
