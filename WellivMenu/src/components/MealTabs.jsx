import { useState } from "react";
import { t } from "../i18n/strings.js";

const MEAL_KEYS = [
  { id: "breakfast", labelKey: "breakfast" },
  { id: "lunch", labelKey: "lunch" },
  { id: "dinner", labelKey: "dinner" },
];

// day: { date, dateLabel, meals: { breakfast: Group[], lunch: Group[], dinner: Group[] } }
// Group: { category: string|null, items: string[] }
export default function MealTabs({ locale, day }) {
  const [active, setActive] = useState("breakfast");

  const groups = day?.meals?.[active] ?? [];

  return (
    <div className="meal-tabs">
      <div className="meal-tabs__list" role="tablist">
        {MEAL_KEYS.map((meal) => (
          <button
            key={meal.id}
            role="tab"
            aria-selected={active === meal.id}
            className={`meal-tabs__tab${active === meal.id ? " is-active" : ""}`}
            onClick={() => setActive(meal.id)}
          >
            {t(locale, meal.labelKey)}
          </button>
        ))}
      </div>

      <div className="meal-tabs__panel" role="tabpanel">
        {groups.length === 0 ? (
          <p className="meal-tabs__empty">{t(locale, "noData")}</p>
        ) : (
          groups.map((group, gIdx) => (
            <div className="meal-tabs__group" key={gIdx}>
              {group.category && (
                <h3 className="meal-tabs__group-title">{group.category}</h3>
              )}
              <ul className="meal-tabs__items">
                {group.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
