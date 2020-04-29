import express = require('express')
import { findAllEvents, findEventById } from '../services/event-services';
import { Events } from '../models/event';

export const eventRouter=express.Router()

eventRouter.get('',async (req,res)=>
{console.log('we are in router');
    let events:Events[] = await findAllEvents(); 
    res.json(events)
   // console.log(events);
});

eventRouter.get('/:id', async (req,res)=>
{
    const id = +req.params.id
    if (isNaN(id))
    {
        res.sendStatus(400)
    }else{
        try{
        let events= await findEventById(id);
        res.json(events)
        //console.log('we are in router');
        //console.log(events);
    }
    catch(e){
        res.status(e.status).send(e.message)
        }
    }
})