import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonNav, IonButtons, IonMenuButton, IonTitle, IonMenu, IonContent, IonList, IonLabel, IonItem, IonButton } from '@ionic/angular/standalone';

import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonRouterOutlet ],
})
export class AppComponent {

  constructor() {
  }
}
