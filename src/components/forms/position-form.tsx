import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Skill } from "@/entities/skill";
import { Separator } from "../ui/separator";

const PositionForm = () => {
  const [skills, setSkills] = useState<{ id: number; value: Skill }[]>([
    { id: 1, value: { name: "", level: 1 } },
  ]);

  const handleAddSkill = () => {
    setSkills([
      ...skills,
      { id: skills.length + 1, value: { name: "", level: 0 } },
    ]);
  };

  const handleRemoveLastSkill = () => {
    setSkills(skills.slice(0, -1));
  };

  return (
    <div>
      <form>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Name" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" type="text" placeholder="Location" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              placeholder="Description"
              required
            />
          </div>
          <Separator />
          <span className="font-bold">Skills</span>
          {skills.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div>
                <Label htmlFor="skill-name">Name</Label>
                <Input
                  value={item.value.name}
                  onChange={(e) => {
                    setSkills((prev) =>
                      prev.map((skill) =>
                        skill.id === item.id
                          ? {
                              ...skill,
                              value: {
                                ...skill.value,
                                name: e.target.value,
                              },
                            }
                          : skill
                      )
                    );
                  }}
                  id="skill-name"
                  type="text"
                  placeholder="Skill name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="skill-level">Level</Label>
                <Input
                  min={1}
                  value={item.value.level}
                  onChange={(e) => {
                    setSkills((prev) =>
                      prev.map((skill) =>
                        skill.id === item.id
                          ? {
                              ...skill,
                              value: {
                                ...skill.value,
                                level: Number.parseInt(e.target.value),
                              },
                            }
                          : skill
                      )
                    );
                  }}
                  id="skill-level"
                  type="number"
                  placeholder="Skill level"
                  required
                />
              </div>
            </div>
          ))}
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleAddSkill}
              className="w-full"
            >
              Add Skill
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleRemoveLastSkill}
              className="w-full"
            >
              Remove Last Added Skill
            </Button>
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default PositionForm;
