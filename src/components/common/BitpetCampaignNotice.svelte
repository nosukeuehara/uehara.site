<script lang="ts">
  import { link } from "svelte-spa-router";
  import type { BitpetCampaign } from "../../campaign";

  export let campaign: BitpetCampaign;
</script>

{#if campaign.active}
  <aside class="bitpet-campaign" aria-label="BitPet release campaign">
    <div class="bitpet-campaign__pet" aria-hidden="true">
      <span> /\_/\</span>
      <span>( o.o )</span>
      <span> &gt; ^ &lt;</span>
    </div>
    <div class="bitpet-campaign__body">
      <p class="bitpet-campaign__kicker">BITPET RELEASE MODE</p>
      <p class="bitpet-campaign__copy">
        8bit skin until {campaign.endLabel}
        <span class="bitpet-campaign__days">
          {campaign.daysRemaining} days left
        </span>
      </p>
    </div>
    <div class="bitpet-campaign__actions">
      <a href="/bitpet" use:link>PLAY</a>
      <a
        href="https://github.com/nosukeuehara/bitpet"
        target="_blank"
        rel="noreferrer"
      >
        CODE
      </a>
    </div>
  </aside>
{/if}

<style>
  .bitpet-campaign {
    align-items: center;
    background: var(--pixel-panel);
    border: var(--pixel-border);
    box-shadow: var(--pixel-shadow);
    color: var(--pixel-ink);
    display: grid;
    gap: 12px;
    grid-template-columns: auto 1fr auto;
    left: 16px;
    max-width: min(680px, calc(100vw - 32px));
    padding: 10px 12px;
    position: fixed;
    right: 16px;
    bottom: 16px;
    z-index: 1100;
  }

  .bitpet-campaign__pet {
    color: var(--pixel-green);
    display: grid;
    font-family: var(--font-pixel);
    font-size: 10px;
    line-height: 1;
    white-space: pre;
  }

  .bitpet-campaign__body {
    min-width: 0;
  }

  .bitpet-campaign__kicker,
  .bitpet-campaign__copy,
  .bitpet-campaign__days,
  .bitpet-campaign__actions a {
    font-family: var(--font-pixel);
    letter-spacing: 0;
  }

  .bitpet-campaign__kicker {
    color: var(--pixel-red);
    font-size: var(--font-size-xxs);
    font-weight: var(--font-weight-bold);
    margin-bottom: 2px;
  }

  .bitpet-campaign__copy {
    color: var(--pixel-ink);
    font-size: var(--font-size-xs);
  }

  .bitpet-campaign__days {
    color: var(--pixel-blue);
    display: inline-block;
    margin-left: 8px;
  }

  .bitpet-campaign__actions {
    display: flex;
    gap: 8px;
  }

  .bitpet-campaign__actions a {
    background: var(--pixel-yellow);
    border: 2px solid var(--pixel-ink);
    color: var(--pixel-ink);
    display: inline-flex;
    font-size: var(--font-size-xxs);
    font-weight: var(--font-weight-bold);
    padding: 6px 8px;
    text-decoration: none;
  }

  .bitpet-campaign__actions a:hover {
    background: var(--pixel-green);
    color: var(--pixel-ink);
    transform: translate(-2px, -2px);
  }

  @media (max-width: 640px) {
    .bitpet-campaign {
      grid-template-columns: 1fr;
      left: 12px;
      right: 12px;
    }

    .bitpet-campaign__pet {
      display: none;
    }

    .bitpet-campaign__actions {
      justify-content: stretch;
    }

    .bitpet-campaign__actions a {
      justify-content: center;
      flex: 1;
    }
  }
</style>
