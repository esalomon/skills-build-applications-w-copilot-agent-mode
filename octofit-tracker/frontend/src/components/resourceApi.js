const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export const isCodespaceConfigured = Boolean(codespaceName)

export const buildApiUrl = (resource) => `${API_BASE_URL}/${resource}/`

export const normalizeApiResponse = (payload) => {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      count: payload.length,
      next: null,
      previous: null,
    }
  }

  if (!payload || typeof payload !== 'object') {
    return {
      items: [],
      count: 0,
      next: null,
      previous: null,
    }
  }

  const knownCollections = ['results', 'items', 'data']

  for (const key of knownCollections) {
    if (Array.isArray(payload[key])) {
      return {
        items: payload[key],
        count: payload.count ?? payload.total ?? payload[key].length,
        next: payload.next ?? null,
        previous: payload.previous ?? null,
      }
    }
  }

  const firstArray = Object.values(payload).find(Array.isArray)

  if (Array.isArray(firstArray)) {
    return {
      items: firstArray,
      count: payload.count ?? payload.total ?? firstArray.length,
      next: payload.next ?? null,
      previous: payload.previous ?? null,
    }
  }

  return {
    items: [],
    count: 0,
    next: payload.next ?? null,
    previous: payload.previous ?? null,
  }
}
