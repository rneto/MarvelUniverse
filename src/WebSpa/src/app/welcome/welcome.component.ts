import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services';
import { Layout } from './models/layout';
import { WelcomeService } from './services/welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  layout: Layout;

  constructor(
    private welcomeService: WelcomeService,
    private authService: AuthService
  ) { }

  get isAuthenticated(): boolean {
    return this.authService.authenticated;
  }

  ngOnInit(): void {
    this.welcomeService.getLayout().subscribe((response) => {
      this.layout = response;
    });
  }

}
