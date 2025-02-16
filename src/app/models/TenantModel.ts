export default interface ITenantDetails {
    id: string;
    tenantOwnerId: string;
    tenantName: string;
    tenantDescription: string;
    tenantImages: [
        string
    ];
    tenantBanner: string;
    createdAt: Date;
    updatedAt: Date;
}