import { Component, OnInit } from '@angular/core';
import {HotelService} from '../hotel.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  hotelDetail = {
    id: null,
    name: null,
    logo: null,
    address: null
  }
  hotels = [];
  constructor(private hotelService: HotelService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.hotelService.getListHotel().subscribe(data => {
      this.hotels = data;
    });
  }

  open(content) {
    this.modalService.open(content, {size: 'xl'});
  }
  openModal(content, hotelId){
    console.log(hotelId);
    this.hotels.map(item => {
      if(item.id == hotelId){
        this.hotelDetail = {...item};
      }
    });
    this.modalService.open(content, {size : 'xl'});
  }

}