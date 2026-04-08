// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Luma } from '../client';

export abstract class APIResource {
  protected _client: Luma;

  constructor(client: Luma) {
    this._client = client;
  }
}
