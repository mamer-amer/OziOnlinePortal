import { DatePipe } from '@angular/common';
import { EnumService } from './../../../../services/enum.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from './../../../../services/member.service';

import { Component, OnInit } from '@angular/core';
import { Member } from 'src/models/member';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})
export class CreateMemberComponent implements OnInit {

  memberDto: Member = new Member();
  
  membersList = [];
  routeId: any = undefined;
  constructor(private memberService: MemberService, private router: Router, private activatedRoute: ActivatedRoute, private toastService: ToastrService, private enumService: EnumService,private datePipe:DatePipe) { }
  moduleId:any;
  ngOnInit(): void {
    this.activatedRoute
    .queryParams
    .subscribe((params)=> {

      this.moduleId = params['moduleId'];

    });
    this.getRouteId();
    this.getGender();
    this.getFamilyPosition();
    this.getmaritalStatus();
    this.getPrivacyLevel();
    this.getMembershipStatus();
    if (this.routeId != undefined) {
      this.getById();
    }


  }


  save() {

    if (this.routeId == undefined) {
      this.memberService.create(this.memberDto).subscribe(res => {
        if (res) {
          this.toastService.success('Successfully Added')
          this.router.navigate(['layout/view/member'],{queryParams:{moduleId:this.moduleId}})
        }
      })
    }
    else {
      this.memberService.update(this.memberDto).subscribe(res => {
        if (res) {
          this.toastService.success('Successfully Updated')

          this.router.navigate(['layout/view/member'],{queryParams:{moduleId:this.moduleId}})
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
    this.memberService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.memberDto = res;
        this.memberDto.anniversary = this.datePipe.transform(res.anniversary,'yyyy-MM-dd');
      }
    })
  }
  back(){
    window.history.go(-1);
  }

  status = []
  getStatus() {
    this.status = this.enumService.status;
  }

  gender = []
  getGender(){
    this.gender = this.enumService.gender;
  }
  membershipStatus = []
  getMembershipStatus(){
    this.membershipStatus = this.enumService.membershipStatus;
  }
  maritalStatus = []
  getmaritalStatus(){
    this.maritalStatus = this.enumService.maritalStatus;
  }
  familyPosition = []
  getFamilyPosition(){
    this.familyPosition = this.enumService.familyPosition;
  }
  privacyLevel = []
  getPrivacyLevel(){
    this.privacyLevel = this.enumService.privacyLevel;
  }

}
