import { Check } from './../../../../models/checks';
import { element } from 'protractor';
import { map } from 'rxjs/operators';
import { ModuleAction } from './../../../../models/moduleActions';
import { GroupService } from './../../../../services/group.service';
import { CommonService } from './../../../Shared/shared-libs/Common.service';
import { EnumService } from './../../../../services/enum.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StaffService } from './../../../../services/staff.service';
import { Staff } from './../../../../models/staff';
import { Component, OnInit } from '@angular/core';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { resolve } from 'dns';
import { reject } from 'lodash';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css']
})
export class CreateStaffComponent implements OnInit {


  staffDTO: Staff = new Staff();
  groups = [];
  routeId: any = undefined;
  items: any = []
  dropdownEnabled = true;
  moduleActions: any = [];
  values: number[];
  moduleId: any;
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: false,

    decoupleChildFromParent: false,
    maxHeight: 200
  });



  constructor(private staffService: StaffService, private groupService: GroupService, private router: Router, private activatedRoute: ActivatedRoute, private enumService: EnumService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.getStatus();
    this.getGroups();
    this.getRouteId().then(res => {
      console.log(res);
    });
    this.activatedRoute
      .queryParams
      .subscribe((params) => {

        this.moduleId = params['moduleId'];

      });



    // this.getModules();







  }

  onSelectedChange(value: any): void {

    console.log("THESE ARE THE moudules", value)
    this.moduleActions = [];
    value.map(module => {

      let moduleActionNoted: ModuleAction = new ModuleAction();
      moduleActionNoted.moduleId = Number(module.split('_')[0]);
      moduleActionNoted.actionId = Number(module.split('_')[1]);
      this.moduleActions.push(moduleActionNoted);
    });

  }


  save() {

    let postDto : Staff = new Staff();

    this.staffDTO.moduleActionModels = this.moduleActions;
    this.staffDTO.groupId = Number(this.staffDTO.groupId);
    this.staffDTO.status = Number(this.staffDTO.status);
    postDto.name = this.staffDTO.name;
    postDto.code = this.staffDTO.code;
    postDto.email = this.staffDTO.email;
    postDto.dataStatus = this.staffDTO.dataStatus;
    postDto.groupId = this.staffDTO.groupId;
    postDto.moduleActionModels = this.moduleActions;
    postDto.createdDate = this.staffDTO.createdDate;
    postDto.licenseManagementId = this.staffDTO.licenseManagementId;
    postDto.lastLoginDate = this.staffDTO.lastLoginDate;
    postDto.lastManagedBy = this.staffDTO.lastManagedBy;
    postDto.lastManagedDate = this.staffDTO.lastManagedDate;
    postDto.phoneNumber = this.staffDTO.phoneNumber;
    postDto.staffId = this.staffDTO.staffId;
    postDto.status = this.staffDTO.status;
    postDto.title = this.staffDTO.title;
    if (this.routeId == undefined) {
      this.staffService.create(this.staffDTO).subscribe(res => {
        if (res) {
          this.router.navigate(['layout/view/staff'], { queryParams: { moduleId: this.moduleId } })
        }
      });
    }
    else {
      this.staffService.update(postDto).subscribe(res => {
        if (res) {
          this.router.navigate(['layout/view/staff'], { queryParams: { moduleId: this.moduleId } })
        }
      });
    }

  }



  getRouteId(): any {

    return new Promise((resolve, reject) => {
      this.activatedRoute.params.subscribe(params => {
        this.routeId = params['id'];
        if (this.routeId > 0) {
          resolve(true);
          this.getById(this.routeId);

        }
        else {
          resolve(false);
          this.items = this.commonService.getParents();

        }
      })
    });
  }

  getById(routeId) {
    this.staffService.getById(routeId).subscribe(res => {
      if (res) {
        this.staffDTO = res;
        
        let temp = []
        temp = res.moduleActions
        let allModules = JSON.parse(localStorage.getItem('allModules'));
        //compare 
        allModules.forEach(element => {

          let isPresent = temp.find(m => m.moduleId == element.moduleId)
          if (isPresent == undefined) {
            //push four times;
            this.enumService.actions.forEach(action => {
              temp.push({ moduleId: element.moduleId, actionId: action.id, checked: 0 })
            })

          }
        });


        this.getTreeStructure(temp).then(res => {
          this.items = [];
          this.items = res;

        });

        this.staffDTO.status = res.status;
      }
    });
  }
  back() {
    window.history.go(-1);
  }

  status = []
  getStatus() {
    this.status = this.enumService.status
  }


  // modules = [];
  // getModules() {
  //   this.commonService.getModules().subscribe(res => {
  //     this.modules = res;
  //     localStorage.setItem('allModules',JSON.stringify(this.modules));
  //     console.log("These are the modules",this.modules)


  //   })
  // }
  getGroups() {
    this.groupService.getAll().subscribe(res => {
      this.groups = res;
    })
  }

  assignedMoules: any = [];
  getTreeStructure(treeArray): Promise<any> {
    let child = [];
    let action = {}

    return new Promise((resolve, reject) => {
      treeArray.map(x => {
        let index = this.assignedMoules.findIndex(e => e.value == x.moduleId);
        action = new TreeviewItem({
          'text': this.getActionName(x.actionId),
          'value': x.moduleId + '_' + x.actionId

        });
        if (index != -1) {

          this.assignedMoules[index]['internalChildren'].push(action);
          if (x.checked != undefined && x.checked == 0) {
            this.assignedMoules[index]['internalChildren'].forEach(l => l.internalChecked = false);

          }

        }

        //not present
        else {
          child = [];
          child.push(action);

          let obj = new TreeviewItem({
            text: this.getModuleName(x.moduleId),
            value: x.moduleId,
            collapsed: false,
            children: child,
            checked: true,
          });
          if (x.checked != undefined && x.checked == 0) {
            obj.internalChecked = false;
            obj.children.forEach(l => l.internalChecked = false);
          }
          this.assignedMoules.push(obj);
        }
      });

      resolve(this.assignedMoules);
    })

  }

  getModuleName(id) {
    let modules = []
    modules = JSON.parse(localStorage.getItem('allModules'));
    let name = "";
    return name = modules.find(t => t.moduleId == id).name;
  }

  getActionName(id) {
    return this.enumService.actions.find(action => action.id == id).name
  }


}

