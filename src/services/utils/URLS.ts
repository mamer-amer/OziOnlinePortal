import { environment } from "src/environments/environment";
export class API_URLS {
    public url = environment.BASE_URL;
   public OAUTH_TOKEN = this.url + 'oauth2/Token';
   public OAUTH_VERIFY = this.url + 'oauth2/Verify';

   public GET_CHECKS  = this.url + 'Checks';
   public SAVE_CHECK  = this.url + 'Checks';
   public GET_CHECK_BY_ID = this.url + 'Checks'
   public DELELTE_CHECK_BY_ID = this.url+'Checks'
   
   public GET_LICENSES = this.url + 'LicenseManagements';
   public GET_LICENSE_BY_ID = this.url + 'LicenseManagements';
   public SAVE_LICENSE  = this.url + 'LicenseManagements';
   public UPDATE_LICENSE = this.url  + 'LicenseManagements';
   public DELETE_LICENSE  = this.url + 'LicenseManagements';


   public GET_STAFFS = this.url + 'Staffs';
   public GET_STAFF_BY_ID = this.url + 'Staffs';
   public SAVE_STAFF  = this.url + 'Staffs';
   public UPDATE_STAFF = this.url  + 'Staffs';
   public DELETE_STAFF_BY_ID  = this.url + 'Staffs';

    
   public GET_REVENUES = this.url + 'Revenues';
   public GET_REVENUE_BY_ID = this.url + 'Revenues';
   public SAVE_REVENUE  = this.url + 'Revenues';
   public UPDATE_REVENUE = this.url  + 'Revenues';
   public DELETE_REVENUE  = this.url + 'Revenues';


   public GET_COMPAIGNS  = this.url + 'Campaigns';
   public SAVE_CAMPAIGN  = this.url + 'Campaigns';
   public GET_COMPAIGN_BY_ID = this.url + 'Campaigns'
   public DELELTE_COMPAIGN_BY_ID = this.url+'Campaigns'
   
   public GET_FUNDTYPES = this.url + 'FundTypes';
   public GET_FUNDTYPES_BY_ID = this.url + 'FundTypes';
   public SAVE_FUNDTYPES  = this.url + 'FundTypes';
   public UPDATE_FUNDTYPES = this.url  + 'FundTypes';
   public DELETE_FUNDTYPES_BY_ID  = this.url + 'FundTypes';


   public GET_Contributions = this.url + 'Contributions';
   public GET_Contributions_BY_ID = this.url + 'Contributions';
   public SAVE_Contributions  = this.url + 'Contributions';
   public UPDATE_Contributions = this.url  + 'Contributions';
   public DELETE_Contributions_BY_ID  = this.url + 'Contributions';

    
   public GET_PLEDGES = this.url + 'Pledges';
   public GET_PLEDGES_BY_ID = this.url + 'Pledges';
   public SAVE_PLEDGES  = this.url + 'Pledges';
   public UPDATE_PLEDGES = this.url  + 'Pledges';
   public DELETE_PLEDGES_BY_ID  = this.url + 'Pledges';


   public GET_GROUP = this.url + 'Groups';
   public GET_GROUP_BY_ID = this.url + 'Groups';
   public SAVE_GROUP  = this.url + 'Groups';
   public UPDATE_GROUP = this.url  + 'Groups';
   public DELETE_GROUP_BY_ID  = this.url + 'Groups';
   
   public GET_MODULES = this.url + 'Modules';

   public GET_STAFF_MODULES = this.GET_STAFF_BY_ID;

   public GET_MEMBER = this.url + 'Members';
   public GET_MEMBER_BY_ID = this.url + 'Members';
   public SAVE_MEMBER  = this.url + 'Members';
   public UPDATE_MEMBER = this.url  + 'Members';
   public DELETE_MEMBER_BY_ID  = this.url + 'Members';

}

