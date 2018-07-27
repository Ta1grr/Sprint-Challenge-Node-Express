const express = require('express');
const helmet = require('helmet');

const projectModel = require('./data/helpers/projectModel.js');
const actionModel = require('./data/helpers/actionModel.js');

const server = express();

server.use(helmet());
server.use(express.json());




server.listen(8000, () => console.log(`\n=== API running... ===\n`));