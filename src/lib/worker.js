import init, { Typst } from "electratype-wasm";

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

const typst = new Typst();
typst.supply_fonts(fontBuffer);

onmessage = (e) => {
    typst.set_source(e.data);
    let svg = typst.compile_svg();
    self.postMessage(svg);
};