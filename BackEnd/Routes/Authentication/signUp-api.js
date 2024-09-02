const express = require('express');
const router = express.Router();
const {userSchema} = require('../../Validations/validation');
const {checkUserExists, createNewUser, generateEmailVerificationDetails} = require('../../RoutesManagement/Authentication_Management/authentication-management');

//Register a User
router.post("/register", async(req, res) => {
    let result = {};
    try {
        let isValidInfo = userSchema.validate(req.body);
        if(isValidInfo.error) {
            console.log(isValidInfo.error);
            result.message = "User Data is not valid";
            return res.status(400).send(result);
        }
        else {
           let user = await checkUserExists(req.body.userName);
           if(!user) {
                let object = await createNewUser(req.body);
                let verifyResultToken = await generateEmailVerificationDetails(object.data);
                result.data = object.data;
                result.emailVerificationToken = verifyResultToken;
                return res.status(200).json(result);
           }
           else {
            result.message = "User Already Exists";
            return res.status(409).send(result);
           }
        }
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

module.exports = router;