import { Request, Response } from "express";
import { createUser, getUsers, getUser, removeUser, updateUser, checkAuth } from "../services/user"; // Import createUser
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
            const users = await getUsers(); // Fetch all available users
            const majors = await getMajors(); // Fetch all available majors
            res.render("users/create", {
                users, // Pass users to the view
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
            res.redirect("/users"); // Redirect to a user list page or dashboard
        } catch (err) {
            console.error(err);
            res.status(500).send(err); // Send error response
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
        const majors = await getMajors(); // Fetch all available majors
        if (req.method === "GET"){
            res.render("users/create", {
                user,
                majors
            })
        } else if (req.method === "POST"){
            const new_user = req.body;
            await updateUser(id, new_user)
            console.log(new_user)
            res.redirect("/users")
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
        const ok = await checkAuth(email, password)
        if (!ok){
            return res.render('users/login', {
                ok
            })
        } else{
            req.session.logado = true 
            res.redirect('/users')
        }
    }
}

const logout = async (req: Request, res: Response) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        res.redirect("/")
    })
}
    

export default { index, create, read, update, remove, login, logout }
