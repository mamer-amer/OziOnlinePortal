import { Member } from './../../../../models/member';
import { MemberService } from './../../../../services/member.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  memberDto:any;
  routeId:any=undefined;
  constructor(private memberService: MemberService, private router: Router, private activatedRoute: ActivatedRoute,private datePipe:DatePipe) { }

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
    this.memberService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.memberDto = res;
        // this.memberDto = res;
        // this.memberDto.status = res.status 
        // this.memberDto.Name = res.name;
        // this.memberDto.Code = res.code;
        // this.memberDto.ContributionId = res.contributionId;
        // this.memberDto.EndDateTime = this.datePipe.transform(res.endDateTime,'yyyy-MM-dd');
        // this.memberDto.StartDateTime = this.datePipe.transform(res.startDateTime,'yyyy-MM-dd');
        // this.memberDto.VisibleDateTime = this.datePipe.transform(res.visibleDateTime,'yyyy-MM-dd');
        // this.memberDto.createdDateTime = this.datePipe.transform(res.createdDateTime,'yyyy-MM-dd');
        // this.memberDto.updatedDate =this.datePipe.transform(res.updatedDateTime,'yyyy-MM-dd');    
      }
    })
  }


  back(){
    window.history.go(-1);
  }
}
