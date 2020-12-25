import { Check } from './../../../../models/checks';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckService } from 'src/services/check.service';

@Component({
  selector: 'app-check-details',
  templateUrl: './check-details.component.html',
  styleUrls: ['./check-details.component.css']
})
export class CheckDetailsComponent implements OnInit {
  checkDto: Check = new Check();
  routeId:any=undefined;
  constructor(private checkService: CheckService, private router: Router, private activatedRoute: ActivatedRoute) { }

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
    this.checkService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.checkDto.Name = res.name;
        this.checkDto.Code = res.code;
        this.checkDto.Status = res.status 
        this.checkDto.checkId = res.checkId;
      }
    })
  }


  back(){
    window.history.go(-1);
  }
}
