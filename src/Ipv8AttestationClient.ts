import fetch from 'node-fetch'
import { Attribute, OutstandingRequest, ApiResponse, OutstandingVerifyRequest, VerificationOutput } from './types/ipv8'

export class Ipv8AttestationClient {
  private baseUrl: string

  /**
   * Create a new Ipv8Peer instance
   *
   * @param {string} apiUrl Base url of the Ipv8 rest api including the port
   */
  constructor (apiUrl: string) {
    this.baseUrl = apiUrl
  }

  /**
   * Get all other visible peers in the network
   *
   * @return Array of peer identifiers
   */
  async getPeers (): Promise<string[]> {
    const urlParams = new URLSearchParams({ type: 'peers' })
    const res = await fetch(`${this.baseUrl}/attestations` + urlParams)

    if (res.status < 200) {
      throw new Error('Error when sending request to Ipv8')
    }

    return res.json()
  }

  /**
   * Get all attested attributes of this peer
   *
   * @param {string} mid Base64 encoded peer reference
   * @return All attributes of the current peer.
   */
  async getAttributes (mid: string = null): Promise<Attribute[]> {
    const urlParams = new URLSearchParams({ type: 'attributes', mid: mid })
    const res = await fetch(`${this.baseUrl}/attestations` + urlParams)

    if (res.status < 200) {
      throw new Error('Error when sending request to Ipv8')
    }

    const json: string[][] = await res.json()
    return json.map(attribute => ({
      name: attribute[0],
      hash: attribute[1],
      metadata: attribute[2],
      attestor: attribute[3]
    }))
  }

  /**
   * Get all outsanding requests for attestation
   */
  async getOutstanding (): Promise<OutstandingRequest> {
    const urlParams = new URLSearchParams({ type: 'outstanding' })
    const res = await fetch(`${this.baseUrl}/attestations` + urlParams)

    if (res.status < 200) {
      throw new Error('Error when sending request to Ipv8')
    }

    return res.json()
  }

  /**
   * Get all outstanding requests for verification
   */
  async getOutstandingVerify (): Promise<OutstandingVerifyRequest> {
    const urlParams = new URLSearchParams({ type: 'outstanding_verify' })
    const res = await fetch(`${this.baseUrl}/attestations` + urlParams)

    if (res.status < 200) {
      throw new Error('Error when sending request to Ipv8')
    }

    return res.json()
  }

  /**
   * Get the results of requested verifications
   */
  async getVerificationOutput (): Promise<VerificationOutput> {
    const urlParams = new URLSearchParams({ type: 'verification_output' })
    const res = await fetch(`${this.baseUrl}/attestations` + urlParams)

    if (res.status < 200) {
      throw new Error('Error when sending request to Ipv8')
    }

    return res.json()
  }

  /**
   * Request another peer to attest an attribute
   *
   * @param attributeName Attribute (or claim) that needs attestation
   */
  async requestAttestation (attributeName: string, peerToAttest: string, metadata: object = {}): Promise<ApiResponse> {
    const urlParams = new URLSearchParams({
      type: 'request',
      mid: peerToAttest,
      metadata: JSON.stringify(metadata),
      // eslint-disable-next-line @typescript-eslint/camelcase
      attribute_name: attributeName
    })

    const res = await fetch(`${this.baseUrl}/attestations` + urlParams, { method: 'POST' })

    if (res.status < 200) {
      throw new Error('Error when sending request to Ipv8')
    }

    return res.json()
  }
}
