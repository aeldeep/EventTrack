import express = require('express')
import { findAllEvents, findEventById, saveNewEvent } from '../services/event-services';
import { Events } from '../models/event';
import { auth } from '../middleware/auth-middleware';
import { EventsDTO } from '../dtos/EventsDTO';

export const eventRouter=express.Router()

eventRouter.get('',async (req,res)=>
{
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

eventRouter.post('', auth(['1']), async (req,res)=>
{
    try{
    let {
        event_location,
        dates,
        times
    }:{
        event_location:string
        dates:string
        times:string
    }=req.body
    if (event_location&& dates&&times)
    {
        let newEvent= await saveNewEvent(new EventsDTO(
            0,event_location,dates,times
        ))
        res.status(201).json(newEvent);
    }else{
        res.status(400).send('Please Include all user fields')
    }
        
} catch (e) {
    res.status(400).send('Please enter valied information')
}
})