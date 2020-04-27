


export const authAdminMid=(req,res,next) =>
{
    if (!req.session.user) 
    {
        res.status(401).send('Please Login')
    }
    else if (req.session.user.roleId === 1) 
    {
        next()
    } 
    else 
    {
        res.status(403).send('You are Unauthorized for this EndPoint')
    }
}

export const auth=(roles:String[])=>
{
    return(req,res,next)=>
    {
        if (!req.session.user)
        {
            res.status(401).send('Please Login')
        }
        else
        {
            let allow=false
            for (let roleid of roles) 
            {
                if (req.session.user.roleId== +roleid) 
                {
                    allow= true
                    next()                    
                }
            }
            if(!allow)
            {
                res.status(403).send('You are UnAuthorized for this endpoint')
            }
        }
    }
    
}

export const authId= (req,res,next) => {

    if(req.session.user.roleId ==1 || req.session.user.roleId ==2  ){
        //console.log(` role id  ${req.session.user.roleId}`);
        next()
    }else if(req.session.user.userId == +req.params.id )
    {
        console.log(` session id  ${req.session.user.roleId} ,id = ${req.params.id}`);
        
        next()
    } else {
        res.status(403).send('You are UnAuthorized for this endpoint')
    }
}

export const authFactory = (roles:string[]) => {
    return (req,res,next) => {
        // this checks that you are logged in
        if(!req.session.user){
            res.status(401).send('Please Login')
        // is there is the special role Everyone, allow them in
        } else if(roles.includes('Everyone')){
            next()
        } else {
            let allowed = false
            // loop through all of the allowed roles
            for(let role of roles){
                // see if user has a matching role
                if(req.session.user.role === role){
                    allowed = true
                    next()
                }
            }
            if(!allowed){
                res.status(403).send('You are UnAuthorized for this endpoint')
            }
            
        }
    }
}


export const authCheckId= (req,res,next) => {
    
    if(req.session.user.role === 'Admin'){
        next()
    }else if(req.session.user.id === +req.params.id ){
        next()
    } else {
        res.status(403).send('You are UnAuthorized for this endpoint')
    }
}