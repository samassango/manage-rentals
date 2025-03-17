import { ICurrentUser } from "../models";
import Roles, { RoleAccess } from "./roles";

export enum UserType {
    Guest = 'Guest',
    TenantUser = 'TenantUser',
    SuperAdminUser = 'SuperAdminUser'
}

export enum UserRole {
    viewer='viewer',
    editor = 'editor',
    admin = 'admin'
}

export const hasPermission = (user: ICurrentUser, action: RoleAccess) => {
    let role: string = user.role;
    let userType: string = user.userType;
    let userRoles = []
    if (role && userType) {
        userRoles = Roles[userType][role]
    }
    return userRoles?.includes(action)
}