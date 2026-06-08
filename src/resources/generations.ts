// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Generations extends APIResource {
  /**
   * Submit an image or video generation job. Returns immediately with an opaque job
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
 * Per-signal manual conditioning controls for video edits
 */
export interface AdvancedControls {
  /**
   * Depth / scene-geometry conditioning control
   */
  depth?: DepthControl | null;

  /**
   * Face-identity conditioning control
   */
  face?: FaceControl | null;

  /**
   * Surface-normals conditioning control
   */
  normals?: NormalsControl | null;

  /**
   * Pose / skeleton conditioning control
   */
  pose?: PoseControl | null;

  /**
   * Motion-trajectory conditioning control
   */
  trajectory?: TrajectoryControl | null;
}

/**
 * Depth / scene-geometry conditioning control
 */
export interface DepthControl {
  /**
   * Depth-map blur amount from 0 to 1. Higher values allow more geometric freedom.
   */
  blur?: number | null;

  /**
   * Enable or disable depth conditioning. Omit to use the model default.
   */
  enabled?: boolean | null;
}

/**
 * Face-identity conditioning control
 */
export interface FaceControl {
  /**
   * Enable or disable face conditioning. Omit to use the model default.
   */
  enabled?: boolean | null;
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
  model: Model;

  /**
   * Current state of the generation
   */
  state: 'queued' | 'processing' | 'completed' | 'failed';

  /**
   * The kind of generation to perform
   */
  type: 'image' | 'image_edit' | 'video' | 'video_edit' | 'video_reframe';

  /**
   * Machine-readable failure code for programmatic handling
   */
  failure_code?: GenerationFailureCode | null;

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
 * Machine-readable failure code for programmatic handling
 */
export type GenerationFailureCode =
  | 'content_moderated'
  | 'generation_failed'
  | 'budget_exhausted'
  | 'output_not_found'
  | 'image_too_large'
  | 'unsupported_format'
  | 'corrupt_input'
  | 'invalid_request'
  | 'rate_limited';

/**
 * A single generated output
 */
export interface GenerationOutput {
  /**
   * Media type (e.g. image, video)
   */
  type: string;

  /**
   * Presigned URL (1hr expiry)
   */
  url: string;
}

/**
 * Media reference for guided generation. Provide exactly one of url, inline base64
 * data, or generation_id. URL/data references accept image media at image
 * positions; video_edit and video_reframe sources also accept source.url or
 * source.data when source.media_type is a video/\* MIME. generation_id chains
 * image_edit off a prior image output, video_edit/video_reframe off a prior video
 * output, and video.start_frame/end_frame for extension.
 */
export interface ImageRef {
  /**
   * Base64-encoded image or video data
   */
  data?: string | null;

  /**
   * UUID of a prior generation owned by the same caller. Used on source for
   * image_edit, video_edit, and video_reframe chaining and on video.start_frame /
   * video.end_frame for video extension.
   */
  generation_id?: string | null;

  /**
   * MIME type (for example, image/jpeg or video/mp4). Required with data. Required
   * with source.url on video_edit/video_reframe so the route can dispatch video
   * ingest before fetching bytes; optional for image URLs.
   */
  media_type?: string | null;

  /**
   * Publicly accessible image URL, or a video URL when used as source for
   * video_edit/video_reframe with media_type=video/\*.
   */
  url?: string | null;
}

/**
 * Model identifier. `uni-1` is the default image tier; `uni-1-max` produces
 * higher-quality output than `uni-1` at a higher per-image price. `ray-3.2` is the
 * public video model for text-to-video, image-to-video, and video-to-video
 * editing.
 */
export type Model = 'uni-1' | 'uni-1-max' | 'ray-3.2';

/**
 * Surface-normals conditioning control
 */
export interface NormalsControl {
  /**
   * Surface-normals augmentation from 0 to 1. Higher values allow more
   * reinterpretation of surface geometry.
   */
  augmentation?: number | null;

  /**
   * Enable or disable normals conditioning. Omit to use the model default.
   */
  enabled?: boolean | null;
}

/**
 * Pose / skeleton conditioning control
 */
export interface PoseControl {
  /**
   * Enable or disable pose conditioning. Omit to use the model default.
   */
  enabled?: boolean | null;

  /**
   * Pose-conditioning strength
   */
  strength?: PoseControlStrength | null;
}

/**
 * Pose-conditioning strength
 */
export type PoseControlStrength = 'precise' | 'coarse';

/**
 * Normalized source rectangle inside the output canvas for video_reframe. Omit to
 * let the model choose the default centered-fit crop.
 */
export interface SourcePosition {
  /**
   * Source rectangle height, as a fraction of canvas height. Up to 2.0 so the source
   * can bleed off-canvas.
   */
  h_norm: number;

  /**
   * Source rectangle width, as a fraction of canvas width. Up to 2.0 so the source
   * can bleed off-canvas.
   */
  w_norm: number;

  /**
   * Left edge of the source rectangle, as a fraction of canvas width. May be
   * negative when the source extends off-canvas.
   */
  x_norm: number;

  /**
   * Top edge of the source rectangle, as a fraction of canvas height. May be
   * negative when the source extends off-canvas.
   */
  y_norm: number;
}

/**
 * Motion-trajectory conditioning control
 */
export interface TrajectoryControl {
  /**
   * Enable or disable trajectory conditioning. Omit to use the model default.
   */
  enabled?: boolean | null;

  /**
   * Point-trajectory sparsity from 0 to 1. Higher values use fewer motion anchors.
   */
  sparsity?: number | null;
}

/**
 * Video duration
 */
export type VideoDuration = '5s' | '10s';

/**
 * Ray 3.2 video-to-video edit controls. Only valid under `video.edit` when `type`
 * is `video_edit`.
 */
export interface VideoEditOptions {
  /**
   * When true, the model derives the control schedule from the source video. When
   * omitted, supplying strength or controls implies manual mode.
   */
  auto_controls?: boolean | null;

  /**
   * Per-signal manual conditioning controls for video edits
   */
  controls?: AdvancedControls | null;

  /**
   * Parallel list of non-negative, unique frame positions in the source video's
   * frame grid where each keyframes[i] is anchored. Must match keyframes in length.
   */
  keyframe_indexes?: Array<number> | null;

  /**
   * Multi-anchor guide-frame images at arbitrary source-frame positions (parallel
   * with keyframe_indexes). Up to 64 anchors. Mutually exclusive with
   * video.start_frame (the single-anchor case). Each entry takes the same ImageRef
   * shape as source / image_ref[].
   */
  keyframes?: Array<ImageRef> | null;

  /**
   * How much a video edit preserves or reimagines the source
   */
  strength?: VideoEditStrength | null;
}

/**
 * How much a video edit preserves or reimagines the source
 */
export type VideoEditStrength =
  | 'adhere_1'
  | 'adhere_2'
  | 'adhere_3'
  | 'flex_1'
  | 'flex_2'
  | 'flex_3'
  | 'reimagine_1'
  | 'reimagine_2'
  | 'reimagine_3';

/**
 * Ray 3.2 video request options. Common output settings live at the top level for
 * `type=video`, `type=video_edit`, and `type=video_reframe`; video-to-video
 * conditioning lives under `edit`.
 */
export interface VideoOptions {
  /**
   * Video duration
   */
  duration?: VideoDuration | null;

  /**
   * Ray 3.2 video-to-video edit controls. Only valid under `video.edit` when `type`
   * is `video_edit`.
   */
  edit?: VideoEditOptions | null;

  /**
   * Media reference for guided generation. Provide exactly one of url, inline base64
   * data, or generation_id. URL/data references accept image media at image
   * positions; video_edit and video_reframe sources also accept source.url or
   * source.data when source.media_type is a video/\* MIME. generation_id chains
   * image_edit off a prior image output, video_edit/video_reframe off a prior video
   * output, and video.start_frame/end_frame for extension.
   */
  end_frame?: ImageRef | null;

  /**
   * Export EXR alongside the MP4. Requires hdr=true.
   */
  exr_export?: boolean | null;

  /**
   * Generate HDR video. Requires HDR access. Not supported for video_reframe.
   */
  hdr?: boolean | null;

  /**
   * Generate a seamlessly looping video. Only valid for type=video; not supported
   * with duration=10s or hdr=true.
   */
  loop?: boolean | null;

  /**
   * Ray 3.2 video output resolution. 1080p is public for video generation;
   * video_reframe 1080p is still rolling out and may return a coming-soon validation
   * error until enabled for the caller.
   */
  resolution?: VideoResolution | null;

  /**
   * Normalized source rectangle inside the output canvas for video_reframe. Omit to
   * let the model choose the default centered-fit crop.
   */
  source_position?: SourcePosition | null;

  /**
   * Media reference for guided generation. Provide exactly one of url, inline base64
   * data, or generation_id. URL/data references accept image media at image
   * positions; video_edit and video_reframe sources also accept source.url or
   * source.data when source.media_type is a video/\* MIME. generation_id chains
   * image_edit off a prior image output, video_edit/video_reframe off a prior video
   * output, and video.start_frame/end_frame for extension.
   */
  start_frame?: ImageRef | null;
}

/**
 * Ray 3.2 video output resolution. 1080p is public for video generation;
 * video_reframe 1080p is still rolling out and may return a coming-soon validation
 * error until enabled for the caller.
 */
export type VideoResolution = '540p' | '720p' | '1080p';

export interface GenerationCreateParams {
  /**
   * Text prompt
   */
  prompt: string;

  /**
   * Output aspect ratio. Valid values depend on the selected model and generation
   * type; the server validates the final model-specific set.
   */
  aspect_ratio?:
    | '3:1'
    | '2:1'
    | '21:9'
    | '16:9'
    | '4:3'
    | '3:2'
    | '1:1'
    | '3:4'
    | '2:3'
    | '9:16'
    | '1:2'
    | '1:3'
    | null;

  /**
   * Reference images for style/content guidance. Up to 9 for type 'image', up to 8
   * for type 'image_edit'.
   */
  image_ref?: Array<ImageRef>;

  /**
   * Model identifier. `uni-1` is the default image tier; `uni-1-max` produces
   * higher-quality output than `uni-1` at a higher per-image price. `ray-3.2` is the
   * public video model for text-to-video, image-to-video, and video-to-video
   * editing.
   */
  model?: Model;

  /**
   * Output image format
   */
  output_format?: 'png' | 'jpeg' | null;

  /**
   * Media reference for guided generation. Provide exactly one of url, inline base64
   * data, or generation_id. URL/data references accept image media at image
   * positions; video_edit and video_reframe sources also accept source.url or
   * source.data when source.media_type is a video/\* MIME. generation_id chains
   * image_edit off a prior image output, video_edit/video_reframe off a prior video
   * output, and video.start_frame/end_frame for extension.
   */
  source?: ImageRef | null;

  /**
   * Style preset (auto, manga)
   */
  style?: 'auto' | 'manga';

  /**
   * The kind of generation to perform
   */
  type?: 'image' | 'image_edit' | 'video' | 'video_edit' | 'video_reframe';

  /**
   * Your end-user's stable opaque identifier (no PII). Forwarded to upstream model
   * providers as their per-user tagging field so trust & safety violations can be
   * attributed to a specific end-user rather than the whole API account. Also used
   * for per-end-user usage breakdowns in /v1/usage. Strongly recommended for partner
   * integrations.
   */
  user_id?: string | null;

  /**
   * Ray 3.2 video request options. Common output settings live at the top level for
   * `type=video`, `type=video_edit`, and `type=video_reframe`; video-to-video
   * conditioning lives under `edit`.
   */
  video?: VideoOptions | null;

  /**
   * Enable web search grounding — the agent can search the web and download
   * reference images before generating.
   */
  web_search?: boolean;
}

export declare namespace Generations {
  export {
    type AdvancedControls as AdvancedControls,
    type DepthControl as DepthControl,
    type FaceControl as FaceControl,
    type Generation as Generation,
    type GenerationFailureCode as GenerationFailureCode,
    type GenerationOutput as GenerationOutput,
    type ImageRef as ImageRef,
    type Model as Model,
    type NormalsControl as NormalsControl,
    type PoseControl as PoseControl,
    type PoseControlStrength as PoseControlStrength,
    type SourcePosition as SourcePosition,
    type TrajectoryControl as TrajectoryControl,
    type VideoDuration as VideoDuration,
    type VideoEditOptions as VideoEditOptions,
    type VideoEditStrength as VideoEditStrength,
    type VideoOptions as VideoOptions,
    type VideoResolution as VideoResolution,
    type GenerationCreateParams as GenerationCreateParams,
  };
}
