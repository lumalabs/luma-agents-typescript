// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Files extends APIResource {
  /**
   * Upload a file to your namespace, then reference it from a generation via
   * ImageRef.file_id (as source, image_ref[], video.start_frame, keyframes, and so
   * on). Two upload modes share this endpoint, selected by Content-Type:
   *
   * - multipart/form-data — send the bytes inline in the `file` part. Best for small
   *   files (subject to an inline size cap; larger files must use the presigned
   *   flow). The returned file is already `pending` ingest.
   *
   * - application/json — request a presigned upload. The response `upload` envelope
   *   tells you where to PUT the bytes; afterward call POST
   *   /files/{file_id}/complete to start ingest. Use this for larger files.
   */
  create(body: FileCreateParams, options?: RequestOptions): APIPromise<CreateFileResponse> {
    return this._client.post('/files', maybeMultipartFormRequestOptions({ body, ...options }, this._client));
  }

  /**
   * List the files in your namespace, newest first. Keyset-paginated: when has_more
   * is true, pass next_cursor back as cursor.
   */
  list(query: FileListParams | null | undefined = {}, options?: RequestOptions): APIPromise<FileList> {
    return this._client.get('/files', { query, ...options });
  }

  /**
   * Soft-delete a file. It can no longer be referenced from new generations. Returns
   * 204 with no body.
   */
  delete(fileID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/files/${fileID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Finalize a presigned upload after you have PUT the bytes to the upload URL.
   * Kicks off ingest/moderation and returns the file, which transitions to `ready`
   * (or `failed`) asynchronously — poll GET /files/{file_id} to observe the terminal
   * state.
   */
  complete(fileID: string, options?: RequestOptions): APIPromise<File> {
    return this._client.post(path`/files/${fileID}/complete`, options);
  }

  /**
   * Retrieve metadata for a single file in your namespace.
   */
  get(fileID: string, options?: RequestOptions): APIPromise<File> {
    return this._client.get(path`/files/${fileID}`, options);
  }
}

/**
 * Result of POST /files. In the multipart (inline) flow `upload` is null and the
 * file is already `pending` ingest. In the presigned (JSON) flow `upload` carries
 * the PUT envelope and the file stays `pending` until you call POST
 * /files/{file_id}/complete. Top-level `id` and `state` are conveniences that
 * mirror `file.id` and `file.state`; the full record is always under `file`.
 */
export interface CreateFileResponse {
  /**
   * File identifier.
   */
  id: string;

  /**
   * A file in the caller's namespace.
   */
  file: File;

  /**
   * Lifecycle state of an uploaded file. `pending` until bytes are received and the
   * ingest pipeline runs; `ready` once it can be referenced from a generation;
   * `failed` if ingest/moderation rejected it; `deleted` after a soft-delete.
   */
  state: FileState;

  /**
   * Where to PUT the file bytes for a presigned (JSON) upload. Issue an HTTP PUT of
   * the raw bytes to `url` with the given `headers`, then call POST
   * /files/{file_id}/complete.
   */
  upload?: PresignedUpload | null;
}

/**
 * A file in the caller's namespace.
 */
export interface File {
  /**
   * File identifier, referenced as ImageRef.file_id.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * MIME type of the stored bytes (for example, image/jpeg).
   */
  mime_type: string;

  /**
   * How the file is intended to be used in a generation. `input` is the primary
   * subject (e.g. the source image for an edit); `reference` is style/content
   * guidance.
   */
  purpose: FilePurpose;

  /**
   * Size of the stored object in bytes.
   */
  size_bytes: number;

  /**
   * Lifecycle state of an uploaded file. `pending` until bytes are received and the
   * ingest pipeline runs; `ready` once it can be referenced from a generation;
   * `failed` if ingest/moderation rejected it; `deleted` after a soft-delete.
   */
  state: FileState;

  /**
   * Soft-delete timestamp, if the file was deleted.
   */
  deleted_at?: string | null;

  /**
   * TTL set at upload, if any. After this time Luma may automatically delete the
   * file and reclaim its bytes — you don't need to call DELETE yourself.
   */
  expires_at?: string | null;

  /**
   * Human-readable reason when state is failed.
   */
  failure_reason?: string | null;

  /**
   * Original filename supplied at upload, if any.
   */
  filename?: string | null;

  /**
   * The opaque end-user tag supplied at upload, echoed back unchanged.
   * Abuse-attribution only; not an access-control primitive.
   */
  user_id?: string | null;
}

/**
 * Keyset-paginated page of files, newest first. When has_more is true, pass
 * next_cursor back as the cursor query parameter to fetch the next page.
 * next_cursor is opaque.
 */
export interface FileList {
  /**
   * Files in this page.
   */
  data: Array<File>;

  /**
   * Whether more files exist beyond this page.
   */
  has_more: boolean;

  /**
   * Opaque cursor for the next page, when has_more is true.
   */
  next_cursor?: string | null;
}

/**
 * How the file is intended to be used in a generation. `input` is the primary
 * subject (e.g. the source image for an edit); `reference` is style/content
 * guidance.
 */
export type FilePurpose = 'input' | 'reference';

/**
 * Lifecycle state of an uploaded file. `pending` until bytes are received and the
 * ingest pipeline runs; `ready` once it can be referenced from a generation;
 * `failed` if ingest/moderation rejected it; `deleted` after a soft-delete.
 */
export type FileState = 'pending' | 'ready' | 'failed' | 'deleted';

/**
 * Where to PUT the file bytes for a presigned (JSON) upload. Issue an HTTP PUT of
 * the raw bytes to `url` with the given `headers`, then call POST
 * /files/{file_id}/complete.
 */
export interface PresignedUpload {
  /**
   * When the presigned URL expires.
   */
  expires_at: string;

  /**
   * HTTP method to use for the upload — always PUT.
   */
  method: string;

  /**
   * Presigned S3 URL to PUT the bytes to.
   */
  url: string;

  /**
   * Headers that must be sent with the PUT request.
   */
  headers?: { [key: string]: string };
}

export interface FileCreateParams {
  /**
   * MIME type of the bytes you will upload.
   */
  mime_type: string;

  /**
   * Exact size in bytes of the object you will PUT. Up to 5 GiB (the S3 single-PUT
   * ceiling).
   */
  size_bytes: number;

  /**
   * Optional TTL. After this time Luma may automatically delete the file and reclaim
   * its bytes.
   */
  expires_at?: string | null;

  /**
   * Optional original filename to record.
   */
  filename?: string | null;

  /**
   * How the file is intended to be used in a generation. `input` is the primary
   * subject (e.g. the source image for an edit); `reference` is style/content
   * guidance.
   */
  purpose?: FilePurpose;

  /**
   * Optional opaque end-user tag for abuse attribution. Mirrors the user_id field on
   * POST /generations.
   */
  user_id?: string | null;
}

export interface FileListParams {
  /**
   * Opaque pagination cursor from a prior response's next_cursor.
   */
  cursor?: string;

  /**
   * Maximum files to return (1–100). Defaults to 25.
   */
  limit?: number;

  /**
   * Filter to files with this purpose.
   */
  purpose?: FilePurpose;

  /**
   * Filter to files in this state.
   */
  state?: FileState;
}

export declare namespace Files {
  export {
    type CreateFileResponse as CreateFileResponse,
    type File as File,
    type FileList as FileList,
    type FilePurpose as FilePurpose,
    type FileState as FileState,
    type PresignedUpload as PresignedUpload,
    type FileCreateParams as FileCreateParams,
    type FileListParams as FileListParams,
  };
}
