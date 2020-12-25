import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor() { }
  userType = Number(sessionStorage.getItem('userType'));

  contributionTypes  = [
    {name:'Check',id:1},
    {name:'Cash',id:2},
    {name:'Other',id:3},
  ]

  paymentTypes   = [
    {name:'CashGift',id:1},
    {name:'LooseCash',id:2},
  ]

  frequencies  = [
    {name:'Weekly',id:1},
    {name:'EveryTwoWeeks',id:2},
    {name:'Monthly',id:3},
    {name:'Quarterly',id:4},
  ]

  status = [
    {name:'Active',id:0},
    {name:'InActive',id:1}
  ]
  errors = [
    { message: "NoLicense", code: "LNF" },
    { message: "NoStaff", code: "SNF" },
    { message: "NoCheck", code: "CNF" },
    { message: "NoRevenue", code: "RNF" },
    { message: "NoFundType", code: "FTNF" },
    { message: "NoContribution", code: "CBNF" },
    { message: "NoCampaign", code: "CMNF" },
    { message: "NoPledge", code: "PNF" },
    { message: "CodeExist", code: "CE" }
  ]

  permissionDetail = [
  {name:''}
  ]
  actions = [
    {name:'Add',id:1},
    {name:'Edit',id:2},
    {name:'View',id:3},
    {name:'Delete',id:4},
  ]
  userTypes = [
  
      {name:'Admin',id:0},
      {name:'Staff',id:1},
    
  ]

  gender = [
    {name:'Male',id:0},
    {name:'Female',id:1},
    {name:'TransGender',id:2},
  ]

  familyPosition = [
    {name:'Head',id:0},
    {name:'Spouse',id:1},
    {name:'Child',id:2},
    {name:'Relative',id:3},
    {name:'Others',id:4},
  ]

  membershipStatus = [
    {name:'Member',id:0},
    {name:'Guest',id:1},
    {name:'NewConverts',id:2},
    
  ]
  maritalStatus = [
    {name:'Married',id:0},
    {name:'Windowed',id:1},
    {name:'Separated',id:2},
    {name:'Divorced',id:3},
    {name:'Single',id:4},

    
  ]
  privacyLevel = [
    {name:'EveryOne',id:0},
    {name:'GroupMembers',id:1},
    {name:'Leaders',id:2},
    {name:'Staff',id:3},
  

    
  ]

  


}
