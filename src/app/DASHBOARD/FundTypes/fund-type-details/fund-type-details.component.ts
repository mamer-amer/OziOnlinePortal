import { Router, ActivatedRoute } from '@angular/router';
import { FundService } from './../../../../services/fund.service';
import { FundType } from './../../../../models/fundType';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fund-type-details',
  templateUrl: './fund-type-details.component.html',
  styleUrls: ['./fund-type-details.component.css']
})
export class FundTypeDetailsComponent implements OnInit {

  fundTypeDto: FundType = new FundType();
  routeId:any=undefined;
  constructor(private fundService: FundService, private router: Router, private activatedRoute: ActivatedRoute) { }

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
    this.fundService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.fundTypeDto.fundTypeId = res.fundTypeId
        this.fundTypeDto.name = res.name;
        this.fundTypeDto.Code = res.code;
        this.fundTypeDto.comment = res.commnet;
        this.fundTypeDto.status = res.status==0?true:false;
      }
    })
  }


  back(){
    window.history.go(-1);
  }

}
