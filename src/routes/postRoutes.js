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
 const { getAllPosts , getOnePost , createPost , deletePost , updatePost } = require('../controllers/postController');
 
 /**
  * setting # routes #
  */

    // # GET # requests
        router.get('/',getAllPosts);
        router.get('/:id', getOnePost);
    
    // # Post # requests
        router.post('/', createPost)

    // # Del # requests
        router.delete('/:id', deletePost)

    // # Put # requests
        router.put('/:id', updatePost)
 
 /**
  * exporting # ROUTER #
  */
 module.exports = router;