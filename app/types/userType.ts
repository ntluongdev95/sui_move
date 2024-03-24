import { getZkLoginSignature } from "@mysten/zklogin";

export interface JwtPayload {
    iss?: string;
    sub?: string;
    aud?: string[] | string;
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
}
export interface AccountData {
    userAddr: string;
    zkProofs: any;
    ephemeralPrivateKey: string;
    userSalt: string;
    sub: string;
    aud: string;
    maxEpoch: number;
}

export type PartialZkLoginSignature = Omit<
    Parameters<typeof getZkLoginSignature>['0']['inputs'],
    'addressSeed'
>;