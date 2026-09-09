import { useState } from 'react'

export type ProjectItem = {
  id: string
  name: string
  location: string
  type: string
  detail: string
  images: string[]
}

type Props = {
  project: ProjectItem
  onOpen: (project: ProjectItem) => void
}

export function ProjectCard({ project, onOpen }: Props) {
  const [index, setIndex] = useState(0)
  const images = project.images
  const hasGallery = images.length > 1
  const current = images[index]

  const go = (dir: -1 | 1) => {
    if (!hasGallery) return
    setIndex((i) => (i + dir + images.length) % images.length)
  }

  return (
    <article className="project">
      <div className="project-visual has-image">
        <button
          type="button"
          className="project-open"
          onClick={() => onOpen(project)}
          aria-label={`Open gallery for ${project.name}`}
        >
          <img
            key={current}
            src={current}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </button>

        {hasGallery && (
          <>
            <button
              type="button"
              className="project-nav project-nav-prev"
              aria-label={`Previous photo of ${project.name}`}
              onClick={() => go(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="project-nav project-nav-next"
              aria-label={`Next photo of ${project.name}`}
              onClick={() => go(1)}
            >
              ›
            </button>
            <div className="project-dots" aria-hidden="true">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={i === index ? 'is-active' : ''}
                  aria-label={`Photo ${i + 1}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <span className="project-count">
              {index + 1}/{images.length}
            </span>
          </>
        )}
      </div>
      <div className="project-meta">
        <p className="project-type">{project.type}</p>
        <h3>
          <button type="button" className="project-title-btn" onClick={() => onOpen(project)}>
            {project.name}
          </button>
        </h3>
        <p>
          {project.location}
          {project.detail ? ` · ${project.detail}` : ''}
        </p>
      </div>
    </article>
  )
}
