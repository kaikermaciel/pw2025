import { PrismaClient, Major } from "@prisma/client";
import { CreateMajorDTO } from "../types/major";


const prisma = new PrismaClient()

export const getMajors = async ():Promise<Major[]> => {
    return await prisma.major.findMany()
}

export const createMajor = async (major: CreateMajorDTO):Promise<Major> =>{
    return await prisma.major.create({data:major});
}

export const getMajor = async(id:string): Promise<Major | null> => {
    return await prisma.major.findFirst({ where : { id : id}})
}

export const removeMajor = async(id:string): Promise<Major | null> => {
    return await prisma.major.delete({ where : { id : id } })
}