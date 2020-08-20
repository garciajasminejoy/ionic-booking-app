import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  relevantPlaces: Place[];
  private placesSub: Subscription;

  constructor(private placesService: PlacesService,
              private menuCtrl: MenuController,
              private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
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
    if(event.detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces;
    } else {
      this.relevantPlaces = this.loadedPlaces.filter(place => place.userId !== this.authService.userId);
    }
  }

}
