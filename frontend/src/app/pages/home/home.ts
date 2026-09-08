import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private msalService = inject(MsalService);

  get isLoggedIn(): boolean {
    return this.msalService.instance.getAllAccounts().length > 0;
  }

  get userName(): string {
    const account = this.msalService.instance.getActiveAccount()
      ?? this.msalService.instance.getAllAccounts()[0];
    return account?.name ?? 'Usuario';
  }

  login(): void {
    this.msalService.loginRedirect({
      scopes: environment.apiConfig.scopes
    });
  }
}