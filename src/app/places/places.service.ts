import { Injectable } from '@angular/core';

import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places =  new BehaviorSubject<Place[]>(
    [
      new Place('p1',
                'Manhattan Mansion',
                'In the heart of NYC',
                'https://ds2.cityrealty.com/img/f0b0390456423ea67b7db4af95f79b69ad2bd5d7+736++0+60/401-west-45th-street.jpg',
                149.99,
                new Date('2019-01-01'),
                new Date('2019-12-31'),
                'abc'
                ),
      new Place('p2',
                'L\'amour Toujours',
                'In the heart of Paris',
                'https://pix10.agoda.net/hotelImages/6595314/0/f8dad268c792be883fccf63138e4145d.jpg?s=1024x768',
                189.99,
                new Date('2019-01-01'),
                new Date('2019-12-31'),
                'abc'
                ),
      new Place('p3',
                'The Foggy Palace',
                'Not your average city trip!',
                'https://q-cf.bstatic.com/images/hotel/max1024x768/153/153659779.jpg',
                99.99,
                new Date('2019-01-01'),
                new Date('2019-12-31'),
                'abc'
                )
    ]
  );

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService) { }

  getPlace(id: string) {
    // return {...this._places.find(p => p.id === id)};
    return this.places
      .pipe(
        take(1),
        map(places => {
          return { ...places.find(p => p.id === id )};
        })
      );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/Screen%20Shot%202018-11-13%20at%201.46.16%20PM.png',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    return this.places
      .pipe(
        take(1),
        delay(1000),
        tap((places) => {
          this._places.next(places.concat(newPlace));
        })
      );
  }
}
