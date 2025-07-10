import { Router } from "express";
import mainController from "../controller/mainController";
import majorController from "../controller/major.controller";
import userController from "../controller/user.controller"; // Import the new user controller
import { checkAuth } from "../middlewares/checkAuth";

const router = Router();

router.get("/", mainController.main)
router.get("/bem-vindo/:nome", mainController.greetings)
router.get("/about", mainController.about);
router.get("/hb1", mainController.hb1);
router.get("/hb2", mainController.hb2);
router.get("/hb3", mainController.hb3);
router.get("/hb4", mainController.hb4);
router.get("/lorem", mainController.lorem);
router.get('/cookie', mainController.testeCookie)


router.get("/majors/", majorController.index)
router.all("/majors/create", checkAuth, majorController.create)
router.get("/majors/read/:id", majorController.read)
router.all("/majors/update/:id", majorController.update)
router.post("/majors/remove/:id", majorController.remove);

// User Routes
router.get("/users/", userController.index);
router.all("/users/create", userController.create);
router.get("/users/read/:id", userController.read)
router.all("/users/update/:id", userController.update)
router.post("/users/remove/:id", userController.remove);
router.all("/users/login", userController.login)
router.get("/users/logout", userController.logout)


router.use((req, res) => {
    res.status(404).send("Página não encontrada!");
})

export default router;