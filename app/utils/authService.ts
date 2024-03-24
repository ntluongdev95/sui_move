import axios from "axios";
import { SUI_CLIENT } from "./suiClient";
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { generateNonce, generateRandomness, getExtendedEphemeralPublicKey } from '@mysten/zklogin';
import { jwtToAddress } from '@mysten/zklogin';
import { genAddressSeed, getZkLoginSignature } from "@mysten/zklogin";
import { jwtDecode } from "jwt-decode";
import { SerializedSignature } from "@mysten/sui.js/cryptography";
import { JwtPayload, PartialZkLoginSignature } from "../types/userType";


const PROVER_URL:string = process.env.NEXT_PUBLIC_PROVER_URL ||'' ;
const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL || '';
const OPENID_PROVIDER_URL = process.env.NEXT_PUBLIC__PROVIDER_URL || '';
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export class AuthService {

    static getAddressSeed() {
        const jwt = AuthService.decodeJwt();
        const salt = AuthService.salt();
        return genAddressSeed(BigInt(salt!), "sub", jwt.sub as string, jwt.aud as string).toString();
    }


    static getEd25519Keypair(): Ed25519Keypair {
        const jwtData = AuthService.getJwtData();
        const publicKey = new Uint8Array(Object.values(jwtData.ephemeralKeyPair.keypair.publicKey));
        const secretKey = new Uint8Array(Object.values(jwtData.ephemeralKeyPair.keypair.secretKey));
        return new Ed25519Keypair({ publicKey, secretKey })
    }

    static async getPartialZkLoginSignature(): Promise<any> {
        const keyPair = AuthService.getEd25519Keypair();
        const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(keyPair.getPublicKey());
        const verificationPayload = {
            jwt: AuthService.jwt(),
            extendedEphemeralPublicKey,
            maxEpoch: this.getMaxEpoch(),
            jwtRandomness: this.getRandomness(),
            salt: AuthService.salt(),
            keyClaimName: "sub"
        };
        return await AuthService.verifyPartialZkLoginSignature(verificationPayload);
    }

    private static async verifyPartialZkLoginSignature(zkpRequestPayload: any) {
        try {
            const proofResponse = await axios.post('https://prover-dev.mystenlabs.com/v1', zkpRequestPayload, {
                headers: {
                    'content-type': 'application/json'
                }
            });
            const partialZkLoginSignature = proofResponse.data as PartialZkLoginSignature;
            return partialZkLoginSignature;
        } catch (error) {
            console.log("failed to reqeust the partial sig: ", error);
            return {};
        }
    }

    static async generateZkLoginSignature(userSignature: string): Promise<SerializedSignature> {
        const partialZkLoginSignature = await AuthService.getPartialZkLoginSignature();
        const addressSeed = AuthService.getAddressSeed();
        const maxEpoch = AuthService.getMaxEpoch();
        return getZkLoginSignature({
            inputs: {
                ...partialZkLoginSignature,
                addressSeed
            },
            maxEpoch,
            userSignature,
        });
    }

    static getMaxEpoch() {
        return AuthService.getJwtData().maxEpoch;
    }

    private static getJwtData() {
        return JSON.parse(sessionStorage.getItem("jwt_data") as string);
    }

    private static decodeJwt(): JwtPayload {
        const jwt = sessionStorage.getItem('sui_jwt_token');
        return jwtDecode(jwt as string) as JwtPayload;
    }

    private static salt() {
        //const email = AuthService.claims()['email'];
        return AuthService.hashcode("ntluongbn62@gmail.com");
    }

    static  walletAddress() {
        const email = AuthService.claims()['email'];
        return jwtToAddress(AuthService.jwt() as string,AuthService.hashcode("ntluongbn62@gmail.com"));
    }

    private static claims() {
        const token = AuthService.jwt();
        if (token)
        return JSON.parse(atob(token.split('.')[1]));
        
    }



    private static hashcode(s: string) {
        var h = 0, l = s.length, i = 0;
        if (l > 0)
            while (i < l)
                h = (h << 5) - h + s.charCodeAt(i++) | 0;
        return h.toString();
    }

    static isAuthenticated() {
        const token = AuthService.jwt();
        return token && token !== 'null';
    }

    static jwt() {
        return sessionStorage.getItem("sui_jwt_token");
    }
    
    static getRandomness() {
        return AuthService.getJwtData().randomness;
    }
    
    async completeZkLogin()
    {
        const urlFragment = window.location.hash.substring(1);
        const urlParams = new URLSearchParams(urlFragment);
        const jwt = urlParams.get('id_token');
        
        if (!jwt) {
            return;
        }
        sessionStorage.setItem("sui_jwt_token", JSON.stringify(jwt));
        window.history.replaceState(null, '', window.location.pathname);
        const userAddr = AuthService.walletAddress()
        // === Save data to session storage so sendTransaction() can use it ===
        sessionStorage.setItem("user", JSON.stringify(userAddr));
    }

    async login() {
        const { epoch } = await SUI_CLIENT.getLatestSuiSystemState(); 
        const maxEpoch = Number(epoch) + 2222;
        const ephemeralKeyPair = new Ed25519Keypair();
        const randomness = generateRandomness();
        const nonce = generateNonce(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);
        const jwtData = {
            maxEpoch,
            nonce,
            randomness,
            ephemeralKeyPair,
        };

        sessionStorage.setItem("jwt_data", JSON.stringify(jwtData));

        const params = new URLSearchParams({
            client_id: CLIENT_ID || '',
            redirect_uri: REDIRECT_URL,
            response_type: 'id_token',
            scope: 'openid ',
            nonce: nonce,
        });

        try {
            // const { data } = await axios.get(OPENID_PROVIDER_URL);  
            // const authUrl = `${data.authorization_endpoint}?${params}`;
            const authUrl = `${`https://accounts.google.com/o/oauth2/v2/auth?${params}`}`;
            window.location.href = authUrl;
            
        } catch (error) {
            console.error('Error initiating Google login:', error);
        }
    }
}

