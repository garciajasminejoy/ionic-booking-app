import { Injectable } from '@angular/core';

import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface PlaceData {
  availableFrom: string,
  availableTo: string,
  description: string,
  imageUrl: string,
  price: number,
  title: string,
  userId: string,
}

const places = [
  new Place('p1',
            'Manhattan Mansion',
            'In the heart of NYC',
            'https://ds2.cityrealty.com/img/f0b0390456423ea67b7db4af95f79b69ad2bd5d7+736++0+60/401-west-45th-street.jpg',
            149.99,
            new Date('2019-01-01'),
            new Date('2019-12-31'),
            'abc2'
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
];

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places =  new BehaviorSubject<Place[]>([]);

  get places() {
    return this._places.asObservable();
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  fetchPlaces() {
    return this.http.get<{ [key: string]: PlaceData }>('https://ionic-angular-course-db88b.firebaseio.com/offered-places.json')
      .pipe(
        // tap((resData) => {
        //   console.log(resData);
        // })
        map(resData => {
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key, 
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId,
                )
              );
            }
          }
          return places;
        }),
        tap(places => {
          this._places.next(places);
        })
      );
  }

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
    let generatedId: string;
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
    return this.http
      .post<{name: string}>('https://ionic-angular-course-db88b.firebaseio.com/offered-places.json', { ...newPlace, id: null })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.places
        }),
        take(1),
        tap(places => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
    // return this.places
    //   .pipe(
    //     take(1),
    //     delay(1000),
    //     tap((places) => {
    //       this._places.next(places.concat(newPlace));
    //     })
    //   );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap(places => {
        const updatePlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatePlaceIndex]
        updatedPlaces[updatePlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        return this.http.put(
          `https://ionic-angular-course-db88b.firebaseio.com/offered-places/${placeId}.json`, 
          {
            ...updatedPlaces[updatePlaceIndex], id: placeId
          }
        );
      }),
      tap(resData => {
        this._places.next(updatedPlaces);
      })
    );
  }
}
