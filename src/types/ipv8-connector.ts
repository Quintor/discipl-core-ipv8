export type ClaimData = { [key: string]: Claim } | Claim

export type ClaimInfo = {
    data: object;
    previous?: string;
}

export type Claim = {
    attributeName: string;
    metadata: {
        attestorMid: string;
        attestorUrl: string;
        requesterMid: string;
        requesterUrl: string;
    };
}

export type Peer = {
    mid: string;
    url: string;
}
