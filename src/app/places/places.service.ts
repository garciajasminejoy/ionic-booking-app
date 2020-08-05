import { Injectable } from '@angular/core';

import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place('p1', 'Manhattan Mansion', 'In the heart of NYC', 'https://ds2.cityrealty.com/img/f0b0390456423ea67b7db4af95f79b69ad2bd5d7+736++0+60/401-west-45th-street.jpg', 149.99),
    new Place('p2', 'L\'amour Toujours', 'In the heart of Paris', 'https://pix10.agoda.net/hotelImages/6595314/0/f8dad268c792be883fccf63138e4145d.jpg?s=1024x768', 189.99),
    new Place('p3', 'The Foggy Palace', 'Not your average city trip!', 'https://q-cf.bstatic.com/images/hotel/max1024x768/153/153659779.jpg', 99.99)
  ];

  get places() {
    return [...this._places];
  }

  constructor() { }
}
