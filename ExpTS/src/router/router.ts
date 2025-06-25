import { Router } from "express";
import mainController from "../controller/mainController";
import majorController from "../controller/major.controller";
const router = Router();

router.get("/", mainController.main)
router.get("/bem-vindo/:nome", mainController.greetings)
router.get("/sobre", mainController.about);
router.get("/hb1", mainController.hb1);
router.get("/hb2", mainController.hb2);
router.get("/hb3", mainController.hb3);
router.get("/hb4", mainController.hb4);
router.get("/lorem", mainController.lorem);
router.get('/cookie', mainController.testeCookie)


router.get("/majors/", majorController.index)
router.all("/majors/create", majorController.create)
router.get("/majors/:id", majorController.read)
router.all("/majors/update/:id", majorController.update)
router.post("/majors/remove/:id", majorController.remove)

router.use((req, res) => {
    res.status(404).send("Página não encontrada!");
})

export default router;