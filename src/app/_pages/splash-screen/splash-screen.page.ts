import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonFab, IonFabButton, IonIcon, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  standalone: true,
  imports: [IonButton, IonIcon, IonFabButton, IonFab, IonImg, IonContent, IonHeader, IonToolbar, IonTitle, RouterLink],
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage {


}
