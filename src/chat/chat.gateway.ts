import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface User {
  socketId: string;
  username: string;
  inGroup: boolean;
}

@WebSocketGateway({ cors: { origin: '*' }, path: '/socket' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private users: User[] = [];

  // User bergabung
  @SubscribeMessage('set-username')
  setUsername(@MessageBody() data: { username: string }, @ConnectedSocket() client: Socket) {
    const user = { socketId: client.id, username: data.username, inGroup: false };
    this.users.push(user);
    console.log(`${data.username} connected`);

    // Kirim daftar user kecuali diri sendiri
    this.sendUserList();
  }

  // User join ke grup chat
  @SubscribeMessage('join-group')
  joinGroup(@ConnectedSocket() client: Socket) {
    const user = this.users.find(u => u.socketId === client.id);
    if (user) {
      user.inGroup = true;
      client.emit('group-joined', true);
    }
  }

  // Chat pribadi (hanya pesan tanpa nama)
  @SubscribeMessage('private-message')
  sendPrivateMessage(@MessageBody() data: { to: string; message: string }, @ConnectedSocket() client: Socket) {
    const receiver = this.users.find(u => u.username === data.to);
    if (receiver) {
      this.server.to(receiver.socketId).emit('chat-receive', { message: data.message, showName: false });
    }
  }

  // Chat grup (hanya untuk user yang sudah join grup)
  @SubscribeMessage('group-message')
  sendGroupMessage(@MessageBody() data: { message: string }, @ConnectedSocket() client: Socket) {
    const sender = this.users.find(u => u.socketId === client.id);
    if (sender && sender.inGroup) {
      this.users.forEach(user => {
        if (user.inGroup) {
          this.server.to(user.socketId).emit('chat-receive', { from: sender.username, message: data.message, showName: true });
        }
      });
    }
  }

  // Handle disconnect
  handleDisconnect(client: Socket) {
    this.users = this.users.filter(u => u.socketId !== client.id);
    this.sendUserList();
  }

  private sendUserList() {
    this.server.emit('user-list', this.users.map(u => u.username));
  }
}
