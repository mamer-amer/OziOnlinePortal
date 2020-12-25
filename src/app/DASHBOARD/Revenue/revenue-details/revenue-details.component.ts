import { RevenueService } from './../../../../services/revenue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Revenue } from './../../../../models/revenue';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-revenue-details',
  templateUrl: './revenue-details.component.html',
  styleUrls: ['./revenue-details.component.css']
})
export class RevenueDetailsComponent implements OnInit {

  revenueDto: Revenue = new Revenue();
  routeId:any=undefined;
  constructor(private revenueService: RevenueService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRouteId();
    
  }

  getRouteId() {
    this.activatedRoute.params.subscribe(params => {
      this.routeId = params['id'];
      this.getRevenueById();
    });
  }

  getRevenueById() {
    this.revenueService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.revenueDto.name = res.name;
        this.revenueDto.code = res.code;
        this.revenueDto.status = res.status 
        this.revenueDto.revenueId = res.revenueId;
      }
    })
  }


  back(){
    window.history.go(-1);
  }
}
