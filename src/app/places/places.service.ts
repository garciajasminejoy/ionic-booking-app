import { Injectable } from '@angular/core';

import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place('p1', 'Manhattan Mansion', 'In the heart of NYC', 'https://ds2.cityrealty.com/img/f0b0390456423ea67b7db4af95f79b69ad2bd5d7+736++0+60/401-west-45th-street.jpg', 149.99, new Date('2019-01-01'), new Date('2019-12-31')),
    new Place('p2', 'L\'amour Toujours', 'In the heart of Paris', 'https://pix10.agoda.net/hotelImages/6595314/0/f8dad268c792be883fccf63138e4145d.jpg?s=1024x768', 189.99, new Date('2019-01-01'), new Date('2019-12-31')),
    new Place('p3', 'The Foggy Palace', 'Not your average city trip!', 'https://q-cf.bstatic.com/images/hotel/max1024x768/153/153659779.jpg', 99.99, new Date('2019-01-01'), new Date('2019-12-31'))
  ];

  private _offers: Place[] = [
    new Place('a1', 'NY Apartment', 'Cozy af!', 'https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/Screen%20Shot%202018-11-13%20at%201.46.16%20PM.png', 199.42, new Date('2019-01-01'), new Date('2019-12-31')),
    new Place('a2', 'LA Apartment', 'Hippie af!', 'https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/Screen%20Shot%202018-11-13%20at%201.46.16%20PM.png', 299.42, new Date('2019-01-01'), new Date('2019-12-31')),
    new Place('a3', 'PH Apartment', 'Vacation af!', 'https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/Screen%20Shot%202018-11-13%20at%201.46.16%20PM.png', 399.42, new Date('2019-01-01'), new Date('2019-12-31')),
  ];

  get places() {
    return [...this._places];
  }

  get offers() {
    return [...this._offers];
  }

  constructor() { }

  getPlace(id: string) {
    return {...this._places.find(p => p.id === id)};
  }

  getOffer(id: string) {
    return {...this._offers.find(p => p.id === id)};
  }
}
