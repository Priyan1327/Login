import express from "express";
import { createuser, deleatuser, getuser, updateuser , loginuser } from "../controler/user.controler.js";

const router = express.Router();

//-----------  API for creat new User ---------------
router.post("/register", createuser);

//----------- API for get user ----------
router.get("/:id" , getuser);

//------------ API for Deleate ----------
router.delete("/:id" , deleatuser);

//------------ API for Update ---------
router.put("/:id", updateuser);

//-----------API fro post (Login)--------
router.post("/login", loginuser);

export default router;