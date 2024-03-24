import { SUI_CLIENT } from "./suiClient";

export class SuiService {
    async getFormattedBalance(owner: string) {
        const res = await SUI_CLIENT.getBalance({
            owner
        });
        return Number(Number(res.totalBalance) / 1000_000_000).toFixed(2);
    }
    async requestSuiFromFaucet(network: 'localnet'|'devnet'|'testnet', address: string) {
        let faucetUrl: string;
        if (network == 'localnet') {
            faucetUrl='http://127.0.0.1:9123/gas';
        }
        else if (network == 'devnet') {
            faucetUrl='https://faucet.devnet.sui.io/v1/gas';
        }
        else { // network == 'testnet'
            faucetUrl='https://faucet.testnet.sui.io/v1/gas';
        }
    
        return fetch(faucetUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                FixedAmountRequest: {
                    recipient: address
                }
            }),
        });
    }
}