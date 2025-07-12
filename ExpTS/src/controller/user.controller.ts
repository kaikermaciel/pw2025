import { Request, Response } from "express";
import { createUser, getUsers, getUser, removeUser, updateUser, checkAuth, changeUserPassword } from "../services/user";
import { getMajor, getMajors } from "../services/major";
import { LoginDto } from "../types/user";

const index = async (req: Request, res: Response) => {
    try {
        // Assuming you might want to list users here later
        const users = await getUsers();
        res.render("users/index", {
            users,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

const create = async (req: Request, res: Response) => {
    if (req.method === "GET") {
        try {
            const users = await getUsers(); 
            const majors = await getMajors(); 
            res.render("users/create", {
                users, 
                majors
            });
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    } else if (req.method === "POST") {
        try {
            const user = req.body;
            await createUser(user);
            req.flash('success_msg', 'Usuário criado com sucesso!');
            res.redirect("/users"); 
        } catch (err) {
            console.error(err);
            res.status(500).send(err); 
        }
    }
};

const read = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const user = await getUser(id)
        const major = user?.majorId ? await getMajor(user.majorId) : null;
        if (req.method === "GET"){
            res.render("users/read",{
                user,
                major
            })
        } 
    } catch(err){
        console.log(err)
    }
}


const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const user = await getUser(id)
        const majors = await getMajors();
        if (req.method === "GET"){
            res.render("users/create", {
                user,
                majors
            })
        } else if (req.method === "POST"){
            const new_user = req.body;
            await updateUser(id, new_user)
            console.log(new_user)
            res.redirect("/")
        }
    } catch(err){
        console.log(err)
    }
}

const remove = async (req: Request, res: Response) => {
    const {id} = req.params
    try{
        const user = await removeUser(id)
        res.status(200).send({ msg:`user deletado ${user}` })
    } catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

const login = async (req: Request, res: Response) => {
    if (req.method === "GET") {
        res.render('users/login')
    } else {
        const {email, password} = req.body as LoginDto
        const user = await checkAuth(email, password)
        if (!user){
            res.render('users/login', {
                error: "Email ou senha inválidos."
            })
            return;
        } else{
            req.session.logado = true;
            req.session.userId = user.id; 
            req.session.save(() => {
                res.redirect('/');
            });
        }
    }
}

const logout = async (req: Request, res: Response) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
}

export const renderChangePasswordPage = (req: Request, res: Response) => {
    res.render("users/updatePassword");
};


export const renderProfilePage = async (req: Request, res: Response) => {
    try {
        const userId = req.session.userId;

        if (!userId) {
            res.redirect('/users/login');
            return;
        }

        const user = await getUser(userId);
        const majors = await getMajors();

        if (!user) {
            res.redirect('/users/login');
            return;
        }

        const majorsWithSelection = majors.map(major => ({
            ...major,
            selected: major.id === user.majorId,
        }));

        res.render("users/updateCredentials", { user, majors: majorsWithSelection });

    } catch (error) {
        console.error("Error rendering profile page:", error);
        res.status(500).send("Erro ao carregar a página de perfil.");
    }
};

export const updateProfileData = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const { name, email, major } = req.body;

        if (!userId) {
            res.redirect('/users/login');
            return;
        }
        const new_user = req.body;
        await updateUser(userId, new_user);
        req.flash('success_msg', 'Dados atualizados com sucesso!');
        res.redirect('/users/profile');
    } catch (error) {
        console.error("Error updating profile data:", error);
        res.status(500).send("Erro ao atualizar os dados do perfil.");
    }
};

export const updatePassword = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            res.render("users/updatePassword", {
                errors: {
                    confirmPassword: "A nova senha e a confirmação não coincidem."
                }
            });
            return;
        }

        if (!userId) {
            res.redirect("/users/login");
            return;
        }

        const result = await changeUserPassword(userId, currentPassword, newPassword);

        if (!result.success) {
            console.error(result.message);
            res.render("users/updatePassword", {
                errors: {
                    currentPassword: result.message
                }
            });
            return;
        }

        req.flash('success_msg', 'Senha alterada com sucesso!');
        res.redirect("/users/profile");

    } catch (error) {
        console.error("Erro ao atualizar a senha:", error);
        res.render("users/updatePassword", {
            errors: {
                general: "Ocorreu um erro inesperado ao tentar atualizar a senha."
            }
        });
    }
};


export default { index, create, read, update, remove, login, logout, renderChangePasswordPage, updatePassword, renderProfilePage, updateProfileData }
