import { useEffect, useMemo, useState } from 'react'
import { buildApiUrl, isCodespaceConfigured, normalizeApiResponse } from './resourceApi'

function formatValue(value) {
  if (value === null || value === undefined) {
    return 'N/A'
  }

  if (typeof value === 'object') {
    return JSON.stringify(value)
  }

  return String(value)
}

function ResourceCollection({ resource, title, description }) {
  const endpoint = useMemo(() => buildApiUrl(resource), [resource])
  const [rows, setRows] = useState([])
  const [count, setCount] = useState(0)
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        const normalized = normalizeApiResponse(payload)

        setRows(normalized.items)
        setCount(normalized.count)
        setNext(normalized.next)
        setPrevious(normalized.previous)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
        }
      } finally {
        setLoading(false)
      }
    }

    loadData()

    return () => controller.abort()
  }, [endpoint])

  const columns = useMemo(() => {
    if (!rows.length) {
      return []
    }

    const keys = new Set()

    rows.forEach((row) => {
      Object.keys(row).forEach((key) => keys.add(key))
    })

    return Array.from(keys)
  }, [rows])

  return (
    <section className="container py-4">
      <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
        <div>
          <h2 className="h3 mb-2">{title}</h2>
          <p className="text-body-secondary mb-0">{description}</p>
        </div>
        <div className="text-end">
          <div className="small text-body-secondary">Endpoint</div>
          <code>{endpoint}</code>
        </div>
      </div>

      {!isCodespaceConfigured && (
        <div className="alert alert-warning" role="alert">
          VITE_CODESPACE_NAME is not set. Falling back to <code>http://localhost:8000/api</code>.
        </div>
      )}

      {loading && <p>Loading {resource}...</p>}

      {error && !loading && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge text-bg-primary">Items: {count}</span>
            <span className="small text-body-secondary">
              Pagination: previous={previous ? 'yes' : 'no'}, next={next ? 'yes' : 'no'}
            </span>
          </div>

          {!rows.length ? (
            <div className="alert alert-info" role="alert">
              No records found.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th scope="col" key={column}>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={row.id ?? row._id ?? `${resource}-${rowIndex}`}>
                      {columns.map((column) => (
                        <td key={`${column}-${rowIndex}`}>{formatValue(row[column])}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default ResourceCollection
