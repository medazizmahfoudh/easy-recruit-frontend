import type { SkillList } from "./skill";

export type Position = {
  uuid: string;
  name: string;
  description: string;
  location: string;
  requiredSkills: SkillList;
};
export type PositionList = Position[];
