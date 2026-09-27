import { Helmet } from 'react-helmet-async'

/**
 * Inject one or more JSON-LD objects into the document head.
 * Uses dangerouslySetInnerHTML so crawlers receive raw JSON (Helmet children can escape).
 * @param {{ data: object | object[], id?: string }} props
 */
export default function JsonLd({ data, id = 'jsonld' }) {
  const payloads = Array.isArray(data) ? data : [data]

  return (
    <Helmet>
      {payloads.map((payload, index) => (
        <script
          key={`${id}-${payload['@type'] || index}-${index}`}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
        />
      ))}
    </Helmet>
  )
}
