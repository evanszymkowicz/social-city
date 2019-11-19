import express from "express";
import DB from "./db";

const router = express.Router();

router.get("/api/hello", (req,res, next) =>  {
	res.json("");
});

router.get("/api/content", async (req, res) => {
	try {
		let content = await DB.Content.all();
		res.json(content);
	} catch(e) {
		console.log(e);
		res.sendStatus(500);
	}
});

export default router;
