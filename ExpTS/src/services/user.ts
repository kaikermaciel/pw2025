import { Prisma, PrismaClient, User } from "@prisma/client";
import { CreateUserDTO } from "../types/user";
import { compare, genSalt, hash } from "bcryptjs";

const prisma = new PrismaClient()

export const getUsers = async ():Promise<User[]> => {
    return await prisma.user.findMany()
}

export const createUser = async (user: CreateUserDTO):Promise<User> =>{
    const salt = await genSalt();
    const password = await hash(user.password, salt);
    const newUser = {... user, password}
    return await prisma.user.create({data:newUser});
}

export const checkAuth = async (email: string, password : string): Promise<boolean> => {
    const user = await prisma.user.findFirst({ where: { email: email }})
    if (user){
        return await compare(password, user.password)
    }
    return false
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

