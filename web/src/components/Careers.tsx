import { useEffect } from 'react'
import { firm, gmailComposeUrl, openings } from '../data/content'

export function Careers() {
  useEffect(() => {
    const previous = document.title
    document.title = 'Careers | Bourna Consultants Engineers'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <section className="careers">
      <div className="wrap">
        <p className="section-label">Careers</p>
        <h1 className="section-title">Open roles</h1>
        <p className="section-lead">
          Drafting positions at the West Mambalam office. Send your CV from the listing below.
        </p>

        {openings.map((job) => {
          const applyUrl = gmailComposeUrl(job.applyEmail, job.subject)
          return (
            <article className="job-sheet" key={job.id} id={job.id}>
              <header className="job-head">
                <h2>{job.title}</h2>
                <a
                  className="btn btn-solid"
                  href={applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply now
                </a>
              </header>

              <dl className="job-facts">
                <div>
                  <dt>Location</dt>
                  <dd>{job.location}</dd>
                </div>
                <div>
                  <dt>Workplace</dt>
                  <dd>{job.workplace}</dd>
                </div>
                <div>
                  <dt>Eligibility</dt>
                  <dd>{job.eligibility}</dd>
                </div>
                <div>
                  <dt>Required skills</dt>
                  <dd>{job.skills}</dd>
                </div>
                <div>
                  <dt>Joining</dt>
                  <dd>{job.joining}</dd>
                </div>
              </dl>

              <h3>About the role</h3>
              <p>{job.summary}</p>

              <h3>What you will do</h3>
              <ul>
                {job.duties.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h3>What we need</h3>
              <ul>
                {job.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h3>What&apos;s in it for you</h3>
              <ul>
                {job.offer.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="job-apply">
                <a
                  className="btn btn-solid"
                  href={applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply now
                </a>
                <p>
                  Opens Gmail to {job.applyEmail} with the subject already filled in. Attach your CV
                  before sending.
                </p>
              </div>

              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'JobPosting',
                    title: job.title,
                    description: [job.summary, ...job.duties, ...job.requirements].join(' '),
                    datePosted: '2026-09-27',
                    hiringOrganization: {
                      '@type': 'Organization',
                      name: firm.name,
                      sameAs: firm.siteUrl,
                      email: job.applyEmail,
                    },
                    jobLocation: {
                      '@type': 'Place',
                      address: {
                        '@type': 'PostalAddress',
                        streetAddress: '50, Kirupasankari Street, West Mambalam',
                        addressLocality: 'Chennai',
                        postalCode: '600033',
                        addressRegion: 'Tamil Nadu',
                        addressCountry: 'IN',
                      },
                    },
                    directApply: true,
                  }),
                }}
              />
            </article>
          )
        })}
      </div>
    </section>
  )
}
