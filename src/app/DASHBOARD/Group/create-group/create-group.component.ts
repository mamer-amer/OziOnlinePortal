import { MemberService } from './../../../../services/member.service';
import { GroupService } from './../../../../services/group.service';
import { Group } from './../../../../models/group';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnumService } from 'src/services/enum.service';
import {  IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit,AfterViewInit {
  groupDto: Group = new Group();
  membersList = [];
  routeId: any = undefined;
  dropdownList= [];
  selectedItems : SelectedMember[]= [];
  dropdownSettings : IDropdownSettings  = {};
 
  constructor(private groupService: GroupService, private memberService: MemberService, private router: Router, private activatedRoute: ActivatedRoute, private toastService: ToastrService, private enumService: EnumService) { }
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }
  moduleId:any;
  ngOnInit(): void {
    this.getRouteId();
    this.activatedRoute
    .queryParams
    .subscribe((params)=> {
      this.moduleId = params['moduleId'];
    });
    this.getStatus();

    this.dropdownSettings= {
      singleSelection: false,
      idField: "memberId",
      textField: "name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 10,
      allowSearchFilter: true,
      limitSelection: 100
    };
    

    if (this.routeId != undefined) {
      this.getById();
    }

    if(this.routeId==undefined){

      this.getMembers();
    }
  }


  save() {

    if (this.routeId == undefined) {
      this.groupService.create(this.groupDto).subscribe(res => {
        if (res) {
          this.toastService.success('Successfully Added')
          this.router.navigate(['layout/view/group'],{queryParams:{moduleId:this.moduleId}})
        }
      })
    }
    else {
      this.groupService.update(this.groupDto).subscribe(res => {
        if (res) {
          this.toastService.success('Successfully Updated')

          this.router.navigate(['layout/view/group'],{queryParams:{moduleId:this.moduleId}})
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
    this.groupService.getById(this.routeId).subscribe(res1 => {
      if (res1) {
        this.groupDto = res1;
        let temp = [];
       
        this.memberService.getAll().subscribe(res2 => {
          this.membersList = res2;

          if(this.membersList!=null){
            res1.memberIds.forEach(id=>{
              const index = this.showSelected(id);
                if(index != -1){
                    temp.push(this.membersList[index]);
                   
                }
            });
              this.selectedItems = temp;

            
            
          }
        })


       
        //extract name from members and id from members ids;
        
      }
    })
  }

  // index = -1;
  showSelected = (id) : number =>{
     const index = this.membersList.findIndex(member=>member.memberId ==id);
     return index;
  }
  back(){
    window.history.go(-1);
  }

  status = []
  getStatus() {
    this.status = this.enumService.status
    this.groupDto.status = 0;
    
  }

  getMembers() {
    this.memberService.getAll().subscribe(res => {
      this.membersList = res;
    })
  }

  onItemSelect(item: any) {
    console.log(item);
    //select on member
    let id = item.memberId;
    this.groupDto.memberIds.push(id);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onItemDeSelect(items: any) {
  
      this.groupDto.memberIds = this.groupDto.memberIds.filter(item=>item !=items.memberId)
  }


}


export class SelectedMember{
  memberId : number = 0;
  name : string = '';
}