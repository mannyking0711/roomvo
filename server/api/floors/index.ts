import { parse } from 'node-html-parser';

export default defineEventHandler(async (event) => {
    if (getMethod(event) === 'GET') {
        const { visitor_id } = getQuery(event)

        const res = await fetch("https://www.roomvo.com/my/multisurface_demo?" +
            new URLSearchParams([
                ["visitor_id", visitor_id as string],
                ["tracking_code", ""],
                ["locale", "en-gb"],
                ["prefilter", ""],
                ["iframe_id", "ffPopup"],
                ["originator", ""],
                ["use_host_navigation", "1"],
                ["vendor_code", "code1"],
                ["product_type", "1"],
                ["domain", "get.roomvo.com"],
                ["is_in_top_window", "0"],
                ["use_history_padding", "0"],
            ])
        ).then(res => res.text());

        const html = parse(res);
        return JSON.parse(html.querySelector("script#__NEXT_DATA__")!.textContent);
    }
});