<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Router from "svelte-spa-router";
  import "./styles/animations.css";
  // Common components
  import BitpetCampaignNotice from "./components/common/BitpetCampaignNotice.svelte";
  import Header from "./components/common/Header.svelte";
  import Footer from "./components/common/Footer.svelte";

  import { getBitpetCampaign } from "./campaign";
  import { routes } from "./router";
  import { scrollToTop } from "./utils";

  let campaign = getBitpetCampaign();
  let campaignTimer: number | undefined;

  function syncCampaignTheme() {
    campaign = getBitpetCampaign();
    document.body.classList.toggle("bitpet-campaign-theme", campaign.active);
  }

  onMount(() => {
    syncCampaignTheme();
    campaignTimer = window.setInterval(syncCampaignTheme, 60_000);
  });

  onDestroy(() => {
    if (campaignTimer) {
      window.clearInterval(campaignTimer);
    }
  });
</script>

<main>
  <Header />
  <BitpetCampaignNotice {campaign} />
  <Router {routes} on:routeLoaded={scrollToTop} />
  <Footer />
</main>
