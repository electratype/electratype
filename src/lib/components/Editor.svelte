<script lang="ts">
    import {EditorView, basicSetup} from "codemirror";
    import {EditorState} from "@codemirror/state";

    import { onMount } from "svelte";

    export let typst_worker;

    let value = "= Test value\n\nSecond line";

    function change_handler(e) {
        //console.log("Before posting");
        typst_worker.postMessage(e.state.doc.toString());
    }

    onMount(() => {
        let editor = new EditorView({
            state: EditorState.create({
                doc: value,
                extensions: [
                    basicSetup,
                    EditorView.updateListener.of(change_handler),
                    EditorView.lineWrapping
                ]
            }),
            parent: document.getElementById("editor")
        })
    })

</script>

<div id="editor">
</div>

<style>
    #editor {
        min-width: 100%;
        min-height: 100%;

        border-radius: var(--primary-radius);
    }
</style>