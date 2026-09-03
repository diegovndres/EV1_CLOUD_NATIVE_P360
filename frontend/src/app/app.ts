import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'frontend';

  constructor(private msalService: MsalService) {}

  ngOnInit(): void {
    this.msalService.instance.initialize().then(() => {
      this.msalService.instance.handleRedirectPromise().then(() => {
        // Login procesado (si venía de un redirect de Azure AD)
      });
    });
  }
}