const express = require("express");
const router = express.Router();
const emailService = require('../BL/email.service');

router.post("/createEmail", async (req, res) => {
    try {
        let result = await emailService.createNewEmail (req.body);
        res.send(result);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/getAllIncomingEmails", async (req, res) => {
    try {
        let result = await emailService.getIncomingEmailsOfUser(req.body);
        res.send(result);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/getFavoriteEmails", async (req, res) => {
    try {
        let result = await emailService.getFavoriteEmail(req.body);
        res.send(result);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/updateEmail", async (req, res) => {
    try {
        let result = await emailService.updateEmail(req.body);
        res.send(result);
        
    } catch (error) {
        res.status(500).send("Something went wrong" );
    }
});

router.post("/deleteEmail", async (req, res) => {
    try {
        let result = await emailService.deleteEmail(req.body);
        res.send(result);
        
    } catch (error) {
        res.status(500).send("Something went wrong" );
    }
});


module.exports = router;