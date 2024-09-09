import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonMenu, IonApp, IonButton } from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonApp, IonMenu, IonMenuButton,IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, RouterLinkActive],
})
export class HomePage {
  constructor() {

  }
  getGeocaches() {

  }
}
