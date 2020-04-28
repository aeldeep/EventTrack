import { daoFindAllEvents } from "../repositories/event-dao";
import { Events } from "../models/event";

export async function findAllEvents():Promise<Events[]>
{
    return daoFindAllEvents();
}