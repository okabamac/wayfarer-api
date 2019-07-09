import http from 'http';

import app from './app';

import keys from './src/utilities/config.util';

const { port } = keys;

const server = http.createServer(app);

server.listen(port, () => console.info(`Application running on port ${port}`));
