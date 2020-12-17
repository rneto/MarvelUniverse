import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(private authService: AuthService) {}

  get isAuthenticated(): boolean {
    return this.authService.authenticated;
  }

  logOut(): void {
    this.authService.logout('/welcome');
  }

  get userName(): string {
    return this.authService.userName;
  }


}
