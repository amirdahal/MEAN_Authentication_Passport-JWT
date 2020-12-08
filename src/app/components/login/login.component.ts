import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit(form: NgForm) {
    const user = {
      username: form.value.username,
      password: form.value.password,
    }
    this.authService.authenticateUser(user).subscribe(
      (data: any) => {
        if(data.success) {
          form.reset();
          this.authService.storeUserData(data.token, data.user);
          this.flashMessage.show("Login Successful. Sit back and relax!", {cssClass: 'alert-success', timeout:3000 });
          this.router.navigate(['/profile']);
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout:3000 });
          return false;
        }
      });  
  }
}
