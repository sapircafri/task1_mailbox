const express = require("express");
const router = express.Router();
const userService = require('../BL/user.service');


router.post("/createUser", async (req, res) => {
    try {
        let result = await userService.createNewUser(req.body);
        res.send(result);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/getUser", async (req, res) => {
    try {
        let result = await userService.findUser(req.body.id);
        res.send(result);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.post("/updateUser", async (req, res) => {
    try {
        let result = await userService.updateUser(req.body);
        res.send(result);
        
    } catch (error) {
        res.status(500).send("Something went wrong" );
    }
});

router.post("/deleteUser", async (req, res) => {
    try {
        let result = await userService.deleteUser(req.body);
        res.send(result);
        
    } catch (error) {
        res.status(500).send("Something went wrong" );
    }
});


module.exports = router;