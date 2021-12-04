const Post = require('../models/postModel');

exports.getAllPosts = async (req,res) =>{
    try {   
        const postData = await Post.find({});
        res.status(200).json(
            {   
                status:'ok',
                data:postData,
                results:postData.length
            });
    } catch (error) {
        res.status(400).json(error);
        console.log({status:'fail',error});
    }
}

exports.getOnePost = async (req,res) => {
    try {
        const { id } = req.params;
    
        const postData = await Post.findById(id)

        res.status(200).json(
            {   
                status:'ok',
                data:postData,
                results:postData.length
            });
        
    } catch (error) {
        res.status(400).json(error);
        console.log({status:'fail',error});
    }
}

exports.createPost = async (req,res) => {
    try {
        const { title , body } = req.body;
        
        const postData = await Post.create({title,body})

        res.status(201).json(
            {   
                status:'created',
                data:postData,
            });

    } catch (error) {
        res.status(400).json(error);
        console.log({status:'fail',error});
    }    
}


exports.updatePost = async (req,res) => {
    try {
        const { id } = req.params;
        const { body , title } = req.body;
    
        const postData = await Post.findByIdAndUpdate(id,{body,title},{
            new:true,
            runValidators:true
        })

        res.status(200).json(
            {   
                status:'updated',
                data:postData,
            });
        
    } catch (error) {
        res.status(400).json(error);
        console.log({status:'fail',error});
    }
}

exports.deletePost = async (req,res) => {
    try {
        const { id } = req.params;
    
        const postData = await Post.findByIdAndDelete(id);

        res.status(200).json(
            {   
                status:'deleted',
            });
        
    } catch (error) {
        res.status(400).json(error);
        console.log({status:'fail',error});
    }
}