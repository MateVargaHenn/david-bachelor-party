import { Component } from '@angular/core';
import { HomePage } from './home/home.page';
import { GeocachePage } from './geocache/geocache.page';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonNav, IonButtons, IonMenuButton, IonTitle, IonMenu, IonContent, IonList, IonLabel, IonItem, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-page',
  templateUrl: './app.page.html',
  styleUrls: ['./app.page.scss'],
  standalone: true,
  imports: [IonButton, IonItem, IonNav, IonLabel, IonList, IonContent, IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonMenu],
})
export class AppPage {
  component?: any;
  homePage = HomePage;
  geocachePage = GeocachePage;
  constructor() {
    this.component = this.homePage;
  }

  goHome() {
    this.component = this.homePage;
  }
  goGeocache() {
    this.component = this.geocachePage;
  }
}
