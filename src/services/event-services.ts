import { daoFindAllEvents, daoFindEventById, daosaveNewEvent } from "../repositories/event-dao";
import { Events } from "../models/event";
import { EventsDTO } from "../dtos/EventsDTO";

export async function findAllEvents():Promise<Events[]>
{
    return daoFindAllEvents();
}

export async function findEventById(id:number):Promise<Events>
{
   // console.log(id);
    
    return await daoFindEventById(id);
}

export async function saveNewEvent(newEvent:EventsDTO):Promise<Events>
{
    return await daosaveNewEvent(newEvent)
}