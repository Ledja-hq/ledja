import { registerAs } from '@nestjs/config';

export default registerAs('stellar', () => ({
  network: process.env.STELLAR_NETWORK || 'testnet',
  horizonUrl:
    process.env.STELLAR_HORIZON_URL || 'https://horizon-testnet.stellar.org',
  platformWallet: process.env.STELLAR_PLATFORM_WALLET,
  platformSecret: process.env.STELLAR_PLATFORM_SECRET,
}));
