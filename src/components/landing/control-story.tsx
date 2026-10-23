"use client";

import { useState, useSyncExternalStore } from "react";
import {
  ArrowsClockwiseIcon,
  BookmarkSimpleIcon,
  BellSimpleIcon,
  CheckIcon,
} from "@phosphor-icons/react";

type Example = { id: string; title: string; minutes: number };
const choices = [
  {
    id: "change",
    title: "Boleh ganti pikiran.",
    description: "Lewati mood, ganti kegiatan, atau berhenti dulu.",
    icon: ArrowsClockwiseIcon,
  },
  {
    id: "favorite",
    title: "Yang cocok, simpan.",
    description: "Favorit di perangkatmu. Tanpa akun.",
    icon: BookmarkSimpleIcon,
  },
  {
    id: "reminder",
    title: "Ingatkan kalau kamu mau.",
    description: "Pengingat hanya aktif atas pilihanmu.",
    icon: BellSimpleIcon,
  },
] as const;
type Choice = (typeof choices)[number]["id"];
const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function ControlStory({ examples }: { examples: Example[] }) {
  const [choice, setChoice] = useState<Choice>("change");
  const [index, setIndex] = useState(0);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const ready = useSyncExternalStore(
    subscribeToHydration,
    clientReady,
    serverReady,
  );
  const [reminder, setReminder] = useState(false);
  const [revision, setRevision] = useState(0);
  const activity = examples[index];
  const saved = savedIds.includes(activity.id);
  const Icon = choices.find((item) => item.id === choice)!.icon;

  return (
    <section className="control-story" aria-labelledby="control-title">
      <div className="control-story-copy">
        <h2 id="control-title">
          Kamu pegang
          <br />
          kendalinya.
        </h2>
        <p className="control-intro">Coba pilih. Nudge mengikuti ritmemu.</p>
        <div
          className="control-choices"
          role="group"
          aria-label="Coba kendali Nudge"
        >
          {choices.map(({ id, title, description, icon: ChoiceIcon }) => (
            <button
              type="button"
              disabled={!ready}
              key={id}
              aria-pressed={choice === id}
              aria-controls="control-demo"
              onClick={() => setChoice(id)}
            >
              <ChoiceIcon
                size={26}
                weight={choice === id ? "fill" : "bold"}
                aria-hidden="true"
              />
              <span>
                <strong>{title}</strong>
                <span>{description}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div
        className="control-playground"
        id="control-demo"
        data-choice={choice}
      >
        <div
          className="control-art"
          key={`${choice}-${revision}-${saved}-${reminder}`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 300 185">
            <ellipse
              cx="150"
              cy="163"
              rx="99"
              ry="10"
              fill="#315F5E"
              opacity=".08"
            />
            <path
              d="M61 39q40-15 89 1 48-16 88 0v102q-42-13-88 0-48-13-89 0Z"
              fill="#679F9E"
              transform="rotate(-7 150 90)"
            />
            <path
              d="M68 30q37-12 82 1 43-13 80 0v102q-40-11-80 0-44-11-82 0Z"
              fill="#E6D4BE"
            />
            <path
              d="M150 31v102m-64-73h43m-43 14h34m-34 14h39m43-28h43m-43 14h34"
              fill="none"
              stroke="#CBAF8B"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <span
            className="control-art-symbol"
            data-active={
              choice === "favorite"
                ? saved
                : choice === "reminder"
                  ? reminder
                  : true
            }
          >
            <Icon size={44} weight="fill" />
          </span>
        </div>
        <div className="control-demo-content" key={choice}>
          {choice === "change" && (
            <>
              <p className="control-example-label">
                Contoh kegiatan · {activity.minutes} menit
              </p>
              <h3 aria-live="polite" aria-atomic="true">
                {activity.title}
              </h3>
              <button
                type="button"
                disabled={!ready}
                className="control-demo-action"
                onClick={() => {
                  setIndex((index + 1) % examples.length);
                  setRevision(revision + 1);
                }}
              >
                <ArrowsClockwiseIcon
                  size={22}
                  weight="bold"
                  aria-hidden="true"
                />{" "}
                Ganti contoh kegiatan
              </button>
            </>
          )}
          {choice === "favorite" && (
            <>
              <p className="control-example-label">Contoh favorit</p>
              <h3>{activity.title}</h3>
              <button
                type="button"
                disabled={!ready}
                className="control-demo-action"
                aria-pressed={saved}
                onClick={() =>
                  setSavedIds(
                    saved
                      ? savedIds.filter((id) => id !== activity.id)
                      : [...savedIds, activity.id],
                  )
                }
              >
                {saved ? (
                  <CheckIcon size={22} weight="bold" aria-hidden="true" />
                ) : (
                  <BookmarkSimpleIcon
                    size={22}
                    weight="bold"
                    aria-hidden="true"
                  />
                )}
                {saved ? "Ditandai. Boleh batalkan." : "Coba tandai favorit"}
              </button>
            </>
          )}
          {choice === "reminder" && (
            <>
              <p className="control-example-label">Contoh pengingat</p>
              <h3>
                {reminder ? "Satu ajakan kecil." : "Tenang, tidak ada desakan."}
              </h3>
              <button
                type="button"
                disabled={!ready}
                role="switch"
                aria-checked={reminder}
                aria-label="Contoh pengingat"
                className="control-switch"
                onClick={() => setReminder(!reminder)}
              >
                <span className="control-switch-track" aria-hidden="true">
                  <span />
                </span>
                {reminder ? "Contoh aktif" : "Contoh nonaktif"}
              </button>
            </>
          )}
        </div>
        <p className="control-demo-note">
          Ini contoh interaktif. Tidak mengubah favorit atau pengingatmu.
        </p>
      </div>
    </section>
  );
}
