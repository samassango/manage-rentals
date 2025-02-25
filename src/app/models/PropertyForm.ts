export default interface IPropertyForm{
    propertyName: string;
    propertyAddress: string;
    propertyOwnerId: string;
    propertyDescription: string;
    propertyPrice: string;
    propertyNoOfBadroom: string;
    propertyNoOfBathroom: string;
    propertyNoOfGarage: string;
    propertyImages: File[];
    propertyAvailability: boolean;
}