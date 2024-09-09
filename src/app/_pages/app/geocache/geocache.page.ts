import { Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';
import { IonPopover, PopoverController, IonContent } from "@ionic/angular/standalone";
import { GoogleMapsModule } from '@angular/google-maps';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { GeocacheService } from 'src/app/_services/geocache.service';
import { EMPTY, map, Observable, Subscription } from 'rxjs';
import { GeocachePoint } from 'src/app/_models/geocache-point';
import { Auth, authState, User } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { CustomPopoverComponent } from 'src/app/_components/custom-popover/custom-popover.component';
import { addIcons } from "ionicons";
import { BachelorPartyCommitteePunishesYouException } from 'src/app/_errors/bachelor-party-committee-punishes-you.exception';
@Component({
  selector: 'app-geocache',
  templateUrl: './geocache.page.html',
  styleUrls: ['./geocache.page.scss'],  
  imports: [IonContent, 
    IonPopover,
    GoogleMapsModule, 
    NgFor, 
    AsyncPipe, 
    JsonPipe,
  ],
  providers: [GeocacheService, PopoverController],
  standalone: true,
})
export class GeocachePage  implements OnInit {
  public alertButtons = ['OK','Cancel'];
  @ViewChild('map', { static: true }) mapElementRef!: ElementRef;
  center = { lat: 47.800630, lng: 18.801077 };
  us = { lat: 0, lng: 0 };

  options: google.maps.MapOptions = {
    mapId: "9fb1320d1c06a633",
    center: { lat: this.center.lat, lng: this.center.lng },
    zoom: 15
  };
  // this is an SVG string of a house icon, but feel free to use whatever SVG icon you'd like


  pin = '../../../assets/img/pin.png';
  pinSuccess ='../../../assets/img/pin_success.png';
  pinUnsuccess = '../../../assets/img/pin_unsuccess.png'
  davidIcon = '../../../assets/img/davidpin.png';
  geocachePoints$!: Observable<GeocachePoint[]>;
  geocachePoints: GeocachePoint[] = [];
  public readonly user: Observable<User | null> = EMPTY;
  private readonly userDisposable: Subscription|undefined;
  david!: HTMLImageElement;
  constructor(private popoverController: PopoverController, private service: GeocacheService, @Optional() private auth: Auth) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
      });
    }
  }

  ngOnInit() {
    this.geocachePoints$ = this.service.getAllGeocachePoints();
    this.geocachePoints$.subscribe(points =>{
      this.geocachePoints = points;
      this.geocachePoints.forEach(geocachePoint => {
        geocachePoint = this.addGeocacheImage(geocachePoint);
      })
    });
    this.setCurrentLocation();
  }
  addGeocacheImage(geocachePoint: GeocachePoint): GeocachePoint {
    let pinPath: string|undefined = '';
    if (geocachePoint.AnswerStatus === -1) {
      pinPath = this.pin;
    }
    if (geocachePoint.AnswerStatus === 1) {
      pinPath = this.pinSuccess;
    }
    if (geocachePoint.AnswerStatus === 0) {
      pinPath = this.pinUnsuccess;
    }
    const pinImage = document.createElement('img');
    pinImage.src = pinPath; 
    geocachePoint.Icon = pinImage;
    return geocachePoint;
  }
  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.us = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
    (error) =>{
      console.error('Error getting location', error);
    },
  {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0
  }); 
      const davidImage = document.createElement('img');
      davidImage.width = 60;
      davidImage.height = 60;
      davidImage.src = this.davidIcon;
      this.david = davidImage; 
    }
  }

  async handleMapClick(event: any, id: string, title: string, description: string, help: string, correctAnswer: string): Promise<void> {
    const popover = await this.popoverController.create({
      component: CustomPopoverComponent,
      event: event,
      translucent: true,
      componentProps: {
        options: { id: id, title: title, description: description, help: help, correctAnswer: correctAnswer }
      },
      cssClass: 'custom-popover'
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();
    try {
      if (data !== undefined){
    if (data === correctAnswer) {
      this.service.updateHasAnswered(id, 1).then(result => {
        console.log('answer updated!', result);
      },
    error => {
      console.error('Answer not updated!', error)
    });
    } else {
      this.service.updateHasAnswered(id, 0).then(result => {
        console.log('answer updated!', result);
      },
    error => {
      console.error('Answer not updated!', error)
    });
      throw new BachelorPartyCommitteePunishesYouException('Rossz válasz! Készülj fel a szankcióra!');
    } 
  }
    } catch (err) {
      if (err instanceof BachelorPartyCommitteePunishesYouException) {
        alert(`${err.name}: ${err.message}`);
      }
    }
  }
}
