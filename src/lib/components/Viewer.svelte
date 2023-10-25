<script>
    import { onMount } from "svelte";

    export let typst_worker;
    const output_id = "compilation-output";
    let output_element;

    Element.prototype.insertOrReplace = function(index, childConent) {
        if (index >= this.children.length) {
            var child = document.createElement('div');
            child.innerHTML = childConent;
            this.appendChild(child);
        } else {
            var child = this.children[index];
            child.innerHTML = childConent;
        }
    }

    Element.prototype.overflowChildren = function (count) {

        let childrenCount = this.children.length;
        if (count < childrenCount) {
            for (let i = childrenCount - 1; i >= count; i--) {
                this.removeChild(this.children[i]);
            }
        }
    }

    typst_worker.addEventListener('message', function(e) {

        let data = e.data;

        if (data.length > 0) {
            let pageCount = data.shift();

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

            output_element.overflowChildren(pageCount);

            //console.log("-------")
            
            

            //const outputNode = document.getElementById(output_id);
            //outputNode.innerHTML = e.data.join("");
        }
    });

    onMount(() => {
        output_element = document.getElementById(output_id);
    })

</script>

<div id={output_id}>

</div>