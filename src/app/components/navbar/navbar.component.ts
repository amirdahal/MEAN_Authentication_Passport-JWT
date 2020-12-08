import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: Boolean;

  constructor(public authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    
  }

  onLogout() {
    this.authService.logout();
    this.flashMessage.show('Logging you out', { cssClass: 'alert-info', timeout: 3000});
    this.router.navigate(['/']);
    return false;
  }
}
