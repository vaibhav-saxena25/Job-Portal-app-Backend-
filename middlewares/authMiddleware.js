// import JWT from 'jsonwebtoken';

// const userAuth = async(req,res,next)=>{
//     const authHeader = req.headers.authorization;
    
//     if(!authHeader || authHeader.startsWith('Bearer')){
        
//         next("auth failed");
//     }

   
    
//     console.log(token);
    
//     try{
//         const payload = JWT.verify(token,process.env.JWT_SECRET)
//         req.user = {userId: payload.userId};
//         next()

//     }catch(error){
//         next("Authorization failed");
//     }
// }

// export default userAuth;
import JWT from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ error: 'Authentication failed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Authorization failed' });
  }
};

export default userAuth;