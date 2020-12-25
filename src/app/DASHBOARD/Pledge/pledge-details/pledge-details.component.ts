import { PledgeService } from './../../../../services/pledge.service';
import { Pledge } from './../../../../models/pledge';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pledge-details',
  templateUrl: './pledge-details.component.html',
  styleUrls: ['./pledge-details.component.css']
})
export class PledgeDetailsComponent implements OnInit {

 
  pledgeDto: Pledge = new Pledge();
  routeId:any=undefined;
  constructor(private pledgeService: PledgeService, private router: Router, private activatedRoute: ActivatedRoute) { }

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
    this.pledgeService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.pledgeDto = res;       
      }
    })
  }


  back(){
    window.history.go(-1);
  }
}
