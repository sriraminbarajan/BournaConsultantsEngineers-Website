type WordmarkProps = {
  variant?: 'light' | 'dark'
  className?: string
  title?: string
}

/** Vector recreation of the Bourna logo — no white box, works on any background. */
export function Wordmark({
  variant = 'dark',
  className = '',
  title = 'Bourna Consultants Engineers',
}: WordmarkProps) {
  const ink = variant === 'light' ? '#f7f6f3' : '#1c1f1d'
  const bar = variant === 'light' ? '#a8c4b6' : '#1a3f32'

  return (
    <svg
      className={className}
      viewBox="0 0 560 148"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <text
        x="0"
        y="68"
        fill={ink}
        fontFamily="Archivo, Helvetica Neue, sans-serif"
        fontWeight="700"
        fontSize="68"
        letterSpacing="0.02em"
      >
        BOURNA
      </text>
      <text
        x="2"
        y="104"
        fill={ink}
        fontFamily="Archivo, Helvetica Neue, sans-serif"
        fontWeight="600"
        fontSize="22"
        letterSpacing="0.08em"
      >
        CONSULTANTS-ENGINEERS
      </text>
      <rect x="0" y="118" width="460" height="18" fill={bar} />
    </svg>
  )
}
