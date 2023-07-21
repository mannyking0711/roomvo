export const getDataURLBinary = (dataURL: string) => {
    const BASE64_MARKER = ';base64,';
    const base64Index = dataURL.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const base64 = dataURL.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }

    return array;
}