export default defineEventHandler(async (event) => {
    if (getMethod(event) == 'POST') {
        const body = await readBody(event)
        const contentType = getHeader(event, 'Content-Type')
        console.log(body)
        const res = await fetch('https://www.roomvo.com/services/room/rooms/', {
            method: 'POST',
            headers: {
                'Content-Type': contentType!
            },
            body: body
        }).then(res => res.text());
        return res;
    }
});