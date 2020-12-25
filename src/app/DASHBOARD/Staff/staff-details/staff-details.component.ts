import { Router, ActivatedRoute } from '@angular/router';
import { StaffService } from './../../../../services/staff.service';
import { Staff } from './../../../../models/staff';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.css']
})
export class StaffDetailsComponent implements OnInit {

  staffDTO: Staff = new Staff();
  routeId: any = undefined;
  constructor(private staffService: StaffService, private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.getRouteId();
    
  }

  getRouteId() {
    this.activatedRoute.params.subscribe(params => {
      this.routeId = params['id'];
      this.getById();
    });
  }

  getById() {
    this.staffService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.staffDTO = res;
        this.staffDTO.status = res.status 
      }
    })
  }


  back(){
    window.history.go(-1);
  }


}
