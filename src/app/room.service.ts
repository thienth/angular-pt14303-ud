import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const hotelApiUrl = 'https://5e7487579dff1200163537d7.mockapi.io/hotels';
@Injectable()
export class RoomService {

  constructor(private http: HttpClient) { }

  getRoomsByHotelId(hotelId): Observable<any>{
    let url = `${hotelApiUrl}/${hotelId}/rooms`;
    console.log(url);
    return this.http.get<any>(url);

  }

}