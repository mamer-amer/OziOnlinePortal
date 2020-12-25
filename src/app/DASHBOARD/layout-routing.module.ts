import { AuthGuard } from 'src/auth.guard';
import { PledgeDetailsComponent } from './Pledge/pledge-details/pledge-details.component';
import { CreatePledgeComponent } from './Pledge/create-pledge/create-pledge.component';
import { PledgeViewAllComponent } from './Pledge/pledge-view-all/pledge-view-all.component';
import { CompaignDetailsComponent } from './Compaigns/compaign-details/compaign-details.component';
import { CreateCompaignComponent } from './Compaigns/create-compaign/create-compaign.component';
import { CompaignViewAllComponent } from './Compaigns/compaign-view-all/compaign-view-all.component';
import { ContributionDetailsComponent } from './Contribution/contribution-details/contribution-details.component';
import { CreateContributionComponent } from './Contribution/create-contribution/create-contribution.component';
import { ContributionViewAllComponent } from './Contribution/contribution-view-all/contribution-view-all.component';
import { FundTypeDetailsComponent } from './FundTypes/fund-type-details/fund-type-details.component';
import { CreateFundTypeComponent } from './FundTypes/create-fund-type/create-fund-type.component';
import { FundTypeViewAllComponent } from './FundTypes/fund-type-view-all/fund-type-view-all.component';
import { LicenseDetailsComponent } from './License/license-details/license-details.component';
import { CreateLicenseComponent } from './License/create-license/create-license.component';
import { LicenseViewAllComponent } from './License/license-view-all/license-view-all.component';
import { RevenueDetailsComponent } from './Revenue/revenue-details/revenue-details.component';
import { CreateRevenueComponent } from './Revenue/create-revenue/create-revenue.component';
import { RevenueViewAllComponent } from './Revenue/revenue-view-all/revenue-view-all.component';
import { StaffDetailsComponent } from './Staff/staff-details/staff-details.component';
import { CreateStaffComponent } from './Staff/create-staff/create-staff.component';
import { StaffViewAllComponent } from './Staff/staff-view-all/staff-view-all.component';
import { CheckDetailsComponent } from './Checks/check-details/check-details.component';
import { CreateCheckComponent } from './Checks/create-check/create-check.component';
import { CheckViewAllComponent } from './Checks/check-view-all/check-view-all.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberDetailsComponent } from './Member/member-details/member-details.component';
import { CreateMemberComponent } from './Member/create-member/create-member.component';
import { MemberViewAllComponent } from './Member/member-view-all/member-view-all.component';
import { GroupViewAllComponent } from './Group/group-view-all/group-view-all.component';
import { CreateGroupComponent } from './Group/create-group/create-group.component';
import { GroupDetailsComponent } from './Group/group-details/group-details.component';

const routes: Routes = [
  {
        path : '',
        canActivate:[AuthGuard],
        component : LayoutComponent,
        children:[
        {
          path:'view/checks',
          component:CheckViewAllComponent
        },
        {
          path:'create/checks',
          component:CreateCheckComponent
        },
        {
          path:'edit/checks/:id',
          component:CreateCheckComponent
        },
        {
          path:'details/checks/:id',
          component:CheckDetailsComponent
        },
        {
          path:'view/staff',
          component:StaffViewAllComponent
        },
        {
          path:'create/staff',
          component:CreateStaffComponent
        },
        {
          path:'edit/staff/:id',
          component:CreateStaffComponent
        },
        {
          path:'details/staff/:id',
          component:StaffDetailsComponent
        },
        {
          path:'view/revenue',
          component:RevenueViewAllComponent
        },
        {
          path:'create/revenue',
          component:CreateRevenueComponent
        },
        {
          path:'edit/revenue/:id',
          component:CreateRevenueComponent
        },
        {
          path:'details/revenue/:id',
          component:RevenueDetailsComponent
        },
        {
          path:'view/license',
          component:LicenseViewAllComponent
        },
        {
          path:'create/license',
          component:CreateLicenseComponent
        },
        {
          path:'edit/license/:id',
          component:CreateLicenseComponent
        },
        {
          path:'details/license/:id',
          component:LicenseDetailsComponent
        },


        //other four dependent cruds
        {
          path:'view/fundTypes',
          component:FundTypeViewAllComponent
        },
        {
          path:'create/fundTypes',
          component:CreateFundTypeComponent
        },
        {
          path:'edit/fundTypes/:id',
          component:CreateFundTypeComponent
        },
        {
          path:'details/fundTypes/:id',
          component:FundTypeDetailsComponent
        },
        {
          path:'view/contributions',
          component:ContributionViewAllComponent
        },
        {
          path:'create/contributions',
          component:CreateContributionComponent
        },
        {
          path:'edit/contributions/:id',
          component:CreateContributionComponent
        },
        {
          path:'details/contributions/:id',
          component:ContributionDetailsComponent
        },
        {
          path:'view/compaigns',
          component:CompaignViewAllComponent
        },
        {
          path:'create/compaigns',
          component:CreateCompaignComponent
        },
        {
          path:'edit/compaigns/:id',
          component:CreateCompaignComponent
        },
        {
          path:'details/compaigns/:id',
          component:CompaignDetailsComponent
        },
        {
          path:'view/pledge',
          component:PledgeViewAllComponent
        },
        {
          path:'create/pledge',
          component:CreatePledgeComponent
        },
        {
          path:'edit/pledge/:id',
          component:CreatePledgeComponent
        },
        {
          path:'details/pledge/:id',
          component:PledgeDetailsComponent
        },
        //group
        {
          path:'view/group',
          component:GroupViewAllComponent
        },
        {
          path:'create/group',
          component:CreateGroupComponent
        },
        {
          path:'edit/group/:id',
          component:CreateGroupComponent
        },
        {
          path:'details/group/:id',
          component:GroupDetailsComponent
        },
        {
          path:'view/member',
          component:MemberViewAllComponent
        },
        {
          path:'create/member',
          component:CreateMemberComponent
        },
        {
          path:'edit/member/:id',
          component:CreateMemberComponent
        },
        {
          path:'details/member/:id',
          component:MemberDetailsComponent
        },


      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
