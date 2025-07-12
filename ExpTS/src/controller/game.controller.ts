import { Request, Response } from "express";
import { saveGameScore, getLeaderboard } from "../services/game";

const saveScore = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const { score } = req.body;

        if (!userId) {
            res.status(401).json({ success: false, message: "Usuário não autenticado." });
            return;
        }

        if (typeof score !== 'number') {
            res.status(400).json({ success: false, message: "Score inválido." });
            return;
        }

        await saveGameScore(userId, score);

        res.status(200).json({ success: true, message: "Score salvo com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar o score:", error);
        res.status(500).json({ success: false, message: "Erro interno do servidor." });
    }
};

const renderLeaderboard = async (req: Request, res: Response) => {
    try {
        const scores = await getLeaderboard(10); // Pega o Top 10
        res.render("ranking", { scores });
    } catch (error) {
        console.error("Erro ao carregar o ranking:", error);
        res.status(500).send("Erro ao carregar o ranking.");
    }
};


export default { saveScore, renderLeaderboard };