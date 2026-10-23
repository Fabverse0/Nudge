export function TimeStory({ minutes }: { minutes: number }) {
  return (
    <svg
      key={minutes}
      viewBox="0 0 520 430"
      className="object-scene time-story"
      data-duration={minutes}
      aria-hidden="true"
    >
      <path
        d="M116 370h288"
        stroke="#E6D4BE"
        strokeWidth="15"
        strokeLinecap="round"
      />
      <g className="time-clock">
        <path
          d="m158 295-13 34m148-34 13 34"
          stroke="#315F5E"
          strokeWidth="17"
          strokeLinecap="round"
        />
        <g transform="translate(231 181)">
          <rect x="-26" y="-149" width="52" height="16" rx="8" fill="#315F5E" />
          <rect x="-19" y="-158" width="38" height="17" rx="7" fill="#7EADDB" />
          <circle cx="9" cy="8" r="130" fill="#315F5E" />
          <circle r="130" fill="#679F9E" />
          <circle r="114" fill="#D6E6DF" />
          <circle cy="3" r="108" fill="#FAF8F4" />
          <path
            d="M-88-47a100 100 0 0 1 117-49"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              d="M0-91v9"
              transform={`rotate(${i * 30})`}
              stroke="#679F9E"
              strokeWidth={i % 3 === 0 ? 6 : 4}
              strokeLinecap="round"
            />
          ))}
          <g className="time-sweep">
            <g className="clock-minute" style={{ rotate: `${minutes * 6}deg` }}>
              <path
                d="M0 15V-68"
                stroke="#315F5E"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </g>
          </g>
          <path
            d="M0 0 43 23"
            stroke="#315F5E"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <circle cy="3" r="12" fill="#315F5E" />
          <circle r="11" fill="#7EADDB" />
          <circle cx="-3" cy="-4" r="3" fill="#FFFFFF" />
        </g>
      </g>

      <g className="time-activity">
        {minutes === 2 ? (
          <WalkingMoment />
        ) : minutes === 10 ? (
          <TidyMoment />
        ) : (
          <BookMoment />
        )}
      </g>

      <g transform="translate(348 298)">
        <g className="time-ticket">
          <rect y="7" width="116" height="91" rx="24" fill="#CBAF8B" />
          <rect width="116" height="91" rx="24" fill="#E6D4BE" />
          <path
            d="M19 12h31"
            stroke="#F7EBDA"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <text
            x="58"
            y="49"
            textAnchor="middle"
            fill="#315F5E"
            fontSize="38"
            fontWeight="850"
          >
            {minutes}
          </text>
          <text
            x="58"
            y="73"
            textAnchor="middle"
            fill="#315F5E"
            fontSize="17"
            fontWeight="750"
          >
            menit
          </text>
        </g>
      </g>
    </svg>
  );
}

function WalkingMoment() {
  return (
    <>
      <path
        d="M61 377c54 5 89-24 134-54"
        fill="none"
        stroke="#E6D4BE"
        strokeWidth="22"
        strokeLinecap="round"
      />
      {[0, 1, 2].map((i) => (
        <g
          key={i}
          transform={`translate(${77 + i * 41} ${365 - i * 19}) rotate(42)`}
        >
          <g className={`time-footprint time-footprint-${i}`}>
            <ellipse rx="9" ry="16" fill={i === 1 ? "#7EADDB" : "#679F9E"} />
            <circle cy="-25" r="6" fill={i === 1 ? "#7EADDB" : "#679F9E"} />
          </g>
        </g>
      ))}
      <g transform="translate(225 324) rotate(18)">
        <g className="time-little-shoe">
          <path
            d="M-35-44c-4-16 14-26 28-17l22 31 33 13c18 8 15 27-2 29l-65 2c-15 0-20-7-19-18Z"
            fill="#7EADDB"
          />
          <path
            d="M-38-2c24 8 54 5 92-8 9 8 7 21-8 22l-65 2c-15 0-20-7-19-16Z"
            fill="#CBAF8B"
          />
          <path
            d="m-7-32 16-6m-8 17 17-6"
            stroke="#FAF8F4"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      </g>
    </>
  );
}

function BookMoment() {
  return (
    <g transform="translate(57 298) rotate(-8 114 44)">
      <g className="time-open-book">
        <path
          d="M0 5Q49-6 104 9 158-6 208 5v77q-52-12-104 1Q50 70 0 82Z"
          fill="#315F5E"
        />
        <path
          d="M3 0q49-11 101 5 53-16 101-5v74q-50-12-101 2Q52 62 3 74Z"
          fill="#E6D4BE"
        />
        <path
          d="M9-4q47-11 95 5 49-16 95-5v70q-47-11-95 3Q55 55 9 66Z"
          fill="#FAF8F4"
        />
        <path d="M104 1v68" stroke="#CBAF8B" strokeWidth="3" />
        <path
          d="M24 20q28-3 58 5m-58 8q28-3 48 3m-48 10 31 2"
          stroke="#CBAF8B"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M126 22h51m-51 13h36m-36 13h42"
          stroke="#679F9E"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <g className="time-book-page">
          <path d="M104 1q49-16 95-5v70q-47-11-95 3Z" fill="#EEE1CF" />
          <path
            d="M125 20q26-5 52-2m-52 14 40-2m-40 15h31"
            stroke="#CBAF8B"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
        <path d="M26-6v29l9-6 9 8V-7Z" fill="#7EADDB" />
      </g>
      <g className="time-pencil">
        <g transform="translate(181 -13) rotate(29)">
          <rect x="-5" y="-37" width="10" height="58" rx="4" fill="#679F9E" />
          <path d="m-5 20 5 14 5-14" fill="#CBAF8B" />
          <path d="m-2 28 2 6 2-6" fill="#315F5E" />
          <path d="M-5-24H5" stroke="#E6D4BE" strokeWidth="4" />
        </g>
      </g>
    </g>
  );
}

function TidyMoment() {
  return (
    <g transform="translate(81 283)">
      <g className="time-stack-base">
        <rect y="62" width="167" height="30" rx="8" fill="#315F5E" />
        <path d="M14 69h146v16H14Z" fill="#E6D4BE" />
        <path d="M24 76h123" stroke="#CBAF8B" strokeWidth="2" />
      </g>
      <g className="time-stack-blue">
        <rect x="5" y="32" width="153" height="30" rx="8" fill="#7EADDB" />
        <path d="M19 39h131v16H19Z" fill="#FAF8F4" />
        <path d="M30 46h108" stroke="#E6D4BE" strokeWidth="2" />
      </g>
      <g className="time-stack-sand">
        <rect x="-3" y="2" width="162" height="30" rx="8" fill="#CBAF8B" />
        <path d="M11 9h140v16H11Z" fill="#FAF8F4" />
        <path d="M23 16h115" stroke="#E6D4BE" strokeWidth="2" />
        <path d="M121 2v20l7-5 7 5V2Z" fill="#679F9E" />
      </g>
    </g>
  );
}
