import { DatePipe } from '@angular/common';
import { CompaignService } from './../../../../services/compaign.service';
import { Compaign } from './../../../../models/compaign';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-compaign-details',
  templateUrl: './compaign-details.component.html',
  styleUrls: ['./compaign-details.component.css']
})
export class CompaignDetailsComponent implements OnInit {

  compaignDto: Compaign = new Compaign();
  routeId:any=undefined;
  constructor(private compaignService: CompaignService, private router: Router, private activatedRoute: ActivatedRoute,private datePipe:DatePipe) { }

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
    this.compaignService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.compaignDto = res;
        this.compaignDto = res;
        this.compaignDto.status = res.status 
        this.compaignDto.campaignGoal = res.campaignGoal;
        this.compaignDto.fundTypeId = res.fundTypeId;
        this.compaignDto.EndDateTime = this.datePipe.transform(res.endDateTime,'yyyy-MM-dd');
        this.compaignDto.StartDateTime = this.datePipe.transform(res.startDateTime,'yyyy-MM-dd');
        this.compaignDto.VisibleDateTime = this.datePipe.transform(res.visibleDateTime,'yyyy-MM-dd');
        this.compaignDto.createdDateTime = this.datePipe.transform(res.createdDateTime,'yyyy-MM-dd');
        this.compaignDto.updatedDate =this.datePipe.transform(res.updatedDateTime,'yyyy-MM-dd');    
      }
    })
  }


  back(){
    window.history.go(-1);
  }

}
