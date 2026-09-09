import { useEffect, useState } from 'react'
import type { ProjectItem } from './ProjectCard'

type Props = {
  project: ProjectItem
  onClose: () => void
}

export function ProjectLightbox({ project, onClose }: Props) {
  const [index, setIndex] = useState(0)
  const images = project.images

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [images.length, onClose])

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} gallery`}
      onClick={onClose}
    >
      <div className="lightbox-panel" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="lightbox-media">
          <img src={images[index]} alt={`${project.name} — photo ${index + 1}`} />
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="project-nav project-nav-prev"
                aria-label="Previous photo"
                onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
              >
                ‹
              </button>
              <button
                type="button"
                className="project-nav project-nav-next"
                aria-label="Next photo"
                onClick={() => setIndex((i) => (i + 1) % images.length)}
              >
                ›
              </button>
            </>
          )}
        </div>
        <div className="lightbox-meta">
          <p className="lightbox-type">{project.type}</p>
          <h3>{project.name}</h3>
          <p>
            {project.location}
            {project.detail ? ` · ${project.detail}` : ''}
          </p>
          {images.length > 1 && (
            <p className="lightbox-count">
              {index + 1} / {images.length}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
