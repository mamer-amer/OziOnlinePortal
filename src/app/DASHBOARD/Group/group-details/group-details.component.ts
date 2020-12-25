import { Router, ActivatedRoute } from '@angular/router';
import { GroupService } from './../../../../services/group.service';
import { Group } from './../../../../models/group';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {

  dto: Group = new Group();
  routeId:any=undefined;
  constructor(private groupService: GroupService, private router: Router, private activatedRoute: ActivatedRoute) { }

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
    this.groupService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.dto = res;
      }
    })
  }


  back(){
    window.history.go(-1);
  }
}
