export default defineEventHandler(async (event) => {
    if (getMethod(event) == 'POST') {
        return await new Promise((resolve) => {
            event.node.req.on('data', async (data) => {

                const contentType = getHeader(event, 'Content-Type')
                const res = await fetch('https://www.roomvo.com/services/room/rooms/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': contentType!
                    },
                    body: data
                }).then(res => res.text());
                resolve(res);
            })
        })
    }
});