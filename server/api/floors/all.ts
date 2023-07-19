export default defineEventHandler(async (event) => {
    if (getMethod(event) === 'GET') {
        const { vendor_id, product_id } = getQuery(event);

        const url = `https://www.roomvo.com/services/product/products/?` +
            new URLSearchParams([
                ["domain", "get.roomvo.com"],
                ["is_hidden", "0"],
                ["locale", "en-gb"],
                ["page", "1"],
                ["page_size", "150"],
                ["product_type", "1"],
                ["relevant_product_origin_vendor", vendor_id as string],
                ["relevant_to_product", product_id as string],
                ["suitable_for_products", ""],
                ["suitable_for_room_type", "Living Room"],
                ["suitable_for_surface_types", ""],
                ["vendor", vendor_id as string],
            ])
        const res = await fetch(url).then(res => res.json());
        return res.results;
    }
});