/**
 * Inject JSON-LD in the document body (not via Helmet).
 * Helmet often omits script tags from prerendered HTML snapshots;
 * body scripts are valid for Google and survive Puppeteer page.content().
 * @param {{ data: object | object[], id?: string }} props
 */
export default function JsonLd({ data, id = 'jsonld' }) {
  const payloads = Array.isArray(data) ? data : [data]

  return (
    <>
      {payloads.map((payload, index) => (
        <script
          key={`${id}-${payload['@type'] || index}-${index}`}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
        />
      ))}
    </>
  )
}
