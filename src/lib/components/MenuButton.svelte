<script>
    export let onClick = () => {}
</script>

<button class="menuButton" on:click={onClick}>
    <slot />
</button>

<style>
    .menuButton {
        margin: 0;

        border: none;
        border-radius: var(--secondary-radius);

        padding: 6px 12px;

        cursor: pointer;
    }
</style>