import type { SkillGroup } from "../data/skills";
import { TechChips } from "./TechChips";

export function SkillGroupCard({ group }: { group: SkillGroup }) {
  return (
    <div className="card flex h-full flex-col justify-between p-5 sm:p-6">
      <div>
        <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">
          {group.title}
        </h3>
        <TechChips items={group.items} className="mt-3.5" />
      </div>
    </div>
  );
}
