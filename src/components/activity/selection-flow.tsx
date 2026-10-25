"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  SlidersHorizontalIcon,
} from "@phosphor-icons/react";
import {
  goals,
  moods,
  placeLabels,
  type Goal,
  type Mood,
} from "@/lib/activities/catalog";
import type { Context } from "@/lib/recommendation/recommend";
import { ActivityArtwork, MoodIcon } from "./activity-primitives";

export type SelectionStep = "mood" | "goal" | "time";
const steps: SelectionStep[] = ["mood", "goal", "time"];
const labels = { mood: "Mood", goal: "Tujuan", time: "Waktu" };
const questions = {
  mood: "Lagi merasa bagaimana?",
  goal: "Ingin melakukan apa?",
  time: "Ada waktu berapa lama?",
};

type SelectionFlowProps = {
  step: SelectionStep;
  onStepChange: (step: SelectionStep) => void;
  mood: Mood | null;
  goal: Goal | null;
  minutes: 2 | 5 | 10 | null;
  place: Context["place"];
  tools: Context["tools"];
  onMoodChange: (value: Mood | null) => void;
  onGoalChange: (value: Goal) => void;
  onMinutesChange: (value: 2 | 5 | 10) => void;
  onPlaceChange: (value: Context["place"]) => void;
  onToolsChange: (value: Context["tools"]) => void;
  onSubmit: () => void;
  error: string;
};

function SelectionCheck() {
  return (
    <CheckCircleIcon
      size={22}
      weight="fill"
      className="selection-check"
      aria-hidden="true"
    />
  );
}

export function SelectionFlow(props: SelectionFlowProps) {
  const { step, mood, goal, minutes, place, tools, onStepChange } = props;
  const currentIndex = steps.indexOf(step);
  const activeFilters = [
    place !== "any" ? placeLabels[place] : null,
    tools === "none" ? "Tanpa alat" : null,
  ].filter(Boolean);
  const focusTarget = useRef<HTMLElement>(null);
  const previousStep = useRef(step);
  const [direction, setDirection] = useState("forward");
  function changeStep(next: SelectionStep) {
    setDirection(steps.indexOf(next) < currentIndex ? "backward" : "forward");
    onStepChange(next);
  }
  useEffect(() => {
    if (previousStep.current !== step) {
      focusTarget.current?.focus({ preventScroll: true });
      focusTarget.current?.scrollIntoView({ block: "nearest" });
    }
    previousStep.current = step;
  }, [step]);
  const canContinue =
    step === "mood"
      ? mood !== null
      : step === "goal"
        ? goal !== null
        : minutes !== null && goal !== null;
  function advance() {
    if (!canContinue) return;
    if (step === "mood") changeStep("goal");
    else if (step === "goal") changeStep("time");
    else props.onSubmit();
  }
  return (
    <form
      className="selection-flow context-form"
      onSubmit={(event) => {
        event.preventDefault();
        advance();
      }}
    >
      <div className="selection-progress">
        <p className="selection-progress-label">
          Langkah {currentIndex + 1} dari 3
        </p>
        <ol aria-label="Langkah pemilihan">
          {steps.map((item, index) => (
            <li
              key={item}
              data-current={item === step}
              data-done={index < currentIndex}
              aria-current={item === step ? "step" : undefined}
            >
              <span aria-hidden="true">
                {index < currentIndex ? (
                  <CheckCircleIcon size={18} weight="fill" />
                ) : (
                  index + 1
                )}
              </span>
              {labels[item]}
            </li>
          ))}
        </ol>
      </div>
      <section
        key={step}
        ref={focusTarget}
        className="selection-step"
        data-step={step}
        data-direction={direction}
        tabIndex={-1}
        role="region"
        aria-label={`Langkah ${currentIndex + 1}: ${questions[step]}`}
      >
        {step !== "mood" && (
          <p className="selection-summary">
            {mood ? `Mood: ${mood}` : "Mood dilewati"}
            {step === "time" && goal ? ` · ${goals[goal].label}` : ""}
          </p>
        )}
        <fieldset>
          <legend className="selection-question">
            {questions[step]}
            {step === "mood" && <span className="optional">Opsional</span>}
          </legend>
          {step === "mood" && (
            <>
              <div className="mood-options">
                {moods.map((value) => (
                  <label className="choice" key={value}>
                    <input
                      type="radio"
                      name="mood"
                      checked={mood === value}
                      onChange={() => props.onMoodChange(value)}
                    />
                    <MoodIcon mood={value} />
                    <span>{value}</span>
                    <SelectionCheck />
                  </label>
                ))}
              </div>
              <p className="field-hint">
                Untuk menyesuaikan saran, bukan penilaian kesehatan.
              </p>
            </>
          )}
          {step === "goal" && (
            <div className="goal-options">
              {(Object.keys(goals) as Goal[]).map((value) => (
                <label
                  className="choice goal-choice"
                  data-goal={value}
                  key={value}
                >
                  <input
                    type="radio"
                    name="goal"
                    checked={goal === value}
                    onChange={() => props.onGoalChange(value)}
                  />
                  <span
                    className={`goal-artwork ${goals[value].color}`}
                    aria-hidden="true"
                  >
                    <ActivityArtwork goal={value} size={80} />
                  </span>
                  <span>
                    <strong>{goals[value].label}</strong>
                    <small>{goals[value].description}</small>
                  </span>
                  <SelectionCheck />
                </label>
              ))}
            </div>
          )}
          {step === "time" && (
            <div className="duration-options">
              {([2, 5, 10] as const).map((value) => (
                <label className="choice duration-choice" key={value}>
                  <input
                    type="radio"
                    name="duration"
                    checked={minutes === value}
                    onChange={() => props.onMinutesChange(value)}
                  />
                  <ClockIcon
                    size={24}
                    aria-hidden="true"
                    className="duration-clock"
                  />
                  <strong>{value}</strong>
                  <span>menit</span>
                  <SelectionCheck />
                </label>
              ))}
            </div>
          )}
        </fieldset>
        {step === "time" && (
          <details className="filter-details">
            <summary>
              <SlidersHorizontalIcon size={20} aria-hidden="true" />
              Tempat dan alat<span className="optional">Opsional</span>
            </summary>
            <div className="filter-grid">
              <div>
                <label htmlFor="place-filter">Tempat</label>
                <select
                  id="place-filter"
                  value={place}
                  onChange={(event) =>
                    props.onPlaceChange(event.target.value as Context["place"])
                  }
                >
                  <option value="any">Bebas tempat</option>
                  <option value="indoor">Dalam ruangan</option>
                  <option value="outdoor">Luar ruangan</option>
                </select>
              </div>
              <div>
                <label htmlFor="tool-filter">Alat</label>
                <select
                  id="tool-filter"
                  value={tools}
                  onChange={(event) =>
                    props.onToolsChange(event.target.value as Context["tools"])
                  }
                >
                  <option value="any">Alat boleh digunakan</option>
                  <option value="none">Tanpa alat</option>
                </select>
              </div>
            </div>
          </details>
        )}
        {step === "time" && activeFilters.length > 0 && (
          <p className="field-hint">
            Filter aktif: {activeFilters.join(" · ")}.
          </p>
        )}
      </section>
      {props.error && (
        <p className="error-note" role="alert">
          {props.error}
        </p>
      )}
      {!canContinue && (
        <p className="selection-helper field-hint" id="selection-helper">
          {step === "mood"
            ? "Pilih mood untuk lanjut, atau lewati langkah ini."
            : step === "goal"
              ? "Pilih satu tujuan untuk lanjut."
              : !goal
                ? "Kembali untuk memilih tujuan terlebih dahulu."
                : "Pilih waktu yang kamu punya untuk mencari kegiatan."}
        </p>
      )}
      <div className="selection-actions">
        {step === "mood" ? (
          <button
            type="button"
            className="button secondary"
            onClick={() => {
              props.onMoodChange(null);
              changeStep("goal");
            }}
          >
            Lewati
          </button>
        ) : (
          <button
            type="button"
            className="button secondary"
            onClick={() => changeStep(step === "time" ? "goal" : "mood")}
          >
            <ArrowLeftIcon size={18} aria-hidden="true" />
            Kembali
          </button>
        )}
        <button
          type="submit"
          className="button primary"
          disabled={!canContinue}
          aria-describedby={!canContinue ? "selection-helper" : undefined}
        >
          {step === "time" ? "Cari kegiatan kecil" : "Lanjut"}
          <ArrowRightIcon size={18} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
