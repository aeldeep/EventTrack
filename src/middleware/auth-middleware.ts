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
