import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, ActionSheetController } from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private navCtrl: NavController,
              private placesService: PlacesService,
              private modalCtrl: ModalController,
              private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (!params.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(params.get('placeId'));
      console.log('this.place: ', this.place);
    });
  }

  onBookPlace(): void {
    // this.router.navigateByUrl('places/tabs/discover');
    // this.navCtrl.navigateBack('/places/tabs/discover');
    // unreliable, because you will not know what the first page stack is
    // this.navCtrl.pop();
    this.actionSheetCtrl.create({
      header: 'Choose an action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select')
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random')
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
          // role: 'destructive' --> red text
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  openBookingModal(mode: 'select' | 'random'): void {
    console.log(mode);
    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: {
        selectedPlace: this.place,
        selectedMode: mode
      }
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData => {
      console.log(resultData.data, resultData.role);
      if (resultData.role === 'confirm') {
        console.log('booked!');
      }
    });
  }

}
