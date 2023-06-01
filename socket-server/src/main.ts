import express from 'express';
import { config } from 'dotenv';
import { PORT } from './constants/environment';
import { healthCheck } from './handlers/health-check.handler';
import { SocketServerService } from './services/socket-server.service';

const app = express();

config();
app.get('/status', healthCheck);

(async () => {
  const server = app.listen(PORT, () => {
    SocketServerService.inject(server);
    console.log(`Socket server started at ${PORT} port`);
  });
})();
