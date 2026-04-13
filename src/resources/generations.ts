// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Generations extends APIResource {
  /**
   * Submit an image generation or edit job. Returns immediately with an opaque job
   * ID to poll via GET /generations/{id}.
   *
   * @example
   * ```ts
   * const generation = await client.generations.create({
   *   prompt:
   *     'A glass of iced coffee on a marble countertop, morning light streaming through a window',
   * });
   * ```
   */
  create(body: GenerationCreateParams, options?: RequestOptions): APIPromise<Generation> {
    return this._client.post('/generations', { body, ...options });
  }

  /**
   * Poll for generation status and output. On completion, the response includes
   * presigned URLs to download the generated images.
   *
   * @example
   * ```ts
   * const generation = await client.generations.get(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  get(generationID: string, options?: RequestOptions): APIPromise<Generation> {
    return this._client.get(path`/generations/${generationID}`, options);
  }
}

/**
 * Generation status and output
 */
export interface Generation {
  /**
   * Generation identifier
   */
  id: string;

  /**
   * Creation timestamp
   */
  created_at: string;

  /**
   * Model used
   */
  model: string;

  /**
   * Current state of the generation
   */
  state: 'queued' | 'processing' | 'completed' | 'failed';

  /**
   * The kind of generation to perform
   */
  type: 'image' | 'image_edit';

  /**
   * Machine-readable failure code for programmatic handling
   */
  failure_code?: 'content_moderated' | 'generation_failed' | 'output_not_found' | null;

  /**
   * Human-readable failure description
   */
  failure_reason?: string | null;

  /**
   * Generated outputs (populated on completion)
   */
  output?: Array<GenerationOutput>;
}

/**
 * A single generated output
 */
export interface GenerationOutput {
  /**
   * Media type (e.g. image)
   */
  type: string;

  /**
   * Presigned URL (1hr expiry)
   */
  url: string;
}

export interface GenerationCreateParams {
  /**
   * Text prompt
   */
  prompt: string;

  /**
   * Output aspect ratio
   */
  aspect_ratio?: '3:1' | '2:1' | '16:9' | '3:2' | '1:1' | '2:3' | '9:16' | '1:2' | '1:3' | null;

  /**
   * Reference images for style/content guidance. Up to 8 reference images.
   */
  image_ref?: Array<GenerationCreateParams.ImageRef>;

  /**
   * Model to use
   */
  model?: string;

  /**
   * Output image format
   */
  output_format?: 'png' | 'jpeg' | null;

  /**
   * Reference image for guided generation. Provide either url or inline base64 data
   * (not both).
   */
  source?: GenerationCreateParams.Source | null;

  /**
   * Style preset (auto, manga)
   */
  style?: 'auto' | 'manga';

  /**
   * The kind of generation to perform
   */
  type?: 'image' | 'image_edit';

  /**
   * Enable web search grounding — the agent can search the web and download
   * reference images before generating.
   */
  web_search?: boolean;
}

export namespace GenerationCreateParams {
  /**
   * Reference image for guided generation. Provide either url or inline base64 data
   * (not both).
   */
  export interface ImageRef {
    /**
     * Base64-encoded image data
     */
    data?: string | null;

    /**
     * MIME type (e.g. image/jpeg). Required with data.
     */
    media_type?: string | null;

    /**
     * Publicly accessible image URL
     */
    url?: string | null;
  }

  /**
   * Reference image for guided generation. Provide either url or inline base64 data
   * (not both).
   */
  export interface Source {
    /**
     * Base64-encoded image data
     */
    data?: string | null;

    /**
     * MIME type (e.g. image/jpeg). Required with data.
     */
    media_type?: string | null;

    /**
     * Publicly accessible image URL
     */
    url?: string | null;
  }
}

export declare namespace Generations {
  export {
    type Generation as Generation,
    type GenerationOutput as GenerationOutput,
    type GenerationCreateParams as GenerationCreateParams,
  };
}
