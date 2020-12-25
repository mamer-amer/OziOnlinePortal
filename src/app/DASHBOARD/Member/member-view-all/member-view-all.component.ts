import { CommonService } from './../../../Shared/shared-libs/Common.service';
import { Member } from './../../../../models/member';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from './../../../../services/member.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-view-all',
  templateUrl: './member-view-all.component.html',
  styleUrls: ['./member-view-all.component.css']
})
export class MemberViewAllComponent implements OnInit {

  members: any = [];
  constructor(private memberService: MemberService, private router: Router, private activatedRoute: ActivatedRoute, private commonService: CommonService) { }
  popoverTitle = 'Delete';
  popoverMessage = 'Are you sure you want to delete this?';
  confirmClicked = false;
  cancelClicked = false;
  sub;
  moduleAction: any = [];
  isCreate = false;
  isEdit = false;
  isView = false;
  isDelete = false;
  userType = sessionStorage.getItem('userType');
  moduleId:any;
  ngOnInit(): void {
    this.sub = this.activatedRoute
      .queryParams
      .subscribe((params) => {

        this.moduleId =  params['moduleId'];

        //only if not license
        if (this.userType == '1') {
          // Defaults to 0 if no query param provided.
          console.log("PARAMS HERE", params['moduleId']);
          this.moduleAction = this.commonService.getModuleAuthroties(params['moduleId']);
          console.log("these are the modules actions ", this.moduleAction);

          for (var data of this.moduleAction) {
            if (data.actionId == 1) {
              this.isCreate = true;
            }
            if (data.actionId == 2) {
              this.isEdit = true;
            }
            if (data.actionId == 3) {
              this.isView = true;
            }
            if (data.actionId == 4) {
              this.isDelete = true;
            }
          }

        }

      else{
      //admin case
      this.isCreate = true;
      this.isEdit = true;
      this.isView = true;
      this.isDelete = true;
    }

    });
    this.getAll();
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getAll() {
    this.memberService.getAll().subscribe(res => {
      if (res) {
        this.members = res;
      }

    })
  }

  goToCreate() {
    this.router.navigate(['layout/create/member'],{queryParams:{moduleId:this.moduleId}})
  }

  edit(obj: Member) {
    this.router.navigate(['layout/edit/member/' + obj.memberId],{queryParams:{moduleId:this.moduleId}})
  }
  delete(obj: Member) {
    this.confirmClicked = true;
    if (this.confirmClicked) {
      this.memberService.delete(obj.memberId).subscribe(res => {
        if (res) {
          this.getAll();
        }
        console.log("Response of delete is ", res)
      })
    }


  }
  details(obj: Member) {

    this.router.navigate(['layout/details/member/' + obj.memberId])
  }
}
