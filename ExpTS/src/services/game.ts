import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const saveGameScore = async (userId: string, score: number) : Promise<{id:string, userId:string, score:number}> => {
    return await prisma.session.create({ data: { userId, score }});
};


export const getLeaderboard = async (limit: number = 10) => {
    const topScoresByUser = await prisma.session.groupBy({
        by: ['userId'],
        _max: {
            score: true,
        },
        orderBy: {
            _max: {
                score: 'desc',
            },
        },
        take: limit,
    });

    if (topScoresByUser.length === 0) {
        return [];
    }

    const userIds = topScoresByUser.map(s => s.userId);
    const users = await prisma.user.findMany({
        where: { id: { in: userIds } },
        select: { id: true, name: true },
    });

    const userMap = new Map(users.map(u => [u.id, u.name]));

    return topScoresByUser.map(scoreEntry => ({
        userName: userMap.get(scoreEntry.userId) || 'Jogador Desconhecido',
        score: scoreEntry._max.score ?? 0, 
    }));
};