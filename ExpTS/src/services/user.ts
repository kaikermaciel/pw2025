import { Prisma, PrismaClient, User } from "@prisma/client";
import { CreateUserDTO } from "../types/user";


const prisma = new PrismaClient()

export const getUsers = async ():Promise<User[]> => {
    return await prisma.user.findMany()
}

export const createUser = async (user: CreateUserDTO):Promise<User> =>{
    return await prisma.user.create({ data : user});
}

export const getUser = async(id:string): Promise<User | null> => {
    return await prisma.user.findFirst({ where : { id : id}})
}

export const removeUser = async(id:string): Promise<User> => {
    return await prisma.user.delete({ where : { id : id } })
}

export const updateUser = async (id: string, data: Prisma.UserUpdateInput): Promise<User> => {
    return await prisma.user.update({ where: { id }, data });
}