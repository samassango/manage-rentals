
const host = 'http://127.0.0.1:3001'
export const BASE_URL = {
    login: `${host}/users/login`,
    signUp: `${host}/signup`,
    currentUser: `${host}/get-current-user`,
    createTanent:`${host}/tenants`,
    tanents: `${host}/tenants`,
    tanentByOwnerId:`${host}/tenants/tanent-owner/:tenantOwnerId`,
    tanentByUserId:`${host}/tenants/tanent-user/:userId`,
    joinTanent:`${host}/tenants/join/:tenantId/:userId`,

    uploadPropertyImages: `${host}/upload/property_listing`,

    createNewPropertyList: `${host}/properties`,
    getPublicPropertyListing: `${host}/properties`,
    getPropertyListingByUser: `${host}/properties/property-owner/:userId`
}

export const getFullUrl =(url: string, param:any): string=>{
    const keys = Object.keys(param)
    let newURL = ''
    keys.forEach(key=>{
        newURL = url.replace(`:${key}`, param[key])
    })
    return newURL;
}