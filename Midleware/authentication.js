const { validateToken } = require("../service/authentication");

 function checkForAuthenticationCookie(cookieName){
  return async (req,res,next)=>{
    const tokenCookieValue = await req.cookies[cookieName];
    if(!tokenCookieValue){
      return next()
    }

    try {
      const payload = validateToken(tokenCookieValue);
      req.user = payload;
    } catch (error) {
      
    }
    next()
  }
}

module.exports=checkForAuthenticationCookie;