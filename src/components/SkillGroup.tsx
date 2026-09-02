import type { SkillGroup } from "../data/skills";
import { TechChips } from "./TechChips";

export function SkillGroupCard({ group }: { group: SkillGroup }) {
  return (
    <div className="card h-full p-5 sm:p-6">
      <h3 className="text-sm font-semibold text-heading">{group.title}</h3>
      <TechChips items={group.items} className="mt-3.5" />
    </div>
  );
}
