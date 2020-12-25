import { EnumService } from './../../../../services/enum.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckService } from './../../../../services/check.service';
import { Check } from './../../../../models/checks';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-check',
  templateUrl: './create-check.component.html',
  styleUrls: ['./create-check.component.css']
})
export class CreateCheckComponent implements OnInit {

  checkDto: Check = new Check();
  routeId: any = undefined;
  constructor(private checkService: CheckService, private router: Router, private activatedRoute: ActivatedRoute,private toastService:ToastrService,private enumService:EnumService) { }
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
    // this.checkDto.Status == true ? this.checkDto.Status = 0 : this.checkDto.Status = 1;
    if (this.routeId == undefined) {
      this.checkService.create(this.checkDto).subscribe(res => {
        if (res) {
          this.toastService.success('Successfully Added')
          this.router.navigate(['layout/view/checks'])
        }
      })
    }
    else {
      this.checkService.update(this.checkDto).subscribe(res => {
        if (res) {
          this.toastService.success('Successfully Updated')

          this.router.navigate(['layout/view/checks'])
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

  status = []
  getStatus(){
    this.status=this.enumService.status
  }
}