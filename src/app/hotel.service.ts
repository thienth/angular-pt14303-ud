import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const hotelApiUrl = 'https://5e7487579dff1200163537d7.mockapi.io/hotels';
@Injectable()
export class HotelService {

  constructor(private http: HttpClient) { }

  // Lấy tất cả dữ liệu của collection hotels 
  getListHotel(): Observable<any>{
    return this.http.get<any>(hotelApiUrl);
  }

  
  getHotelById(id): Observable<any>{
    let url = `${hotelApiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  removeHotelById(id): Observable<any>{
    let url = `${hotelApiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  addNewHotel(obj): Observable<any>{
    return this.http.post<any>(hotelApiUrl, obj);
  }

  editHotel(obj): Observable<any>{
    let url = `${hotelApiUrl}/${obj.id}`;
    return this.http.put<any>(url, obj);
  }

}