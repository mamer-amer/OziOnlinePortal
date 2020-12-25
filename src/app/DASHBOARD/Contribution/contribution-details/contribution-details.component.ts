import { ContributionService } from './../../../../services/contribution.service';
import { Contribution } from './../../../../models/contribution';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contribution-details',
  templateUrl: './contribution-details.component.html',
  styleUrls: ['./contribution-details.component.css']
})
export class ContributionDetailsComponent implements OnInit {

  
  contributionDto: Contribution = new Contribution();
  routeId:any=undefined;
  constructor(private contribtuionService: ContributionService, private router: Router, private activatedRoute: ActivatedRoute) { }

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
    this.contribtuionService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.contributionDto = res;       
      }
    })
  }


  back(){
    window.history.go(-1);
  }

}
