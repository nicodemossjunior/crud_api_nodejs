import dotenv from 'dotenv';

console.log(process.env.PRD);

if(process.env.PRD !== 'true') { 
  // import dotenv from 'dotenv';
  dotenv.config();
}

console.log(process.env.USERDB);