export interface IUser {
    readonly id: number,
    email: string,
    password: string
}

export interface IUserDatail extends IUser {
    id: number,
    email: string,
    password: string
}

export function createUser({id, email, password}: any): IUser {
    return {
        id, email, password
    }
}

export function createUsers(data: any[]): IUser[] {
    return data.map(createUser);
}

export function createUserById({id, email, password}: any): IUserDatail {
    return {
        id, email, password
    }
}

export function createUserByEmail({id, email, password}: any): IUserDatail {
    return {
        id, email, password
    }
}