export default interface IPropertyModel{
    id?: string;
    propertyName: string;
    propertyAddress: string;
    propertyTenantId: string;
    propertyOwnerId: string;
    propertyDescription: string;
    propertyPrice: string;
    propertyNoOfBadroom: string;
    propertyNoOfBathroom: string;
    propertyNoOfGarage: string;
    propertyImages: string[];
    propertyAvailability: boolean;
    createdAt: string;
}

