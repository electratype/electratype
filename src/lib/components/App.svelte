<script>
    import Editor from "$lib/components/Editor.svelte";

    import TypstWorker from "$lib/worker?worker";

    import { Pane, Splitpanes } from "svelte-splitpanes";

    import {onMount} from "svelte";

    const output_id = "compilation-output";

    let worker_ready = false;
    let typst_worker;

    /**
     * Function which loads initial document entered in the editor
     */
    async function load_initial_doc() {
        const res = await fetch(`/src/lib/assets/initial.typ`)
        return  (await res.text()).toString();
    }

    function load_worker() {

        const output_element = document.getElementById(output_id);

        typst_worker = new TypstWorker();
        
        typst_worker.addEventListener("error", function(e) {
            console.log(e);
        });

        typst_worker.addEventListener('message', function(e) {

            let data = e.data;

            if (typeof(data) === "string") {
                worker_ready = true;
                return;
            }

            if (data.length > 0) {
                let pageCount = parseInt(data.shift());

                let childCount = output_element.children.length;

                //console.log("Page count:", pageCount);
                //console.log("Child count in output div", childCount);

                for (let i = 0; i < data.length; i += 2) {

                    let index = parseInt(data[i]);
                    let content = data[i+1];

                    //console.log("Index to be updated:", index);
                    //console.log(content);

                    output_element.insertOrReplace(index, content);
                }

                if (pageCount < childCount){
                    output_element.overflowChildren(pageCount);
                }

                //console.log("-------")
            }
        });
        
        output_element.insertOrReplace = function(index, childConent) {
            if (index >= this.children.length) {
                var child = document.createElement('div');
                child.setAttribute("id", `page-${index + 1}`)
                child.innerHTML = childConent;
                this.appendChild(child);
            } else {
                var child = this.children[index];
                child.innerHTML = childConent;
            }
        }
        output_element.overflowChildren = function (count) {

            let childrenCount = this.children.length;
            if (count < childrenCount) {
                for (let i = childrenCount - 1; i >= count; i--) {
                    this.removeChild(this.children[i]);
                }
            }
        }
    }

    onMount(load_worker);

</script>

<Splitpanes>
    <Pane minSize={20} class="mr-2">
        {#if worker_ready}
        {#await load_initial_doc() then initial_doc }
            <Editor {typst_worker} {initial_doc} />
        {/await}
        {/if}
    </Pane>
    <Pane class="flex flex-col items-center ml-2">
        <div id={output_id} class="flex flex-col pt-4 gap-4 max-h-screen">
        </div>
    </Pane>
</Splitpanes>
