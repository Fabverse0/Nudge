"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function HeroStory() {
  const [replay, setReplay] = useState(0);
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);

  return (
    <div className="alive-scene scene-hero hero-story" data-alive-scene="hero">
      <button
        type="button"
        className="hero-greeting"
        aria-label="Putar ulang sapaan Nudge"
        disabled={!ready}
        onClick={() => setReplay(replay + 1)}
      >
        <svg
          key={replay}
          viewBox="30 45 460 385"
          className="hero-story-art"
          aria-hidden="true"
        >
          <ellipse
            className="hero-contact"
            cx="263"
            cy="354"
            rx="162"
            ry="14"
            fill="#315F5E"
            opacity=".09"
          />
          <g className="hero-phone-away">
            <g transform="translate(45 296) rotate(-17)">
              <rect
                x="3"
                y="6"
                width="67"
                height="102"
                rx="15"
                fill="#6898C2"
              />
              <rect width="67" height="102" rx="15" fill="#7EADDB" />
              <rect x="7" y="8" width="53" height="77" rx="9" fill="#315F5E" />
              <path
                d="M25 14h18m-17 79h16"
                stroke="#FAF8F4"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <g
                className="hero-phone-feed"
                stroke="#91B9B5"
                strokeWidth="4"
                strokeLinecap="round"
              >
                <path d="M18 32h28m-28 12h22m-22 12h27m-27 12h17" />
              </g>
            </g>
          </g>
          <ellipse cx="121" cy="321" rx="29" ry="19" fill="#CBAF8B" />
          <ellipse cx="338" cy="321" rx="30" ry="19" fill="#CBAF8B" />
          <g className="hero-core">
            <path
              d="M128 254c22-66 182-65 216-7 15 27 9 72-26 82-52 15-149 7-180-16-16-12-18-36-10-59Z"
              fill="#E6D4BE"
            />
            <path
              d="M103 278C80 201 113 96 205 76c94-21 163 48 175 139 6 49-7 81-43 96-65 28-152 14-206-4-15-5-25-14-28-29Z"
              fill="#679F9E"
            />
            <path
              d="M129 185c12-43 40-72 75-83"
              fill="none"
              stroke="#91B9B5"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <g className="hero-wave-arm">
              <path
                d="M340 271c14-15 32-34 43-50 12-19 36-17 42 0 7 20-12 45-30 61-13 12-29 25-42 22-15-4-22-21-13-33Z"
                fill="#E6D4BE"
              />
              <path
                d="M395 251q13-11 17-23"
                fill="none"
                stroke="#F0E2CC"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>
            <g className="hero-head">
              <path
                d="M198 231c-5-58 27-100 81-102 58-2 98 38 99 95 2 53-33 90-89 93-57 3-87-33-91-86Z"
                fill="#E6D4BE"
              />
              <path
                d="M214 192c9-26 26-42 49-45"
                fill="none"
                stroke="#F0E2CC"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <g className="hero-gaze">
                <g className="hero-eye hero-eye-left">
                  <ellipse cx="245" cy="224" rx="13" ry="20" fill="#315F5E" />
                  <ellipse cx="249" cy="217" rx="4" ry="6" fill="#FAF8F4" />
                </g>
                <g className="hero-eye hero-eye-right">
                  <ellipse cx="330" cy="214" rx="12" ry="19" fill="#315F5E" />
                  <ellipse cx="334" cy="207" rx="4" ry="5" fill="#FAF8F4" />
                </g>
                <path
                  className="hero-soft-smile"
                  d="M272 258q18 19 36-4"
                  fill="none"
                  stroke="#315F5E"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path
                  className="hero-happy-smile"
                  d="M271 252q19 11 39-5c-2 29-31 37-39 5Z"
                  fill="#315F5E"
                />
              </g>
              <ellipse
                cx="222"
                cy="251"
                rx="11"
                ry="5"
                fill="#CBAF8B"
                opacity=".55"
              />
              <ellipse
                cx="350"
                cy="240"
                rx="10"
                ry="5"
                fill="#CBAF8B"
                opacity=".55"
              />
            </g>
          </g>
          <g className="hero-planted-foot">
            <path
              d="M148 302c17-15 44-8 58 10 16 20 18 40-5 45-21 5-58 1-68-9-10-10 0-34 15-46Z"
              fill="#E6D4BE"
            />
            <path
              d="M145 347q22 7 43 4"
              fill="none"
              stroke="#CBAF8B"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
          <g
            className="hero-wave-marks"
            stroke="#679F9E"
            strokeWidth="5"
            strokeLinecap="round"
          >
            <path d="m431 188 9-14m0 32 17-5m-44-27 1-14" />
          </g>
          <g className="hero-book-arrival">
            <g transform="translate(328 339) rotate(8)">
              <path
                d="M0 2q34-13 70 0 36-13 70 0v59q-36-10-70 1-35-11-70 0Z"
                fill="#315F5E"
              />
              <path
                d="M4-4q32-12 66 0 34-12 66 0v57q-33-10-66 0-34-10-66 0Z"
                fill="#E6D4BE"
              />
              <path
                d="M70-4v57m-52-35h34m-34 13h25m42-13h32m-32 13h23"
                stroke="#CBAF8B"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                className="hero-turning-page"
                d="M70-4q29-23 55-20v57q-25 0-55 20Z"
                fill="#F0E2CC"
              />
            </g>
          </g>
          <g className="hero-little-steps" fill="#679F9E">
            <g
              className="hero-little-step-one"
              transform="translate(235 381) rotate(28)"
            >
              <ellipse rx="6" ry="10" />
              <circle cy="-15" r="4" />
            </g>
            <g
              className="hero-little-step-two"
              transform="translate(265 389) rotate(28)"
            >
              <ellipse rx="6" ry="10" />
              <circle cy="-15" r="4" />
            </g>
          </g>
        </svg>
        <span className="hero-replay-hint">
          <ArrowCounterClockwiseIcon
            size={16}
            weight="bold"
            aria-hidden="true"
          />
          <span>Sapa Nudge</span>
        </span>
      </button>
      <span className="sr-only" role="status" key={replay}>
        {replay > 0 ? "Nudge menyapa lagi." : ""}
      </span>
    </div>
  );
}
