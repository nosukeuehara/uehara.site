<script lang="ts">
  import Pagetop from "../components/section/Sectiontop/Sectiontop.svelte";
  import Info from "../components/section/Info/Info.svelte";
  import Me from "../components/section/Me/Me.svelte";
  import Huuud from "../components/section/Huuud/Huuud.svelte";
  import Works from "../components/section/Works/Works.svelte";
  import Seo from "../lib/Seo.svelte";
  import { pageSeo, siteJsonLd } from "../seo";
</script>

<Seo {...pageSeo.home} jsonLd={siteJsonLd()} />
<Pagetop />
<Me />
<Works />
<Huuud />
<Info />
