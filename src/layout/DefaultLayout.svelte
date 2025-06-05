<script lang="ts">
  import Navbar from "../components/common/Navbar.svelte";
  import { onMount } from "svelte";

  export let child;

  let isLoaded = false;

  onMount(() => {
    setTimeout(() => {
      isLoaded = true;
    }, 100);
  });
</script>

<div class="navbar-wrapper" class:fade-in={isLoaded}></div>
<svelte:component this={child} />

<style>
</style>
