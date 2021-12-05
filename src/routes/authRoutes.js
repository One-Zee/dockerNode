/**
 * INITIALIZING # ROUTER #
 */
 const router = require('express').Router();

 /**
  * loading # Middleware #
  */

 /**
  * loading # Controllers #
  */
 const { signIn , signUp } = require('../controllers/authController');
 
 /**
  * setting # routes #
  */

    // # GET # requests
    
    // # Post # requests
        router.post('/signIn', signIn);
        router.post('/signUp', signUp)

    // # Del # requests

    // # Put # requests
 
 /**
  * exporting # ROUTER #
  */
 module.exports = router;