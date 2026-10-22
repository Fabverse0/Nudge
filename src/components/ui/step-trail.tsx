export function StepTrail({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`step-trail ${className}`}
      viewBox="0 0 160 72"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="translate(12 47) rotate(-28)">
        <ellipse rx="8" ry="12" />
      </g>
      <g transform="translate(37 24) rotate(-18)">
        <ellipse rx="8" ry="12" />
      </g>
      <g transform="translate(62 47) rotate(-8)">
        <ellipse rx="8" ry="12" />
      </g>
      <g transform="translate(88 24) rotate(8)">
        <ellipse rx="8" ry="12" />
      </g>
      <g transform="translate(113 47) rotate(18)">
        <ellipse rx="8" ry="12" />
      </g>
      <g transform="translate(140 24) rotate(28)">
        <ellipse rx="8" ry="12" />
      </g>
    </svg>
  );
}
