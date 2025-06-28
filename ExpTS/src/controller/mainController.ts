import { Request, Response } from "express";
import { LoremIpsum } from "lorem-ipsum";

const main = (req: Request, res: Response) => {
    res.render("layouts/main", {
        mensagem: "flu",
        layout:false,
    })
};

const greetings = (req: Request, res: Response) => {
    res.status(200).send(`Bem-vindo(a) ${req.params.nome}!`);
};

const about = (req: Request, res: Response) => {
    res.render("about", {
         mensagem: {
            title: 'jogo do spaceshooter',
            line1: 'space para atirar',
            line2: 'setas para direcionar',
            line3: 'não seja atingido e irá ganhar :)'
        },
        layout: false
    })
}

const hb1 = (req: Request, res: Response) => {
    res.render("hb1", {
        mensagem: "Olá, você está aprendendo Express + HBS!",
        layout: false
    })
}

const hb2 = (req: Request, res: Response) => {
    res.render("hb2", {
        mensagem: "Express Framework",
        layout: false
    })
}

const hb3 = (req: Request, res: Response) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('hb3', { profes, layout: false });
}

const hb4 = (req: Request, res: Response) => {
        const technologies = [
            { name: 'Express', type: 'Framework', poweredByNodejs: true },
            { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
            { name: 'React', type: 'Library', poweredByNodejs: true },
            { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
            { name: 'Django', type: 'Framework', poweredByNodejs: false },
            { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
            { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
        ];

        res.render('hb4', { technologies , layout:false})
}



const lorem = (req: Request, res: Response) =>{
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: 8,
            min: 4
        },
        wordsPerSentence: {
            max: 16,
            min: 4
        }
    });

    res.status(200).send(`${lorem.generateParagraphs(4)}`)
}

const testeCookie = (req : Request, res: Response) =>{
    if(!('teste-cookie' in req.cookies)){
        res.cookie('teste-cookie', 'algum-valor')
        res.send("voce nunca passou aqui")
    } else{
        res.send("voce já passou por aqui")
    }
}

export default { main, greetings, about, lorem, hb1, hb2, hb3, hb4, testeCookie }