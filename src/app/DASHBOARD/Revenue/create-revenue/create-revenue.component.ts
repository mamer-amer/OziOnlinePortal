import { EnumService } from './../../../../services/enum.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RevenueService } from './../../../../services/revenue.service';
import { Revenue } from './../../../../models/revenue';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-revenue',
  templateUrl: './create-revenue.component.html',
  styleUrls: ['./create-revenue.component.css']
})
export class CreateRevenueComponent implements OnInit {

  revenueDto: Revenue = new Revenue();
  routeId: any = undefined;
  constructor(private revenueService: RevenueService, private router: Router, private activatedRoute: ActivatedRoute,private enumService:EnumService) { }

 moduleId:any;
  ngOnInit(): void {
    this.activatedRoute
    .queryParams
    .subscribe((params)=> {

      this.moduleId = params['moduleId'];

    });
    
    this.getStatus();
    this.getRouteId();
    if (this.routeId != undefined) {
      this.getById();
    }


  }


  save() {
   
    if (this.routeId == undefined) {
      this.revenueService.create(this.revenueDto).subscribe(res => {
        if (res) {
          this.router.navigate(['layout/view/revenue'])
        }
      })
    }
    else {
      this.revenueService.update(this.revenueDto).subscribe(res => {
        if (res) {
          this.router.navigate(['layout/view/revenue'])
        }
      })
    }

  }



  getRouteId() {
    this.activatedRoute.params.subscribe(params => {
      this.routeId = params['id'];
    });
  }

  getById() {
    this.revenueService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.revenueDto = res;
        this.revenueDto.status = res.status 

      }
    })
  }
  back() {
    window.history.go(-1);
  }
  status = []
  getStatus(){
    this.status=this.enumService.status
  }
}
