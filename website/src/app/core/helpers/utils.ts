export function daysBetween(a: string | Date, b: string | Date): number {
  if (!a || !b) return 0;
  const dateA = new Date(a);
  const dateB = new Date(b);
  if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;
  
  // Calculate difference in ms and convert to days (minimum 1 day)
  const diffTime = Math.abs(dateB.getTime() - dateA.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays || 1;
}

export function fmtMoney(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '$0';
  return '$' + Math.round(amount).toLocaleString('en-US');
}

export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return function (...args: Parameters<T>) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
}

export function generateBookingReference(): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let ref = '';
  for (let i = 0; i < 6; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `VEL-${ref}`;
}

/**
 * Simulates a secure HMAC-SHA256 signature generation.
 * In a real application, this is signed on the server with a private key.
 * This prevents client-side request modification (e.g., price tampering).
 */
export function generateSignature(payload: any, secretKey: string): string {
  const jsonStr = JSON.stringify(payload);
  let hash = 0;
  for (let i = 0; i < jsonStr.length; i++) {
    const char = jsonStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Mix in the key
  let secretHash = 0;
  for (let i = 0; i < secretKey.length; i++) {
    const char = secretKey.charCodeAt(i);
    secretHash = (secretHash << 5) - secretHash + char;
    secretHash = secretHash & secretHash;
  }
  
  const combined = Math.abs(hash ^ secretHash).toString(16).toUpperCase();
  return combined.padStart(8, '0');
}
