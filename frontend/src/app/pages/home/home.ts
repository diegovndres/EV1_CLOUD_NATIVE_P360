import { Component, inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private msalService = inject(MsalService);

  login(): void {
    this.msalService.loginRedirect({
      scopes: environment.apiConfig.scopes
    });
  }
}