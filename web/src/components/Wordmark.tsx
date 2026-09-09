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
  const ink = variant === 'light' ? '#fafbfa' : '#2e322f'
  const bar = variant === 'light' ? '#9fbfb0' : '#1a3f32'

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
        fontFamily="Syne, Arial Black, Helvetica Neue, sans-serif"
        fontWeight="800"
        fontSize="68"
        letterSpacing="0.03em"
      >
        BOURNA
      </text>
      <text
        x="2"
        y="104"
        fill={ink}
        fontFamily="Syne, Helvetica Neue, sans-serif"
        fontWeight="700"
        fontSize="22"
        letterSpacing="0.12em"
      >
        CONSULTANTS-ENGINEERS
      </text>
      <rect x="0" y="118" width="460" height="18" fill={bar} />
    </svg>
  )
}
