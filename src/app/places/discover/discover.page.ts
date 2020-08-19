import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  private placesSub: Subscription;

  constructor(private placesService: PlacesService,
              private menuCtrl: MenuController
  ) { }

  ngOnInit(): void {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
    });
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  onOpenMenu(): void {
    // this.menuCtrl.
  }

  onFilterUpdate(event: CustomEvent): void {
    console.log(event.detail);
  }

}
