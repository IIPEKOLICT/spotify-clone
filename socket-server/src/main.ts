import express from 'express';
import { config } from 'dotenv';
import { PORT } from './constants/environment';
import { healthCheck } from './handlers/health-check.handler';
import { SocketService } from './services/socket.service';

const app = express();

config();
app.get('/status', healthCheck);

(async () => {
  const server = app.listen(PORT, () => {
    SocketService.inject(server);
    console.log(`Socket server started at ${PORT} port`);
  });
})();
