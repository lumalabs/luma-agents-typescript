// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { LumaAgents } from '../client';

export abstract class APIResource {
  protected _client: LumaAgents;

  constructor(client: LumaAgents) {
    this._client = client;
  }
}
