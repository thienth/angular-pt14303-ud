import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HotelService} from '../hotel.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent implements OnInit {
  hotelForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    logo: new FormControl('', [
      Validators.required,
      Validators.pattern(/\.(gif|jpe?g|tiff|png|webp|bmp)$/i)
    ]),
    address: new FormControl(''),
    country: new FormControl('')
  });
  get name() { return this.hotelForm.get('name'); }
  get logo() { return this.hotelForm.get('logo'); }

  ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && (isNaN(control.value) || control.value < 18 || control.value > 45)) {
        return { 'ageRange': true };
    }
    return null;
}
  
  constructor(
    private hotelService: HotelService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      let hotelId = params.get('id');
      if( hotelId != null){
        this.hotelService.getHotelById(hotelId).subscribe(data => {
          this.hotelForm.setValue(data);
        })
      }
    })
  }
  saveHotel(){
    if(this.hotelForm.valid){
      if(this.hotelForm.value.id != null){
        this.hotelService.editHotel(this.hotelForm.value).subscribe(data => {
          this.route.navigate(['']);
        })
      }else{
          this.hotelService.addNewHotel(this.hotelForm.value).subscribe(data => {
          this.route.navigate(['']);
        })
      }
    }else{
      alert('dữ liệu đang gặp lỗi')
    }
    
    
  }

}