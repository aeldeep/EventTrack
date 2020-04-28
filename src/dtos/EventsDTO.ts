export class EventsDTO
{
    event_id:number
    event_location:string
    dates:string
    times:string
    
    constructor
    (
        event_id:number,
        event_location:string,
        dates:string,
        times:string
    )
    {
    this.event_id=event_id,
    this.event_location=event_location,
    this.dates=dates,
    this.times=times
    }
}