export enum RoleAccess {
    read = 'READ',
    write = 'WRITE',
    delete = 'DELETE'
}

interface IRoles{
    [key: string]: any
}
const Roles: IRoles = {
    Guest: {
        viewer: [RoleAccess.read],
        editor: [RoleAccess.read, RoleAccess.write]
    },
    TenantUser: {
        viewer: [RoleAccess.read],
        editor: [RoleAccess.read, RoleAccess.write],
        admin: [RoleAccess.read, RoleAccess.write, RoleAccess.delete]
    },
    SuperAdminUser: {
        viewer: [RoleAccess.read],
        editor: [RoleAccess.read, RoleAccess.write],
        admin: [RoleAccess.read, RoleAccess.write, RoleAccess.delete]
    }
}
export default Roles