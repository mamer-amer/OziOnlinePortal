
export class License {
    licenseManagementId:number;
    registrationName: string;
    adminEmail: string;
    verificationCode:string;
    adminPhone: string;
    contactPerson?: any;
    expirationDate:any;
    creationDate:any;
    updatedDate:any;
    amountPaid: number;
    amountHistory?: any;
    physicalAddress?: any;
    description?: any;
    status: any = 0;
    SubscriptionPlan: number;
}