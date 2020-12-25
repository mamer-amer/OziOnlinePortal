import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedLibsModule } from './../Shared/shared-libs/shared-libs.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';

import { LayoutRoutingModule } from './layout-routing.module';
import { CreateCheckComponent } from './Checks/create-check/create-check.component';
import { CheckDetailsComponent } from './Checks/check-details/check-details.component';
import { CheckViewAllComponent } from './Checks/check-view-all/check-view-all.component';
import { LicenseDetailsComponent } from './License/license-details/license-details.component';
import { LicenseViewAllComponent } from './License/license-view-all/license-view-all.component';
import { CreateLicenseComponent } from './License/create-license/create-license.component';
import { RevenueDetailsComponent } from './Revenue/revenue-details/revenue-details.component';
import { RevenueViewAllComponent } from './Revenue/revenue-view-all/revenue-view-all.component';
import { CreateRevenueComponent } from './Revenue/create-revenue/create-revenue.component';
import { StaffDetailsComponent } from './Staff/staff-details/staff-details.component';
import { StaffViewAllComponent } from './Staff/staff-view-all/staff-view-all.component';
import { CreateStaffComponent } from './Staff/create-staff/create-staff.component';
import { CompaignViewAllComponent } from './Compaigns/compaign-view-all/compaign-view-all.component';
import { CreateCompaignComponent } from './Compaigns/create-compaign/create-compaign.component';
import { CompaignDetailsComponent } from './Compaigns/compaign-details/compaign-details.component';
import { ContributionDetailsComponent } from './Contribution/contribution-details/contribution-details.component';
import { ContributionViewAllComponent } from './Contribution/contribution-view-all/contribution-view-all.component';
import { CreateContributionComponent } from './Contribution/create-contribution/create-contribution.component';
import { CreateFundTypeComponent } from './FundTypes/create-fund-type/create-fund-type.component';
import { FundTypeViewAllComponent } from './FundTypes/fund-type-view-all/fund-type-view-all.component';
import { FundTypeDetailsComponent } from './FundTypes/fund-type-details/fund-type-details.component';
import { PledgeDetailsComponent } from './Pledge/pledge-details/pledge-details.component';
import { PledgeViewAllComponent } from './Pledge/pledge-view-all/pledge-view-all.component';
import { CreatePledgeComponent } from './Pledge/create-pledge/create-pledge.component';
import { GroupViewAllComponent } from './Group/group-view-all/group-view-all.component';
import { GroupDetailsComponent } from './Group/group-details/group-details.component';
import { CreateGroupComponent } from './Group/create-group/create-group.component';
import { CreateMemberComponent } from './Member/create-member/create-member.component';
import { MemberDetailsComponent } from './Member/member-details/member-details.component';
import { MemberViewAllComponent } from './Member/member-view-all/member-view-all.component';


@NgModule({
  declarations: [
    LayoutComponent,
    CreateCheckComponent, CheckDetailsComponent,
    CheckViewAllComponent, LicenseDetailsComponent,
    LicenseViewAllComponent, CreateLicenseComponent,
    RevenueDetailsComponent, RevenueViewAllComponent,
    CreateRevenueComponent, StaffDetailsComponent,
    StaffViewAllComponent, CreateStaffComponent, CompaignViewAllComponent, CreateCompaignComponent, CompaignDetailsComponent, ContributionDetailsComponent, ContributionViewAllComponent, CreateContributionComponent, CreateFundTypeComponent, FundTypeViewAllComponent, FundTypeDetailsComponent, PledgeDetailsComponent, PledgeViewAllComponent, CreatePledgeComponent, GroupViewAllComponent, GroupDetailsComponent, CreateGroupComponent, CreateMemberComponent, MemberDetailsComponent, MemberViewAllComponent],
  imports: [

    CommonModule,
    LayoutRoutingModule,
    SharedLibsModule

  ]
})
export class LayoutModule { }
