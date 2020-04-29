import { daoFindAllEvents, daoFindEventById } from "../repositories/event-dao";
import { Events } from "../models/event";

export async function findAllEvents():Promise<Events[]>
{
    return daoFindAllEvents();
}

export async function findEventById(id:number):Promise<Events>
{
   // console.log(id);
    
    return await daoFindEventById(id);
}