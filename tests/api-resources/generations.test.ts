// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Luma from 'luma-agents';

const client = new Luma({ authToken: 'My Auth Token', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource generations', () => {
  test('create: only required params', async () => {
    const responsePromise = client.generations.create({ prompt: 'A glass of iced coffee on a marble countertop, morning light streaming through a window' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.generations.create({
    prompt: 'A glass of iced coffee on a marble countertop, morning light streaming through a window',
    aspect_ratio: '3:1',
    image_ref: [{
    data: 'data',
    media_type: 'media_type',
    url: 'url',
  }],
    model: 'model',
    output_format: 'png',
    source: {
    data: 'data',
    media_type: 'media_type',
    url: 'url',
  },
    style: 'auto',
    type: 'image',
    web_search: true,
  });
  });

  test('get', async () => {
    const responsePromise = client.generations.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
