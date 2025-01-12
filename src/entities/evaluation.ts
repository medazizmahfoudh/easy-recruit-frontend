export enum EvaluationStatus {
  IDLE = "Idle",
  COMPLETED = "Completed",
}

export enum RecruitmentStep {
  PRELIMINARY = "Preliminary",
  INTERVIEW = "Interview",
}

export interface Evaluation {
  id: number;
  uuid: string;
  applicationUuid: string;
  step: RecruitmentStep;
  score: number;
  decision: string;
  feedback: string;
  status: EvaluationStatus;
}
