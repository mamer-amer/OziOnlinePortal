import { Router, ActivatedRoute } from '@angular/router';
import { LicenseService } from './../../../../services/license.service';
import { License } from './../../../../models/license';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-license-details',
  templateUrl: './license-details.component.html',
  styleUrls: ['./license-details.component.css']
})
export class LicenseDetailsComponent implements OnInit {
  licenseDTO: License = new License(); 
  routeId:any=undefined;
  constructor(private licenseService: LicenseService, private router: Router, private activatedRoute: ActivatedRoute) { }

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
    this.licenseService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.licenseDTO = res;
        this.licenseDTO.status = res.status 
      }
    })
  }


  back(){
    window.history.go(-1);
  }

}
