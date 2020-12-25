import { ModuleAction } from './moduleActions';


export class Staff {
    staffId:any;
    code: string;
    name: string;
    title?: any;
    email: string;
    phoneNumber: string;
    groupId:Number=0;
    createdDate:any;
    lastLoginDate:any;
    permissionDetail: any=0;
    licenseManagementId: number;
    dataStatus: any=0;
    status: Number=0;
    lastManagedBy: any;
    lastManagedDate:any;
    moduleActionModels:ModuleAction[];
}



