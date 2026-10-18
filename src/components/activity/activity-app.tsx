"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeftIcon,
  BellIcon,
  BookmarkSimpleIcon,
  CheckIcon,
  ClockIcon,
  FootprintsIcon,
  HeartIcon,
  LeafIcon,
  PauseIcon,
  PlayIcon,
  SlidersHorizontalIcon,
  SmileyIcon,
  XIcon,
} from "@phosphor-icons/react";
import { TurtleIcon } from "@/components/ui/turtle-icon";
import { Brand } from "@/components/brand";
import {
  activities,
  goals,
  moods,
  placeLabels,
  toolLabels,
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

type Screen =
  "choose" | "suggestion" | "timer" | "complete" | "favorites" | "reminders";
function GoalIcon({ goal, size = 24 }: { goal: Goal; size?: number }) {
  return goal === "move" ? (
    <FootprintsIcon size={size} />
  ) : goal === "reflect" ? (
    <LeafIcon size={size} />
  ) : (
    <CheckIcon size={size} />
  );
}
function MoodChoices({
  value,
  choose,
  completion = false,
}: {
  value: Mood | null;
  choose: (mood: Mood | "skip") => void;
  completion?: boolean;
}) {
  return (
    <fieldset>
      <legend>
        {completion
          ? "Pilih mood sekarang, atau lewati"
          : "Lagi merasa bagaimana?"}
        {!completion && <span className="optional">Opsional</span>}
      </legend>
      <div className="mood-options">
        {moods.map((mood) => (
          <label className="choice" key={mood}>
            <input
              type="radio"
              name={completion ? "mood-after" : "mood"}
              checked={value === mood}
              onChange={() => choose(mood)}
            />
            <span>{mood}</span>
            <CheckIcon
              className="selection-check"
              size={16}
              aria-hidden="true"
            />
          </label>
        ))}
        {!completion && (
          <label className="choice">
            <input
              type="radio"
              name="mood"
              checked={value === null}
              onChange={() => choose("skip")}
            />
            <span>Lewati</span>
            <CheckIcon
              className="selection-check"
              size={16}
              aria-hidden="true"
            />
          </label>
        )}
      </div>
      {!completion && (
        <p className="field-hint">
          Untuk menyesuaikan saran, bukan penilaian kesehatan.
        </p>
      )}
    </fieldset>
  );
}

export function ActivityApp({
  initialMinutes = null,
}: {
  initialMinutes?: 2 | 5 | 10 | null;
}) {
  const [screen, setScreen] = useState<Screen>("choose");
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

  useEffect(() => {
    if (previousScreen.current !== screen) {
      heading.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0 });
    }
    previousScreen.current = screen;
  }, [screen]);
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
    <div className="app-shell">
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
              aria-current={screen === item.id ? "page" : undefined}
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
        <div ref={heading} tabIndex={-1} className="screen-focus">
          {screen === "choose" && (
            <>
              <div className="app-intro">
                <div>
                  <h1>Mau mulai dari apa?</h1>
                  <p className="muted">
                    Pilih yang terasa pas. Satu kegiatan kecil dulu.
                  </p>
                </div>
                <TurtleIcon
                  size={60}
                  className="turtle-companion"
                  aria-label="Pendamping kura-kura"
                />
              </div>
              <form
                className="context-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  suggest();
                }}
              >
                <MoodChoices
                  value={mood}
                  choose={(next) => {
                    setMood(next === "skip" ? null : next);
                    resetRejected();
                  }}
                />
                <fieldset>
                  <legend>Ingin melakukan apa?</legend>
                  <div className="goal-options">
                    {(Object.keys(goals) as Goal[]).map((key) => (
                      <label
                        className={`choice goal-choice ${goals[key].color}`}
                        key={key}
                      >
                        <input
                          type="radio"
                          name="goal"
                          checked={goal === key}
                          onChange={() => {
                            setGoal(key);
                            resetRejected();
                          }}
                        />
                        <GoalIcon goal={key} />
                        <span>
                          <strong>{goals[key].label}</strong>
                          <small>{goals[key].description}</small>
                        </span>
                        <CheckIcon
                          size={18}
                          className="selection-check"
                          aria-hidden="true"
                        />
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Ada waktu berapa lama?</legend>
                  <div className="duration-options">
                    {([2, 5, 10] as const).map((value) => (
                      <label className="choice duration-choice" key={value}>
                        <input
                          type="radio"
                          name="duration"
                          checked={minutes === value}
                          onChange={() => {
                            setMinutes(value);
                            resetRejected();
                          }}
                        />
                        <strong>{value}</strong>
                        <span>menit</span>
                        <CheckIcon
                          size={16}
                          className="selection-check"
                          aria-hidden="true"
                        />
                      </label>
                    ))}
                  </div>
                </fieldset>
                <details className="filter-details">
                  <summary>
                    <SlidersHorizontalIcon size={20} />
                    Tempat dan alat<span className="optional">Opsional</span>
                  </summary>
                  <div className="filter-grid">
                    <div>
                      <label htmlFor="place-filter">Tempat</label>
                      <select
                        id="place-filter"
                        value={place}
                        onChange={(e) => {
                          setPlace(e.target.value as Context["place"]);
                          resetRejected();
                        }}
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
                        onChange={(e) => {
                          setTools(e.target.value as Context["tools"]);
                          resetRejected();
                        }}
                      >
                        <option value="any">Alat boleh digunakan</option>
                        <option value="none">Tanpa alat</option>
                      </select>
                    </div>
                  </div>
                </details>
                {formError && (
                  <p className="error-note" role="alert">
                    {formError}
                  </p>
                )}
                <button type="submit" className="button primary full-width">
                  Cari kegiatan kecil
                </button>
                <p className="field-hint centered">
                  Tidak ada target besar yang harus dikejar.
                </p>
              </form>
            </>
          )}
          {screen === "suggestion" && (
            <>
              <button
                className="back-button"
                onClick={() => setScreen("choose")}
              >
                <ArrowLeftIcon size={18} />
                Ubah pilihan
              </button>
              {suggestion ? (
                <>
                  <div className="suggestion-heading">
                    <h1>Satu ini, mau coba?</h1>
                    <TurtleIcon
                      size={44}
                      className="turtle-companion"
                      aria-hidden="true"
                    />
                  </div>
                  <article className="activity-card">
                    <div
                      className={`activity-art ${goals[suggestion.activity.goal].color}`}
                    >
                      <GoalIcon goal={suggestion.activity.goal} size={56} />
                      <span>{goals[suggestion.activity.goal].label}</span>
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
                  <TurtleIcon size={60} />
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
            <section className="timer-screen">
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
                    className="button secondary"
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
                    className="button secondary"
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
                  className="button primary"
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
                <TurtleIcon size={40} />
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
                <CheckIcon size={40} />
              </div>
              <h1>Satu langkah sudah.</h1>
              <p className="muted">
                Terima kasih sudah memberi waktu untuk dirimu.
              </p>
              <div className="completion-question">
                <TurtleIcon size={64} className="turtle-companion" />
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
                <BookmarkSimpleIcon size={36} />
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
                  <TurtleIcon size={64} />
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

function ActivityDetails({ activity }: { activity: Activity }) {
  return (
    <>
      <div className="conditions">
        <span>{activity.places.map((p) => placeLabels[p]).join(" / ")}</span>
        <span>
          {activity.requiredTools.length
            ? `Perlu: ${activity.requiredTools.map((t) => toolLabels[t]).join(", ")}`
            : "Tanpa alat"}
        </span>
      </div>
      <ol className="activity-steps">
        {activity.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {activity.id.startsWith("journal") && (
        <p className="info-note small">
          Tulisanmu tetap di media pilihanmu. Nudge tidak mengumpulkan atau
          menyimpan isi jurnal.
        </p>
      )}
    </>
  );
}
