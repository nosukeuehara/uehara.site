const defaultBitpetCampaignEndAt = "2026-09-15T14:59:59.000Z";

export type BitpetCampaign = {
  active: boolean;
  endAt: Date;
  endLabel: string;
  daysRemaining: number;
};

export function getBitpetCampaign(now = new Date()): BitpetCampaign {
  const endAt = new Date(
    import.meta.env.VITE_BITPET_CAMPAIGN_END_AT ?? defaultBitpetCampaignEndAt
  );
  const active = !Number.isNaN(endAt.getTime()) && now <= endAt;
  const daysRemaining = Math.max(
    0,
    Math.ceil((endAt.getTime() - now.getTime()) / 86_400_000)
  );

  return {
    active,
    endAt,
    endLabel: "2026.09.15 23:59 JST",
    daysRemaining,
  };
}
