import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ChatService } from '../../providers/chat.service';
import { Chat } from '../../providers/chat.model';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userprofile: Observable<any>
  chatList: Chat[];
  constructor(private chatservice: ChatService,private router: Router,private authservice: AuthService) { }

  ngOnInit() {
    this.resetForm()
    this.userprofile = this.authservice.getuserprofile().valueChanges()
    var x = this.chatservice.getChat()
    x.snapshotChanges().subscribe(item => {
      this.chatList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.chatList.push(y as Chat)
      })
    })
  }

  onEdit(chat: Chat) {
    this.chatservice.selectedChat = Object.assign({}, chat)
  }

  onSubmit(chatForm: NgForm){
    if(chatForm.value.$key == null)  
      this.chatservice.insertChat(chatForm.value)
      swal({
        title: 'Successfully Send Message',
        icon: 'success'
      })
    
    
  }

  resetForm(chatForm?: NgForm) {
    if(chatForm != null)
      chatForm.reset();
      this.chatservice.selectedChat = {
        $key: null,
        name: ''
      }
  }

  logout() {
    this.authservice.signout()
    .then(user => {
      this.router.navigate(['/login'])
    })
  }

}
