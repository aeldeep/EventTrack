import { PoolClient } from "pg";
import { connectionPool } from ".";
import { unauthurized } from "../errors/log_Error";
import {eventDTOToEventConverter} from "../util/event-dto-to-event";
import { Events } from "../models/event";

export async function daoFindAllEvents():Promise<Events[]>
{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query
        ('select * from "Event".events')
        return results.rows.map(eventDTOToEventConverter)
    }catch(e){
        throw new unauthurized()
    } finally {
        client && client.release()
    }
}

export async function daoFindEventById(id):Promise<Events>
{
    let client:PoolClient
    try{
        client= await connectionPool.connect()
        let results = await client.query
        ('select * from "Event".events e where event_id=$1',[id])
        if(results.rowCount < 0){
           throw new Error('Event Not Found')
            //return null
        }
        return eventDTOToEventConverter(results.rows[0])
    }catch(e){
               
       // throw new Error('Event Not Found')
    } finally {
        client && client.release()
    }
    
}