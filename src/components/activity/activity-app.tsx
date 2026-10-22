"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeftIcon,
  BellIcon,
  BookmarkSimpleIcon,
  CheckIcon,
  ClockIcon,
  HeartIcon,
  LeafIcon,
  PauseIcon,
  PlayIcon,
  SmileyIcon,
  XIcon,
} from "@phosphor-icons/react";
import { TurtleMascot } from "@/components/ui/turtle-mascot";
import { Brand } from "@/components/brand";
import {
  activities,
  goals,
  moods,
  type Activity,
  type Goal,
  type Mood,
} from "@/lib/activities/catalog";
import {
  emptyFeedback,
  recommend,
  type Context,
  type Feedback,
  type Recommendation,
  type Suggestion,
} from "@/lib/recommendation/recommend";
import {
  finishTimer,
  formatTime,
  pauseTimer,
  remaining,
  resumeTimer,
  startTimer,
  tick,
  type Timer,
} from "@/lib/timer/timer";
import { updateMood } from "@/lib/session/session";
import { useLocalData } from "./use-local-data";
import { ReminderPanel } from "./reminder-panel";
import { InstallGuide } from "../install-guide";
import { SelectionFlow, type SelectionStep } from "./selection-flow";
import {
  ActivityDetails,
  ActivityArtwork,
  GoalIcon,
} from "./activity-primitives";
import "./activity-studio.css";

type Screen =
  "choose" | "suggestion" | "timer" | "complete" | "favorites" | "reminders";
export function ActivityApp({
  initialMinutes = null,
}: {
  initialMinutes?: 2 | 5 | 10 | null;
}) {
  const [screen, setScreen] = useState<Screen>("choose");
  const [selectionStep, setSelectionStep] = useState<SelectionStep>("mood");
  const [mood, setMood] = useState<Mood | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [minutes, setMinutes] = useState<2 | 5 | 10 | null>(initialMinutes);
  const [place, setPlace] = useState<Context["place"]>("any");
  const [tools, setTools] = useState<Context["tools"]>("any");
  const [feedback, setFeedback] = useState<Feedback>(emptyFeedback);
  const [result, setResult] = useState<Recommendation | null>(null);
  const [liked, setLiked] = useState(false);
  const [fromFavorite, setFromFavorite] = useState(false);
  const [timer, setTimer] = useState<Timer | null>(null);
  const [now, setNow] = useState(0);
  const [formError, setFormError] = useState("");
  const heading = useRef<HTMLDivElement>(null);
  const previousScreen = useRef(screen);
  const local = useLocalData();
  const suggestion = result?.kind === "suggestion" ? result.suggestion : null;
  const activity = suggestion?.activity;
  const previousActivity = useRef(activity?.id);

  useEffect(() => {
    if (
      previousScreen.current !== screen ||
      (screen === "suggestion" && previousActivity.current !== activity?.id)
    ) {
      heading.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0 });
    }
    previousScreen.current = screen;
    previousActivity.current = activity?.id;
  }, [screen, activity?.id]);
  function resetRejected() {
    setFeedback((current) => ({ ...current, rejected: [] }));
  }
  useEffect(() => {
    if (screen !== "timer" || timer?.status !== "running") return;
    const update = () => {
      const time = Date.now();
      setNow(time);
      setTimer((current) => (current ? tick(current, time) : null));
    };
    const interval = window.setInterval(update, 250);
    window.addEventListener("focus", update);
    const onVisible = () => {
      if (document.visibilityState === "visible") update();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", update);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [screen, timer?.status]);

  function getContext(): Context | null {
    return goal && minutes ? { goal, minutes, mood, place, tools } : null;
  }
  function suggest(nextFeedback = feedback) {
    const context = getContext();
    if (!context) {
      setFormError("Pilih tujuan dan waktu sebelum mencari kegiatan.");
      return;
    }
    setFormError("");
    setFromFavorite(false);
    setResult(recommend(context, nextFeedback));
    setLiked(false);
    setScreen("suggestion");
  }
  function reject() {
    const next = {
      ...feedback,
      rejected: activity
        ? [...new Set([...feedback.rejected, activity.id])]
        : feedback.rejected,
    };
    setFeedback(next);
    setTimer(null);
    suggest(next);
  }
  function openFavorite(item: Activity) {
    const favorite: Suggestion = {
      activity: item,
      reasons: [
        "Dibuka dari favoritmu. Periksa durasi, tempat, dan alat sebelum mulai; favorit tidak mengikuti filter saran saat ini.",
      ],
      differences: [],
    };
    setResult({ kind: "suggestion", suggestion: favorite });
    setFromFavorite(true);
    setLiked(false);
    setScreen("suggestion");
  }
  function backToStart(message = "") {
    setSelectionStep("mood");
    setScreen("choose");
    setTimer(null);
    if (message) local.setNotice(message);
  }
  function complete(next: Mood | "skip") {
    setMood(updateMood(mood, next));
    backToStart(
      "Kegiatan selesai. Kamu bisa memilih kegiatan berikutnya kapan saja.",
    );
  }

  return (
    <div className="app-shell app-studio">
      <header className="site-header app-header">
        <Brand />
        <span className="small header-note">Satu langkah, pelan-pelan.</span>
      </header>
      {screen !== "timer" && screen !== "complete" && (
        <nav className="app-nav" aria-label="Menu aplikasi">
          {(
            [
              { id: "choose", label: "Kegiatan", icon: <LeafIcon size={20} /> },
              {
                id: "favorites",
                label: "Favorit",
                icon: <BookmarkSimpleIcon size={20} />,
              },
              {
                id: "reminders",
                label: "Pengingat",
                icon: <BellIcon size={20} />,
              },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              className={
                screen === item.id ||
                (screen === "suggestion" && item.id === "choose")
                  ? "nav-button active"
                  : "nav-button"
              }
              aria-current={
                screen === item.id ||
                (screen === "suggestion" && item.id === "choose")
                  ? "page"
                  : undefined
              }
              onClick={() => setScreen(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      )}
      <main
        id="main"
        className={`app-main ${screen === "timer" ? "timer-main" : ""}`}
      >
        {local.notice && (
          <div role="status" className="notice">
            <span>{local.notice}</span>
            <button
              aria-label="Tutup pesan"
              onClick={() => local.setNotice("")}
            >
              <XIcon size={18} />
            </button>
          </div>
        )}
        <div
          ref={heading}
          tabIndex={-1}
          className="screen-focus"
          role="region"
          aria-label={
            screen === "suggestion" && activity
              ? `Saran: ${activity.title}`
              : {
                  choose: "Pilihan kegiatan",
                  suggestion: "Hasil saran",
                  timer: "Timer kegiatan",
                  complete: "Mood setelah kegiatan",
                  favorites: "Favorit",
                  reminders: "Pengaturan pengingat",
                }[screen]
          }
        >
          {screen === "choose" && (
            <>
              <div className="app-intro selection-intro">
                <div>
                  <h1>Mau mulai dari apa?</h1>
                  <p className="muted">
                    Pilih yang terasa pas. Satu kegiatan kecil dulu.
                  </p>
                </div>
                <TurtleMascot
                  pose="wave"
                  size={80}
                  className="turtle-companion"
                  alt="Pendamping kura-kura"
                  eager
                />
              </div>
              <SelectionFlow
                step={selectionStep}
                onStepChange={(next) => {
                  setFormError("");
                  setSelectionStep(next);
                }}
                mood={mood}
                goal={goal}
                minutes={minutes}
                place={place}
                tools={tools}
                onMoodChange={(value) => {
                  setMood(value);
                  resetRejected();
                }}
                onGoalChange={(value) => {
                  setGoal(value);
                  resetRejected();
                }}
                onMinutesChange={(value) => {
                  setMinutes(value);
                  resetRejected();
                }}
                onPlaceChange={(value) => {
                  setPlace(value);
                  resetRejected();
                }}
                onToolsChange={(value) => {
                  setTools(value);
                  resetRejected();
                }}
                onSubmit={() => suggest()}
                error={formError}
              />
            </>
          )}
          {screen === "suggestion" && (
            <>
              <button
                className="back-button"
                onClick={() => {
                  setSelectionStep("time");
                  setScreen("choose");
                }}
              >
                <ArrowLeftIcon size={18} />
                Ubah pilihan
              </button>
              {suggestion ? (
                <>
                  <div className="suggestion-heading">
                    <h1>Satu ini, mau coba?</h1>
                    <TurtleMascot
                      pose="think"
                      size={64}
                      className="turtle-companion"
                      eager
                    />
                  </div>
                  <article className="activity-card">
                    <div
                      className={`activity-art ${goals[suggestion.activity.goal].color}`}
                    >
                      <ActivityArtwork goal={suggestion.activity.goal} />
                      <span className="activity-art-label">
                        <GoalIcon goal={suggestion.activity.goal} size={20} />
                        {goals[suggestion.activity.goal].label}
                      </span>
                    </div>
                    <div className="activity-content">
                      <div className="activity-meta">
                        <span>
                          <ClockIcon size={18} />
                          {suggestion.activity.minutes} menit
                        </span>
                        <button
                          className="icon-button"
                          disabled={!local.loaded}
                          onClick={() =>
                            local.toggleFavorite(suggestion.activity.id)
                          }
                          aria-label={
                            local.favorites.includes(suggestion.activity.id)
                              ? "Hapus dari favorit"
                              : "Simpan ke favorit"
                          }
                          aria-pressed={local.favorites.includes(
                            suggestion.activity.id,
                          )}
                        >
                          <BookmarkSimpleIcon
                            size={24}
                            weight={
                              local.favorites.includes(suggestion.activity.id)
                                ? "fill"
                                : "regular"
                            }
                          />
                        </button>
                      </div>
                      <h2>{suggestion.activity.title}</h2>
                      <p>{suggestion.activity.summary}</p>
                      {suggestion.differences.length > 0 && (
                        <div className="warning-note">
                          <strong>Alternatif dengan kondisi berbeda</strong>
                          {suggestion.differences.map((text) => (
                            <p key={text}>{text}</p>
                          ))}
                        </div>
                      )}
                      <ActivityDetails activity={suggestion.activity} />
                      <div className="reason">
                        <strong>Kenapa kegiatan ini?</strong>
                        {suggestion.reasons.map((reason) => (
                          <p key={reason}>{reason}</p>
                        ))}
                      </div>
                      {!fromFavorite && (
                        <div className="feedback-row">
                          <span className="small">Saran ini terasa pas?</span>
                          <button
                            aria-pressed={liked}
                            onClick={() => {
                              setLiked(true);
                              setFeedback({
                                ...feedback,
                                liked: [
                                  ...new Set([
                                    ...feedback.liked,
                                    suggestion.activity.id,
                                  ]),
                                ],
                              });
                            }}
                          >
                            <HeartIcon
                              weight={liked ? "fill" : "regular"}
                              size={18}
                            />
                            {liked ? "Ditandai cocok" : "Cocok"}
                          </button>
                          <button onClick={reject}>Kurang cocok</button>
                        </div>
                      )}
                    </div>
                  </article>
                  <button
                    className="button primary full-width start-button"
                    onClick={() => {
                      const time = Date.now();
                      setNow(time);
                      setTimer(startTimer(suggestion.activity.minutes, time));
                      setScreen("timer");
                    }}
                  >
                    <PlayIcon size={20} weight="fill" />
                    Mulai kegiatan
                  </button>
                </>
              ) : (
                <div className="empty-state">
                  <TurtleMascot pose="think" size={80} eager />
                  <h1>
                    {result?.kind === "exhausted"
                      ? "Pilihan sesi ini sudah dicoba."
                      : "Belum ada yang sesuai."}
                  </h1>
                  <p>
                    {result?.kind === "exhausted"
                      ? "Semua kegiatan yang sesuai sudah kamu lewati. Ubah pilihan atau lihat kembali saran untuk mencoba lagi."
                      : "Coba ubah waktu atau filter. Tujuan dan batas waktumu tetap kami ikuti."}
                  </p>
                  <button
                    className="button primary"
                    onClick={() => setScreen("choose")}
                  >
                    Ubah pilihan
                  </button>
                  {result?.kind === "exhausted" && (
                    <button
                      className="button secondary"
                      onClick={() => {
                        const next = emptyFeedback();
                        setFeedback(next);
                        suggest(next);
                      }}
                    >
                      Lihat saran lagi
                    </button>
                  )}
                </div>
              )}
            </>
          )}
          {screen === "timer" && activity && timer && (
            <section className="timer-screen" data-state={timer.status}>
              <div className="timer-title">
                <GoalIcon goal={activity.goal} />
                <p>{goals[activity.goal].label}</p>
              </div>
              <h1>{activity.title}</h1>
              <div
                className="timer-display"
                role="timer"
                aria-label={`Sisa waktu ${formatTime(remaining(timer, now))}`}
                aria-live="off"
              >
                {formatTime(remaining(timer, now))}
              </div>
              <p role="status" className="timer-status">
                {timer.status === "elapsed"
                  ? "Waktunya habis. Sudah selesai?"
                  : timer.status === "paused"
                    ? "Sedang dijeda. Lanjut saat kamu siap."
                    : "Sedang berjalan. Kamu boleh beralih dari layar."}
              </p>
              <div className="timer-controls">
                {timer.status === "running" && (
                  <button
                    className="button primary"
                    onClick={() => {
                      const time = Date.now();
                      setNow(time);
                      setTimer(pauseTimer(timer, time));
                    }}
                  >
                    <PauseIcon size={20} />
                    Jeda
                  </button>
                )}
                {timer.status === "paused" && (
                  <button
                    className="button primary"
                    onClick={() => {
                      const time = Date.now();
                      setNow(time);
                      setTimer(resumeTimer(timer, time));
                    }}
                  >
                    <PlayIcon size={20} />
                    Lanjut
                  </button>
                )}
                <button
                  className={`button ${timer.status === "elapsed" ? "primary" : "secondary"}`}
                  onClick={() => {
                    setTimer(finishTimer(timer));
                    setScreen("complete");
                  }}
                >
                  <CheckIcon size={20} />
                  Selesai
                </button>
              </div>
              <div className="calm-companion">
                <TurtleMascot size={40} eager />
                <span>Pelan-pelan juga boleh.</span>
              </div>
              <details className="timer-instructions">
                <summary>Lihat instruksi kegiatan</summary>
                <ActivityDetails activity={activity} />
              </details>
              <div className="timer-secondary">
                <button
                  onClick={() =>
                    backToStart(
                      "Boleh berhenti dulu. Kamu bisa mulai lagi nanti. Aktivitas belum ditandai selesai.",
                    )
                  }
                >
                  Berhenti
                </button>
                <button
                  onClick={() => {
                    const context = getContext();
                    if (context && !fromFavorite) reject();
                    else backToStart();
                  }}
                >
                  Ganti kegiatan
                </button>
              </div>
            </section>
          )}
          {screen === "complete" && (
            <section className="completion-screen">
              <div className="completion-mark">
                <TurtleMascot pose="complete" size={128} eager />
              </div>
              <h1>Satu langkah sudah.</h1>
              <p className="muted">
                Terima kasih sudah memberi waktu untuk dirimu.
              </p>
              <div className="completion-question">
                <h2>Mood kamu berubah?</h2>
                <p className="muted">Boleh berbeda, boleh tetap sama.</p>
                <div className="mood-options">
                  {moods.map((next) => (
                    <button
                      className="button secondary"
                      key={next}
                      onClick={() => complete(next)}
                    >
                      {next}
                    </button>
                  ))}
                </div>
                <button
                  className="text-button"
                  onClick={() => complete("skip")}
                >
                  Lewati
                </button>
              </div>
              <p className="field-hint">
                Pilihan ini dipakai untuk saran berikutnya dalam sesi ini.
              </p>
            </section>
          )}
          {screen === "favorites" && (
            <section>
              <div className="app-intro">
                <div>
                  <h1>Kegiatan favoritmu.</h1>
                  <p className="muted">
                    Disimpan di browser dan perangkat ini saja.
                  </p>
                </div>
                <TurtleMascot
                  pose="think"
                  size={64}
                  className="favorite-heading-mascot"
                  eager
                />
              </div>
              {!local.loaded ? (
                <p role="status">Membaca favorit...</p>
              ) : local.favorites.length ? (
                <div className="favorites-list">
                  {local.favorites.map((id) => {
                    const item = activities.find((a) => a.id === id);
                    return item ? (
                      <article className="favorite-row" key={id}>
                        <div
                          className={`favorite-symbol ${goals[item.goal].color}`}
                        >
                          <GoalIcon goal={item.goal} />
                        </div>
                        <div>
                          <h2>
                            <button onClick={() => openFavorite(item)}>
                              {item.title}
                            </button>
                          </h2>
                          <p className="small muted">
                            {item.minutes} menit · {goals[item.goal].label}
                          </p>
                        </div>
                        <button
                          className="icon-button"
                          aria-label={`Hapus ${item.title} dari favorit`}
                          onClick={() => local.toggleFavorite(id)}
                        >
                          <BookmarkSimpleIcon size={24} weight="fill" />
                        </button>
                      </article>
                    ) : null;
                  })}
                </div>
              ) : (
                <div className="empty-state">
                  <TurtleMascot pose="think" size={80} eager />
                  <h2>Belum ada favorit.</h2>
                  <p>
                    Simpan kegiatan yang ingin kamu coba lagi lewat ikon simpan
                    pada saran.
                  </p>
                  <button
                    className="button primary"
                    onClick={() => setScreen("choose")}
                  >
                    Pilih kegiatan
                  </button>
                </div>
              )}
              <p className="field-hint">
                Menghapus data browser juga dapat menghapus favoritmu.
              </p>
            </section>
          )}
          {screen === "reminders" &&
            (local.loaded ? (
              <ReminderPanel
                value={local.reminder}
                permission={local.permission}
                save={local.saveReminder}
              />
            ) : (
              <p role="status">Membaca pengaturan...</p>
            ))}
        </div>
      </main>
      {screen === "choose" && <InstallGuide />}
      <footer className="app-footer">
        <SmileyIcon size={18} />
        <span>Kamu yang menentukan ritmenya.</span>
      </footer>
    </div>
  );
}
