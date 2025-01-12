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
};

export type ApplicationList = Application[];

export type ApplicationReduced = {
  uuid: string;
  status: string;
  candidate_first_name: string;
  candidate_last_name: string;
  candidate_email: string;
  candidate_phone: string;
  candidate_cv: string;
  position_name: string;
  position_location: string;
};

export const dummyApplications: ApplicationReduced[] = [
  {
    uuid: "1",
    status: "NEW",
    candidate_first_name: "John",
    candidate_last_name: "Doe",
    candidate_email: "johndoe@example.com",
    candidate_phone: "123-456-7890",
    candidate_cv: "john_doe_cv.pdf",
    position_name: "Software Engineer",
    position_location: "New York",
  },
  {
    uuid: "2",
    status: "PRELIMINARY",
    candidate_first_name: "Jane",
    candidate_last_name: "Smith",
    candidate_email: "janesmith@example.com",
    candidate_phone: "234-567-8901",
    candidate_cv: "jane_smith_cv.pdf",
    position_name: "Product Manager",
    position_location: "San Francisco",
  },
  {
    uuid: "3",
    status: "PRELIMINARY REJECTED",
    candidate_first_name: "Michael",
    candidate_last_name: "Brown",
    candidate_email: "michaelbrown@example.com",
    candidate_phone: "345-678-9012",
    candidate_cv: "michael_brown_cv.pdf",
    position_name: "UI/UX Designer",
    position_location: "Seattle",
  },
  {
    uuid: "4",
    status: "PRELIMINARY PASSED",
    candidate_first_name: "Emily",
    candidate_last_name: "Davis",
    candidate_email: "emilydavis@example.com",
    candidate_phone: "456-789-0123",
    candidate_cv: "emily_davis_cv.pdf",
    position_name: "Data Analyst",
    position_location: "Boston",
  },
  {
    uuid: "5",
    status: "INTERVIEW",
    candidate_first_name: "William",
    candidate_last_name: "Johnson",
    candidate_email: "williamjohnson@example.com",
    candidate_phone: "567-890-1234",
    candidate_cv: "william_johnson_cv.pdf",
    position_name: "Backend Developer",
    position_location: "Chicago",
  },
  {
    uuid: "6",
    status: "INTERVIEW REJECTED",
    candidate_first_name: "Olivia",
    candidate_last_name: "Martinez",
    candidate_email: "oliviamartinez@example.com",
    candidate_phone: "678-901-2345",
    candidate_cv: "olivia_martinez_cv.pdf",
    position_name: "Frontend Developer",
    position_location: "Austin",
  },
  {
    uuid: "7",
    status: "INTERVIEW PASSED",
    candidate_first_name: "James",
    candidate_last_name: "Wilson",
    candidate_email: "jameswilson@example.com",
    candidate_phone: "789-012-3456",
    candidate_cv: "james_wilson_cv.pdf",
    position_name: "DevOps Engineer",
    position_location: "Denver",
  },
  {
    uuid: "8",
    status: "ACCEPTED",
    candidate_first_name: "Sophia",
    candidate_last_name: "Garcia",
    candidate_email: "sophiagarcia@example.com",
    candidate_phone: "890-123-4567",
    candidate_cv: "sophia_garcia_cv.pdf",
    position_name: "Machine Learning Engineer",
    position_location: "Atlanta",
  },
  {
    uuid: "9",
    status: "REJECTED",
    candidate_first_name: "Alexander",
    candidate_last_name: "Anderson",
    candidate_email: "alexanderanderson@example.com",
    candidate_phone: "901-234-5678",
    candidate_cv: "alexander_anderson_cv.pdf",
    position_name: "Cloud Engineer",
    position_location: "Dallas",
  },
  {
    uuid: "10",
    status: "NEW",
    candidate_first_name: "Isabella",
    candidate_last_name: "Lee",
    candidate_email: "isabellalee@example.com",
    candidate_phone: "012-345-6789",
    candidate_cv: "isabella_lee_cv.pdf",
    position_name: "Business Analyst",
    position_location: "Los Angeles",
  },
  {
    uuid: "11",
    status: "INTERVIEW PASSED",
    candidate_first_name: "James",
    candidate_last_name: "Wilson",
    candidate_email: "jameswilson@example.com",
    candidate_phone: "789-012-3456",
    candidate_cv: "james_wilson_cv.pdf",
    position_name: "DevOps Engineer",
    position_location: "Denver",
  },
  {
    uuid: "12",
    status: "ACCEPTED",
    candidate_first_name: "Sophia",
    candidate_last_name: "Garcia",
    candidate_email: "sophiagarcia@example.com",
    candidate_phone: "890-123-4567",
    candidate_cv: "sophia_garcia_cv.pdf",
    position_name: "Machine Learning Engineer",
    position_location: "Atlanta",
  },
  {
    uuid: "13",
    status: "REJECTED",
    candidate_first_name: "Alexander",
    candidate_last_name: "Anderson",
    candidate_email: "alexanderanderson@example.com",
    candidate_phone: "901-234-5678",
    candidate_cv: "alexander_anderson_cv.pdf",
    position_name: "Cloud Engineer",
    position_location: "Dallas",
  },
];
