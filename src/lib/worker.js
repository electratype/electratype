import init, { init_panic_hook, Typst } from "electratype-wasm";

const FONT_NAMES = ["Inter.otf"];

async function load_fonts() {
    let promises = FONT_NAMES.map((font) => {
        return new Promise((resolve, reject) => {
            fetch(`assets/fonts/${font}`).then((response) => {
                response.arrayBuffer().then(resolve, reject);
            }, reject);
        });
    });
    let fonts = await Promise.all(promises);
    return fonts;
}

let [_, fontBuffer] = await Promise.all([init(), load_fonts()]);

init_panic_hook();

const typst = new Typst();
typst.supply_fonts(fontBuffer);

onmessage = (e) => {

    console.log(e.data);

    if (typeof(e.data) === "string") {
        typst.set_source(e.data);
    } else {
        let from = e.data.changedRanges[0].fromA;
        let to = e.data.changedRanges[0].toA;
        let text = e.data.changes.inserted[1].text.join("");
        console.log(from, to, text);
    
        typst.edit_source(
            from, to, text
        );
    }

    let svg = typst.compile_svg();
    self.postMessage(svg);
};

self.postMessage("Started")
