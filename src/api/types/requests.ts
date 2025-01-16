import { Skill } from "@/entities/skill";

export type InterviewSubmissionRequest = {
  date: string;
  location: string;
  positionUuid: string;
  recruiterUuid: string;
  candidateUuid: string;
};

export type PositionSubmissionRequest = {
  name: string;
  description: string;
  location: string;
  skills: Skill[];
};

export type RecruiterSubmissionRequest = {
  firstname: string;
  lastname: string;
  department: string;
  title: string;
};
