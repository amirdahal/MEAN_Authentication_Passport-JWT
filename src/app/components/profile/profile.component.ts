import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(){
    this.authService.getProfile().subscribe(
      (profile: any) => {
      this.user = profile.user;
    },
    (err) => {
      this.flashMessage.show('Please login to continue '+ err.message, { cssClass: 'alert-info', timeout: 3000});
      return false;
    });
  }
}
