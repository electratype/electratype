<script>
    import { page } from '$app/stores';

    import "/src/app.css";

    import MenuButton from "./MenuButton.svelte";
    import { socket } from "../../hooks.client";

    import { createMenubar, melt } from '@melt-ui/svelte'
    import { onMount } from 'svelte';
    const {
        elements: { menubar },
        builders: { createMenu }
    } = createMenubar()
    const {elements: { menu: menuA, item: itemA, trigger: triggerA }} = createMenu()
    const {elements: { menu: menuB, item: itemB, trigger: triggerB, separator: separatorB }} = createMenu()
    const {elements: { menu: menuC, item: itemC, trigger: triggerC }} = createMenu()
    const {elements: { menu: menuD, item: itemD, trigger: triggerD }} = createMenu()
    const {elements: { menu: menuE, item: itemE, trigger: triggerE }} = createMenu()

    function toggleEditor () {

        let current_location = window.location;
        if (current_location.pathname === '/') {
            window.location.replace(window.location.href + 'editor');
        } else {
            window.location.replace(window.location.origin);
        }
    }

</script>

<div use:melt={$menubar} class="flex rounded-md bg-white p-1 w-min">
    <button on:click={toggleEditor} class:active={$page.url.pathname === '/editor'}>Editor</button>
    <div use:melt={$menuA}>
    </div>
    <button use:melt={$triggerB} class="trigger">File</button>
    <div class="menu" use:melt={$menuB}>
        <div class="item" {...$itemB} use:itemB>New file...</div>
        <div class="separator" use:melt={$separatorB} />
        <div class="item" {...$itemB} use:itemB>
            Save
            <div class="rightSlot">⌘T</div>
        </div>
        <div class="item" {...$itemB} use:itemB>Save As...</div>
    </div>
    <button use:melt={$triggerC} class="trigger">Edit</button>
    <div class="menu" use:melt={$menuC}>
        <div class="item" {...$itemC} use:itemC>Preferences</div>
    </div>
    <button use:melt={$triggerD} class="trigger">View</button>
    <div class="menu" use:melt={$menuD}>
        <div class="item" {...$itemD} use:itemD>Preferences</div>
    </div>
    <button use:melt={$triggerE} class="trigger">Help</button>
    <div class="menu" use:melt={$menuE}>
        <div class="item" {...$itemE} use:itemE>Preferences</div>
    </div>
</div>

<style lang="postcss">

    .menu {
        @apply z-10 flex max-h-[300px] min-w-[220px] flex-col shadow-lg shadow-neutral-900/30;
        @apply rounded-md bg-white p-1 lg:max-h-none;
        @apply ring-0 !important;
    }

    .subMenu {
        @apply min-w-[220px] shadow-md shadow-neutral-900/30;
    }

    button {
        @apply !cursor-default text-sm font-medium leading-none focus:z-30 focus:ring;
        @apply inline-flex items-center justify-center rounded-md bg-white px-3 py-2;
        
    }

    .trigger {
        @apply text-magnum-900 transition-colors hover:bg-white/90 data-[highlighted]:outline-none;
        @apply overflow-visible data-[highlighted]:bg-magnum-200 data-[highlighted]:ring-magnum-400 !important;
    }

    .item {
        @apply relative h-6 min-h-[24px] select-none rounded-sm pl-6 pr-1;
        @apply z-20 text-magnum-900 outline-none;
        @apply data-[highlighted]:bg-magnum-200 data-[highlighted]:text-magnum-900;
        @apply data-[disabled]:text-neutral-300;
        @apply flex items-center text-sm leading-none;
        @apply cursor-default ring-0 !important;
    }

    .separator {
        @apply m-[5px] h-[1px] bg-magnum-200;
    }

    .rightSlot {
        @apply ml-auto pl-5;
    }

    button.active {
        @apply bg-gray-200;
    }

 
</style>
