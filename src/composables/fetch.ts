import { createFetch } from '@vueuse/core'
let isRefreshing = false
const refreshSubscribers: Array<() => void> = []

const cachedFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_URL,
  options: {
    async beforeFetch({ url, options, cancel }) {
      // Check if response is allready Cached
      // const myToken = await getMyToken()
      // options.headers.Authorization = `Bearer ${myToken}`
      // options.
      // return { options }
    },
    afterFetch({ data, response, context, execute }) {
      // Cache response
      if (needRefreshToken) {
        if (!isRefreshing) {
          isRefreshing = true
          refreshToken().then((newToken) => {
            if (newToken.value) {
              isRefreshing = false
              setMyToken(newToken.value)
              onRrefreshed()
            } else {
              refreshSubscribers.length = 0
              // handle refresh token error
            }
          })
        }

        return new Promise((resolve) => {
          addRefreshSubscriber(() => {
            execute().then((response) => {
              resolve({ data, response })
            })
          })
        })
      }

      return { data, response }
    },
    // or use onFetchError with updateDataOnError
    updateDataOnError: true,
    onFetchError({ error, data, response, context, execute }) {
      // same as afterFetch
      return { error, data }
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})

async function refreshToken() {
  const { data, execute } = useFetch<string>('refresh-token', {
    immediate: false,
  })

  await execute()
  return data
}

function onRrefreshed() {
  refreshSubscribers.forEach((callback) => callback())
  refreshSubscribers.length = 0
}

function addRefreshSubscriber(callback: () => void) {
  refreshSubscribers.push(callback)
}

export const useCachedFetch = cachedFetch
