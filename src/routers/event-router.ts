import express = require('express')
import { findAllEvents } from '../services/event-services';
import { Events } from '../models/event';

export const eventRouter=express.Router()

eventRouter.get('',async (req,res)=>
{
    let events:Events[] = await findAllEvents(); 
    res.json(events)
   // console.log(events);
    
});