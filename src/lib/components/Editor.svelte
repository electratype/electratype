<script lang="ts">
    import {EditorView, basicSetup} from "codemirror";
    import {EditorState} from "@codemirror/state";

    import { afterUpdate, onMount } from "svelte";

    export let typst_worker;
    export let initial_doc;

    function change_handler(e) {
        if (e.docChanged) {
            typst_worker.postMessage(e.state.doc.toString());
            //typst_worker.postMessage({changes: e.changes, changedRanges: e.changedRanges});
        }
    }

    onMount(() => {
        let editor = new EditorView({
            state: EditorState.create({
                doc: initial_doc,
                extensions: [
                    basicSetup,
                    EditorView.updateListener.of(change_handler),
                    EditorView.lineWrapping
                ]
            }),
            parent: document.getElementById("editor")
        })

        typst_worker.postMessage(initial_doc);
    });

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