import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Chat } from '../providers/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatList: AngularFireList<any>;
  selectedChat: Chat = new Chat()

  constructor(private db: AngularFireDatabase) { }

    getChat() {
      this.chatList = this.db.list('chat')
      return this.chatList
    }

    insertChat(chat:Chat) {
      this.chatList.push({
        name: chat.name
      })
    }
}
