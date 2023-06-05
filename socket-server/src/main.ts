import express, { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';
import { SocketEvent, SocketServer } from '@yumasoft-spotify/socket-sdk';
import { Server, Socket } from 'socket.io';

config();

const PORT: string | number = process.env.PORT ?? 8888;
const app = express();

app.get('/status', async (request: Request, response: Response, next: NextFunction) => {
  try {
    response.json({ status: 'ok' });
  } catch (error) {
    next(error);
  }
});

(async () => {
  const server = app.listen(PORT, () => {
    const io = new Server(server, { transports: ['websocket'], allowUpgrades: false });

    io.on('connection', (socket: Socket) => {
      const service = SocketServer.create(socket);

      for (const eventId in SocketEvent) {
        const event: SocketEvent = SocketEvent[eventId];
        const handler = service[event]?.bind(service);

        if (handler) {
          socket.on(event, handler);
        }
      }
    });

    process.on('exit', () => {
      io.disconnectSockets(true);
      io.close();
    });

    console.log(`Socket server started at ${PORT} port`);
  });
})();
