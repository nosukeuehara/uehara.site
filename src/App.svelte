<script lang="ts">
  import Router from "svelte-spa-router";

  // Common components
  import Header from "./components/common/Header.svelte";
  import Footer from "./components/common/Footer.svelte";

  import { routes } from "./router";
  import { scrollToTop } from "./utils";
</script>

<main>
  <Header />
  <Router {routes} on:routeLoaded={scrollToTop} />
  <Footer />
</main>
