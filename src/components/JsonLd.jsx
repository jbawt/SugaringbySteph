import { Helmet } from 'react-helmet-async'

/**
 * Inject one or more JSON-LD objects into the document head.
 * @param {{ data: object | object[] }} props
 */
export default function JsonLd({ data }) {
  const payloads = Array.isArray(data) ? data : [data]

  return (
    <Helmet>
      {payloads.map((payload, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(payload)}
        </script>
      ))}
    </Helmet>
  )
}
