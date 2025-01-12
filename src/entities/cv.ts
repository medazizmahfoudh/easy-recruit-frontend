import type { SkillList } from "./skill";

export type Cv = {
  uuid: string;
  applicationUuid: string;
  document: File;
  skills: SkillList;
};
export type CvList = Cv[];
