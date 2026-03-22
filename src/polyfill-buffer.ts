/**
 * Must load before any module that imports `csv-parse` (Node's Buffer at module init).
 * Do not import app code from this file.
 */
import { Buffer } from "buffer";

globalThis.Buffer = Buffer;
