export default defineEventHandler((event) => {
    if (event.req.method === 'GET') {
        return "floors";
    }
});