import { totp } from 'otplib';
import { decrypt } from '@/lib/security';

export function generateOTPSecret(): string {
  return totp.generateSecret();
}

export function verifyTOTP(userInput: string, encryptedSecret: string): boolean {
  const secret = decrypt(encryptedSecret);
  return totp.check(userInput, secret);
} 