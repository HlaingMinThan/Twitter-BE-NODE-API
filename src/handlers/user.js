import { comparePasswords, createJWT, hashPassword } from '../helpers/auth.js';

import prisma from '../../prisma/index.js'

//register
let createUser = async (req,res) => {

    let user = await prisma.user.create({
        data : {
            email : req.body.email,
            username : req.body.username,
            password : await hashPassword(req.body.password)
        }
    })

    return res.status(201).json({
        id :user.id, 
        email : user.email, 
        username : user.username,
        profile : user.profile,
        token :  createJWT(user)
    });
}


//SiginIn
let signIn = async (req,res) => {
    //get the user with username
    console.log('api hit')
    console.log(req.body.email)
    console.log(req.body.password)
    const user = await prisma.user.findUnique({
        where: {
            email : req.body.email
        },
    });
    if(!user) {
        return res.status(401).json({type : 'email',message : 'user not found'});
    }
    //check is the password valid ?
    let isPasswordValid = await comparePasswords(req.body.password , user.password);
    if (!isPasswordValid){
        return res.status(401).json({type : 'password',message : 'password is invalid'});
    }

    return res.status(201).json({
        id :user.id, 
        email : user.email, 
        username : user.username,
        profile : user.profile,
        token :  createJWT(user)
    });
}

export {createUser , signIn};