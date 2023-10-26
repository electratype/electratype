<script>
    import App from "$lib/components/App.svelte";
    import Menu from "$lib/components/Menu.svelte";
    import Sidebar from "$lib/components/Sidebar.svelte";

    import "../app.css";
</script>

<div class="w-full flex flex-col items-center h-full">
    <div class="container flex flex-row h-full">
        <Sidebar />
        <div class="w-full flex flex-col">
            <div class="w-full mb-3">
                <Menu />
            </div>
            <div class="w-full flex flex-col h-full">
                <App />
            </div>
        </div>
    </div>
</div>
