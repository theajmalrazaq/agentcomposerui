// ============================================================
// AgentComposerUI — Shared Types
// ============================================================

/** Status of a composer component's lifecycle */
export type ComposerStatus = "idle" | "streaming" | "reviewing" | "approved" | "rejected";

/** A single stage in the multi-stage generation pipeline */
export interface ComposerStage {
  id: string;
  label: string;
  status: "pending" | "active" | "done";
}

/** Base props shared by all composer components */
export interface BaseComposerProps<T> {
  /** The structured data produced by the AI model */
  data: T;
  /** Current status of the composer */
  status: ComposerStatus;
  /** Fired when user approves the draft with the final (possibly edited) data */
  onApprove?: (data: T) => void | Promise<void>;
  /** Fired when user rejects the draft with feedback text for the AI to revise */
  onReject?: (feedback: string) => void | Promise<void>;
  /** Fired when user edits any field in the composer */
  onChange?: (data: T) => void;
  /** Optional array of generation stages to display progress */
  stages?: ComposerStage[];
  /** Additional CSS class names */
  className?: string;
}
