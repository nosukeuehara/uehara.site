<script lang="ts">
  import Footer from "./components/common/Footer.svelte";
  import Header from "./components/common/Header.svelte";
  import Pagetop from "./components/section/Pagetop/Pagetop.svelte";
  import Info from "./components/section/Info/Info.svelte";
  import Me from "./components/section/Me/Me.svelte";
  import Ramble from "./components/section/Ramble/Ramble.svelte";
  import Works from "./components/section/Works/Works.svelte";
</script>

<main>
  <Header />
  <Pagetop />
  <Me />
  <Works />
  <Ramble />
  <Info />
  <Footer />
</main>
