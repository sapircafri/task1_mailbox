const express = require("express");
const router = express.Router();
const chatService = require('../BL/chat.service');


router.post("/createChat", async (req, res) => {
    try {
        let result = await chatService.createNewChat (req.body);
        res.send(result);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/getChat", async (req, res) => {
    try {
        let result = await chatService.findChat (req.body.chat_id);
        res.send(result);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.post("/updateChat", async (req, res) => {
    try {
        let result = await chatService.updateChat(req.body);
        res.send(result);
        
    } catch (error) {
        res.status(500).send("Something went wrong" );
    }
});

router.delete("/deleteChat", async (req, res) => {
    try {
        let result = await chatService.deleteChat(req.body);
        res.send(result);
        
    } catch (error) {
        res.status(500).send("Something went wrong" );
    }
});


module.exports = router;