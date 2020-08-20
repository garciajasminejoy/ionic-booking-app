import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];

  sub: Subscription;

  constructor(
    private bookingsService: BookingService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    // this.loadedBookings = this.bookingsService.bookings;
    this.sub = this.bookingsService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onCancelBooking(bookingId: string, slidingBooking: IonItemSliding) {
    slidingBooking.close();
    this.loadingCtrl.create({
      message: 'Cancelling...'
    }).then(loadingEl => {
      loadingEl.present();
      this.bookingsService.cancelBooking(bookingId)
        .subscribe(() => {
          loadingEl.dismiss();
        });
    });
    
  }

}
