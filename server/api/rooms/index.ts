import { Room } from '~/models/room';

export default defineEventHandler(async (event) => {
    if (getMethod(event) === 'GET') {
        return await Room.find({ active: true })
        // const { visitor_id } = getQuery(event)
        // const res = await fetch(`https://www.roomvo.com/services/room/rooms/?visitor=${visitor_id}&room_type=vendor&product_type__in=1%2C4%2C5&locale=en-gb`)
        //     .then(res => res.json());
        // return res.results;
    }
});