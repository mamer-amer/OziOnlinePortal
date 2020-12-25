import { EnumService } from './../../../../services/enum.service';
import { ToastrService } from 'ngx-toastr';
import { License } from './../../../../models/license';
import { LicenseService } from './../../../../services/license.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-license',
  templateUrl: './create-license.component.html',
  styleUrls: ['./create-license.component.css']
})
export class CreateLicenseComponent implements OnInit {


  licenseDto: License = new License();
  routeId: any = undefined;
  constructor(private licenseService: LicenseService, private router: Router, private activatedRoute: ActivatedRoute,private enumService:EnumService,
    private toastService:ToastrService
    ) { }

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
    // this.licenseDto.status == true ? this.licenseDto.status = 0 : this.licenseDto.status = 1;
    if (this.routeId == undefined) {
      this.licenseService.create(this.licenseDto).subscribe(res => {
        if (res) {
          this.toastService.success('Successfully Added')
          this.router.navigate(['layout/view/license'],{queryParams:{moduleId:this.moduleId}})
        }
        else{
          this.toastService.error('Unsuccessfull')
 
        }
      }),error=>this.toastService.error(error);
    }
    else {
      this.licenseService.update(this.licenseDto).subscribe(res => {
        if (res) {
          this.toastService.success('Successfully Updated');
          this.router.navigate(['layout/view/license'],{queryParams:{moduleId:this.moduleId}})
        }
        else{
          this.toastService.error('Unsuccessfull')

        }
      }),error=>this.toastService.error(error);
    }

  }



  getRouteId() {
    this.activatedRoute.params.subscribe(params => {
      this.routeId = params['id'];
    });
  }

  getById() {
    this.licenseService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.licenseDto = res;
        this.licenseDto.status = res.status 
       
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
