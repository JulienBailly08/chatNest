import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketEvents {
  @WebSocketServer()
  server: Server;

  //connexion
  handleConnection(client: Socket) {
    console.log(`client connected: ${client.id}`);
  }

  //deconnexion
  handleDisconnect(client: Socket) {
    console.log(`client disconnected: ${client.id}`);
  }

  //recevoir un event => s'abonner à un message
  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    //envoyer un event
    this.server.emit('message', client.id, data);
  }
}
