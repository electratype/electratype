# ElectraType

![](/logo.svg)

ElectraType is an open-source web based Typst editor built using Svelte.

This project is in very active development stage therefore **stability is not guaranteed**.

This project uses WASM module fount at sister repo [https://github.com/electratype/wasm](https://github.com/electratype/wasm).

## Installation

1. Create parent folder `/parent`
2. Clone this repository into the parent dir folder `/electratype`
3. Clone [https://github.com/electratype/wasm](https://github.com/electratype/wasm) in to the parent dir folder `/electratype-wasm`
4. While inside `/electratype` folder, build WASM module using `yarn run wasm-module`
5. Start app using `yarn run dev --open`

## Roadmap

- [ ] Add font support
- [ ] Add collaboration support
- [ ] Add package support
- [ ] Improve performance on larger documents
- [ ] Add project directories and opening from file system