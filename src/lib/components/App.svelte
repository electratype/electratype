<script>
    import Editor from "$lib/components/Editor.svelte";
    import Viewer from "$lib/components/Viewer.svelte";
    import { Pane, Splitpanes } from "svelte-splitpanes";

    import {onMount} from "svelte";

    let typst_worker;
    let mounted = false;

    onMount(async () => {

        const TypstWorker = await import("/src/lib/worker.js?worker");
        typst_worker = new TypstWorker.default();
        typst_worker.addEventListener("error", function(e) {
            console.log(e);
        })
        
        mounted = true;
    });

</script>

{#if mounted}
<Splitpanes>
    <Pane minSize={20} class="mr-2">
        <Editor {typst_worker}/>
    </Pane>
    <Pane class="ml-2">
        <Viewer {typst_worker} />
    </Pane>
</Splitpanes>
{/if}

