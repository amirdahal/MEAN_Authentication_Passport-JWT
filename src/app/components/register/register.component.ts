import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../..//services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(form: NgForm) {
    const user = {
      name: form.value.name,
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    }
    //required field
    if(!this.validateService.validateRegister(user)){
        this.flashMessage.show("Please fill all fields", {cssClass: 'alert alert-danger', timeout:3000 });
        return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("please enter valid email", {cssClass: 'alert alert-danger', timeout:3000 })
      return false;
    }

    this.authService.registerUser(user).subscribe(
      (data: any) => {
        if(data.success) {
          form.reset();
          this.flashMessage.show("You are now registered. Sit back and relax<br> You will be redirected in 5 seconds", {cssClass: 'alert-success', timeout:3000 });
          setTimeout(() => {
            this.router.navigate(['/login']);
        }, 5000);
          //this.router.navigate(['/login']);
        } else {
          this.flashMessage.show("Something went wrong", {cssClass: 'alert-danger', timeout:3000 });
          return false;
        }
      });
  }
  
  
}
