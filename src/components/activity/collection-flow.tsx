"use client";
import { CheckCircleIcon, ClockIcon } from "@phosphor-icons/react";
import { collections, type Collection } from "@/lib/activities/collections";
import { TurtleMascot } from "@/components/ui/turtle-mascot";

export function CollectionPicker({
  onPick,
}: {
  onPick: (collection: Collection) => void;
}) {
  return (
    <section className="collection-picker" aria-labelledby="collections-title">
      <h2 id="collections-title">Coba dari koleksi</h2>
      <p className="muted">
        Pilih suasananya. Satu kegiatan untuk waktu yang kamu punya.
      </p>
      <div className="collection-grid">
        {collections.map((collection) => (
          <button
            className={`collection-option ${collection.goal}`}
            key={collection.id}
            onClick={() => onPick(collection)}
          >
            <TurtleMascot
              pose={
                collection.goal === "reflect"
                  ? "journal"
                  : collection.goal === "productive"
                    ? "tidy"
                    : "move"
              }
              size={88}
            />
            <span>
              <strong>{collection.title}</strong>
              <span className="small">{collection.description}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function CollectionFlow({
  collection,
  minutes,
  onMinutes,
  onSubmit,
  onExit,
}: {
  collection: Collection;
  minutes: 2 | 5 | 10 | null;
  onMinutes: (minutes: 2 | 5 | 10) => void;
  onSubmit: () => void;
  onExit: () => void;
}) {
  return (
    <form
      className="selection-flow context-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (minutes) onSubmit();
      }}
    >
      <p>{collection.description}</p>
      <fieldset>
        <legend className="selection-question">Ada waktu berapa lama?</legend>
        <div className="duration-options">
          {([2, 5, 10] as const).map((value) => (
            <label className="choice duration-choice" key={value}>
              <input
                type="radio"
                name="collection-duration"
                checked={minutes === value}
                onChange={() => onMinutes(value)}
              />
              <ClockIcon
                className="duration-clock"
                size={24}
                aria-hidden="true"
              />
              <strong>{value}</strong>
              <span>menit</span>
              <CheckCircleIcon
                className="selection-check"
                weight="fill"
                size={22}
                aria-hidden="true"
              />
            </label>
          ))}
        </div>
      </fieldset>
      <p className="field-hint">
        Kamu akan mendapat satu saran dari koleksi ini. Boleh ganti kalau belum
        cocok.
      </p>
      <div className="selection-actions">
        <button type="button" className="button secondary" onClick={onExit}>
          Kembali ke semua kegiatan
        </button>
        <button type="submit" className="button primary" disabled={!minutes}>
          Cari kegiatan kecil
        </button>
      </div>
    </form>
  );
}
