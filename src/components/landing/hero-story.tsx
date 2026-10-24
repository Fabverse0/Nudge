"use client";

import Image from "next/image";
import { useState } from "react";

function PhoneIllustration() {
  return (
    <svg viewBox="0 0 190 330" className="hero-phone-art" aria-hidden="true">
      <defs>
        <clipPath id="hero-phone-screen-clip">
          <rect x="24" y="34" width="142" height="262" rx="18" />
        </clipPath>
      </defs>
      <g className="hero-phone-body">
        <rect x="15" y="12" width="160" height="300" rx="30" fill="#234948" />
        <rect x="10" y="5" width="160" height="300" rx="30" fill="#315F5E" />
        <rect x="19" y="15" width="142" height="280" rx="23" fill="#FAF8F4" />
        <g clipPath="url(#hero-phone-screen-clip)" className="hero-phone-feed">
          <rect x="24" y="34" width="142" height="262" fill="#FAF8F4" />
          <g className="hero-phone-feed-content">
            <rect
              x="34"
              y="49"
              width="122"
              height="76"
              rx="14"
              fill="#E8F1EC"
            />
            <circle cx="54" cy="69" r="8" fill="#679F9E" />
            <path
              d="M69 67h65M44 88h91M44 101h57"
              stroke="#679F9E"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <rect
              x="34"
              y="137"
              width="122"
              height="70"
              rx="14"
              fill="#E6D4BE"
            />
            <path
              d="M49 161h78M49 176h56M49 190h68"
              stroke="#CBAF8B"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <rect
              x="34"
              y="219"
              width="122"
              height="76"
              rx="14"
              fill="#DDECF5"
            />
            <circle cx="59" cy="244" r="11" fill="#7EADDB" />
            <path
              d="M79 241h55M48 266h86M48 281h45"
              stroke="#679F9E"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <rect
              x="34"
              y="307"
              width="122"
              height="76"
              rx="14"
              fill="#E8F1EC"
            />
            <path
              d="M48 329h82M48 345h58M48 360h70"
              stroke="#679F9E"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        </g>
        <rect x="77" y="20" width="30" height="5" rx="3" fill="#679F9E" />
        <circle cx="116" cy="22" r="3" fill="#679F9E" />
        <rect
          className="hero-phone-back"
          x="10"
          y="5"
          width="160"
          height="300"
          rx="30"
          fill="#7EADDB"
        />
        <circle
          className="hero-phone-camera"
          cx="38"
          cy="38"
          r="9"
          fill="#315F5E"
        />
        <circle
          className="hero-phone-camera"
          cx="60"
          cy="38"
          r="6"
          fill="#315F5E"
        />
        <circle
          className="hero-phone-camera"
          cx="38"
          cy="60"
          r="6"
          fill="#315F5E"
        />
      </g>
    </svg>
  );
}

export function HeroStory() {
  const [loadedPoses, setLoadedPoses] = useState(0);
  const [assetFailed, setAssetFailed] = useState(false);

  return (
    <div
      className="alive-scene scene-hero hero-story"
      data-alive-scene="hero"
      data-art-ready={loadedPoses === 7 ? "true" : undefined}
      data-static={assetFailed ? "true" : undefined}
      role="img"
      aria-label="Nudge meletakkan ponsel, memilih kegiatan, dan mulai menulis jurnal"
    >
      <span className="hero-story-art" aria-hidden="true">
        <span className="hero-story-sequence">
          <span className="hero-story-backdrop" />
          <span className="hero-story-ground" />
          <span className="hero-phone">
            <PhoneIllustration />
          </span>
          <span className="hero-mascot hero-mascot-wave">
            <Image
              src={
                assetFailed
                  ? "/brand/mascot/nudge-turtle-wave.png"
                  : "/brand/landing/motion/c1-wave.webp"
              }
              alt=""
              width={1280}
              height={1280}
              priority
              unoptimized
              draggable={false}
              onLoad={() => setLoadedPoses((value) => value | 1)}
              onError={() => setAssetFailed(true)}
            />
          </span>
          <span className="hero-mascot hero-mascot-think">
            <Image
              src="/brand/landing/motion/c1-think.webp"
              alt=""
              width={1254}
              height={1254}
              priority
              unoptimized
              draggable={false}
              onLoad={() => setLoadedPoses((value) => value | 2)}
              onError={() => setAssetFailed(true)}
            />
          </span>
          <span className="hero-mascot hero-mascot-journal">
            <Image
              src="/brand/landing/motion/c1-journal.webp"
              alt=""
              width={1254}
              height={1254}
              priority
              unoptimized
              draggable={false}
              onLoad={() => setLoadedPoses((value) => value | 4)}
              onError={() => setAssetFailed(true)}
            />
            <svg className="hero-journal-ink" viewBox="0 0 1254 1254">
              <path pathLength={1} d="M570 1000c30-6 50 2 75-7" />
              <path pathLength={1} d="M585 1020c22-3 40 1 63-4" />
            </svg>
          </span>
        </span>
      </span>
    </div>
  );
}
