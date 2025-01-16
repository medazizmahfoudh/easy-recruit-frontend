import { Candidate } from "./candidate";
import { Evaluation } from "./evaluation";
import type { Position } from "./position";
import type { Recruiter } from "./recruiter";

export enum InterviewStatus {
  SCHEDULED = "Scheduled",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export type Interview = {
  uuid: string;
  position: Position;
  recruiter: Recruiter;
  candidate: Candidate;
  evaluation: Evaluation;
  date: Date;
  location: string;
  status: InterviewStatus;
  comment: string;
};

export type InterviewList = Interview[];

export type InterviewReduced = {
  uuid: string;
  position_name: string;
  recruiter_name: string;
  candidate_name: string;
  date: Date;
  status: string;
  comment: string;
  location: string;
};
