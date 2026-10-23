export function StretchStory() {
  return (
    <svg
      viewBox="0 0 520 430"
      className="object-scene stretch-story"
      aria-hidden="true"
    >
      <ellipse
        cx="270"
        cy="355"
        rx="205"
        ry="17"
        fill="#315F5E"
        opacity=".06"
      />
      <path
        d="M115 305h302c22 0 38 14 48 36l9 20H74l11-25c7-18 17-31 30-31Z"
        fill="#7EADDB"
      />
      <path
        d="M74 361h400v5c0 8-10 13-23 13H96c-13 0-22-5-22-13Z"
        fill="#6898C2"
      />
      <path
        d="M105 350h335"
        stroke="#FAF8F4"
        strokeWidth="3"
        opacity=".45"
        strokeLinecap="round"
      />
      <g transform="translate(32 309) rotate(-16)">
        <rect width="51" height="79" rx="12" fill="#315F5E" />
        <rect x="5" y="5" width="41" height="64" rx="8" fill="#679F9E" />
        <path
          d="M19 10h13"
          stroke="#315F5E"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="26" cy="74" r="2" fill="#E6D4BE" />
      </g>
      <ellipse
        className="stretch-contact"
        cx="271"
        cy="331"
        rx="142"
        ry="12"
        fill="#315F5E"
        opacity=".13"
      />
      <path d="m133 284-25 5 21 13" fill="#CBAF8B" />
      <path
        d="M175 276c-25-4-38 20-37 39 0 13 41 16 48 5l11-27Z"
        fill="#CBAF8B"
      />
      <g className="stretch-far-front">
        <path
          d="M294 274c25-9 54 16 73 35 11 11 5 20-12 20h-35c-15-1-27-19-36-29Z"
          fill="#CBAF8B"
        />
      </g>
      <g className="stretch-torso">
        <path
          d="M141 261c8-58 55-95 114-91 60 4 88 62 66 121-28 41-163 29-180-30Z"
          fill="#E6D4BE"
        />
        <path
          d="M133 268c-12-66 21-140 93-151 75-12 115 50 111 119-1 23-10 42-28 49-49 21-122 17-163 2-7-3-11-10-13-19Z"
          fill="#315F5E"
        />
        <path
          d="M135 254c-5-65 28-126 92-137 66-11 106 42 108 103-16 45-142 73-200 34Z"
          fill="#679F9E"
        />
        <path
          d="M164 191c11-30 30-48 55-54"
          fill="none"
          stroke="#91B9B5"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M170 284c-26-2-42 22-39 41 1 12 40 16 57 9 13-6 10-29 1-40Z"
        fill="#E6D4BE"
      />
      <path
        d="M143 331c8 4 28 6 38 2"
        fill="none"
        stroke="#CBAF8B"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <g className="stretch-near-front">
        <path
          d="M277 278c24-9 45 7 61 22l38 17c17 9 9 22-7 23h-39c-17 0-36-14-54-29-10-9-11-24 1-33Z"
          fill="#E6D4BE"
        />
        <path
          d="M347 333h23"
          fill="none"
          stroke="#CBAF8B"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
      <g className="stretch-head">
        <path
          d="M280 276c-7-9-9-24-4-34l36-20 21 30c-9 21-37 35-53 24Z"
          fill="#CBAF8B"
        />
        <path
          d="M258 201c0-46 27-76 68-75 42 1 69 32 69 75 0 44-29 74-70 74-43 0-67-29-67-74Z"
          fill="#E6D4BE"
        />
        <path
          d="M272 178c8-23 23-34 41-36"
          fill="none"
          stroke="#F0E2CC"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <g className="stretch-eyes-open" fill="#315F5E">
          <ellipse cx="304" cy="198" rx="10" ry="15" />
          <ellipse cx="363" cy="194" rx="9" ry="14" />
          <g fill="#FAF8F4">
            <ellipse cx="307" cy="193" rx="3" ry="4" />
            <ellipse cx="366" cy="189" rx="3" ry="4" />
          </g>
        </g>
        <g
          className="stretch-eyes-rest"
          fill="none"
          stroke="#315F5E"
          strokeWidth="5"
          strokeLinecap="round"
        >
          <path d="M295 199q9-9 18 0m42-4q8-8 16 0" />
        </g>
        <path
          className="stretch-smile"
          d="M321 225q12 13 24-1"
          fill="none"
          stroke="#315F5E"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <ellipse
          cx="286"
          cy="220"
          rx="10"
          ry="5"
          fill="#CBAF8B"
          opacity=".55"
        />
        <ellipse cx="375" cy="214" rx="8" ry="4" fill="#CBAF8B" opacity=".55" />
      </g>
      <g
        className="stretch-exhale"
        fill="none"
        stroke="#679F9E"
        strokeWidth="4"
        strokeLinecap="round"
      >
        <path d="M401 203q15-7 25-2m-22 13q19-1 29 7" />
      </g>
    </svg>
  );
}
