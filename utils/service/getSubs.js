const ORIGIN = process.env.NEXT_PUBLIC_URL_VIDEO
export const getSubs = async (language, idVideo) => {
    let param = `${idVideo}.xml`
    let urlFetch =`${ORIGIN}${language}/${param}`;
    let data = [];
    console.log("urlFetch", urlFetch);
    let res = await fetch( urlFetch )
    .then((r) => r.text())
    .then((text) => {
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(text, 'text/html');
        const html = htmlDocument.getElementsByTagName('body');
        const lines = html[0].getElementsByTagName('text');
        for (let i = 0; i < lines.length; i++) {
            const strippedString = lines[i].textContent;
            const start = lines[i].getAttribute('start');
            const end = lines[i].getAttribute('dur');
            data = data.concat([{ subtitle: strippedString, start: start, end: end }]);
        }
        return data;
    })
    return res;
}
