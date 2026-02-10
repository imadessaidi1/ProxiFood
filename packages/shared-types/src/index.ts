export type UserRole = 'CUSTOMER' | 'COURIER' | 'RESTAURANT' | 'ADMIN';

export interface DispatchFareConfig {
  minFare: number;
  base: number;
  perKm: number;
  perMin: number;
}

export const computeCourierPay = (cfg: DispatchFareConfig, km: number, min: number) =>
  Math.max(cfg.minFare, cfg.base + km * cfg.perKm + min * cfg.perMin);
