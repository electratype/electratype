<script>
    import Editor from "$lib/components/Editor.svelte";
    import Menu from "$lib/components/Menu.svelte";
    import Sidebar from "$lib/components/Sidebar.svelte";
    import Viewer from "$lib/components/Viewer.svelte";
    import { Pane, Splitpanes } from "svelte-splitpanes";

    import "../app.css";
</script>

<div class="w-full flex flex-col items-center">
    <div class="container flex flex-row">
        <Sidebar />
        <div class="w-full flex flex-col">
            <div class="w-full mb-3">
                <Menu />
            </div>
            <div class="w-full flex flex-row">
                <slot />
            </div>
        </div>
    </div>
</div>

<style>
</style>
