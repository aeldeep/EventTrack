import { PoolClient } from "pg";
import { connectionPool } from ".";
import { unauthurized } from "../errors/log_Error";
import {eventDTOToEventConverter} from "../util/event-dto-to-event";
import { Events } from "../models/event";
import { EventsDTO } from "../dtos/EventsDTO";

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

export async function daosaveNewEvent(newEvent:EventsDTO):Promise<Events>
{
    let client:PoolClient
    try{
        client= await connectionPool.connect()
        let result=await client.query
        ('insert into "Event".events (event_location ,dates ,times) values ($1,$2,$3) RETURNING "event_id"'
        ,[newEvent.event_location,newEvent.dates,newEvent.times])
        newEvent.event_id=result.rows[0].event_id
        return eventDTOToEventConverter(newEvent)
    } catch(e){
        throw new unauthurized()
    } finally {
        client && client.release()
    }
}