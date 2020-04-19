import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {HotelService} from '../hotel.service';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  hotelId = null;
  hotelDetail = null;
  rooms = [];
  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private hotelService: HotelService,
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.hotelId = this.activateRoute.paramMap.subscribe(params => {
      this.hotelId = Number(params.get('id'));
      
      // lấy thông tin chi tiết của hotel
      this.hotelService.getHotelById(this.hotelId).subscribe(data => {
        this.hotelDetail = data;
      });

      // lấy danh sách phòng khách sạn
      this.roomService.getRoomsByHotelId(this.hotelId).subscribe(rooms => {
        this.rooms = rooms;
      })
    });
  }

  removeHotel(){
    this.hotelService.removeHotelById(this.hotelDetail.id).subscribe(data => {
      this.route.navigate(['']);
    });
  }

}