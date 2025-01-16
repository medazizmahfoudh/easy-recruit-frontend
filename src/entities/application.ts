import type { Candidate } from "./candidate";
import type { Cv } from "./cv";
import type { Position } from "./position";

export enum ApplicationStatus {
  NEW = 0,
  PRELIMINARY = 10,
  PRELIMINARY_REJECTED = 9,
  PRELIMINARY_PASSED = 11,
  INTERVIEW = 20,
  INTERVIEW_REJECTED = 19,
  INTERVIEW_PASSED = 21,
  ACCEPTED = 1,
  REJECTED = -1,
}

export const applicationStatusToString = (
  status: ApplicationStatus
): string => {
  switch (status) {
    case ApplicationStatus.NEW:
      return "NEW";
    case ApplicationStatus.PRELIMINARY:
      return "PRELIMINARY";
    case ApplicationStatus.PRELIMINARY_REJECTED:
      return "PRELIMINARY REJECTED";
    case ApplicationStatus.PRELIMINARY_PASSED:
      return "PRELIMINARY PASSED";
    case ApplicationStatus.INTERVIEW:
      return "INTERVIEW";
    case ApplicationStatus.INTERVIEW_REJECTED:
      return "INTERVIEW REJECTED";
    case ApplicationStatus.INTERVIEW_PASSED:
      return "INTERVIEW PASSED";
    case ApplicationStatus.ACCEPTED:
      return "ACCEPTED";
    case ApplicationStatus.REJECTED:
      return "REJECTED";
    default:
      return "UNKNOWN";
  }
};

export type Application = {
  uuid: string;
  candidate: Candidate;
  position: Position;
  cv: Cv;
  status: ApplicationStatus;
};

export type ApplicationList = Application[];

export type ApplicationReduced = {
  uuid: string;
  status: ApplicationStatus;
  candidate_first_name: string;
  candidate_last_name: string;
  candidate_email: string;
  // candidate_cv: File;
  position_name: string;
  position_location: string;
};
