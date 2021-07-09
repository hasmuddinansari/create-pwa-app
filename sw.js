const CACHE_NAME = 'version-1'

const URLS_TO_CACHES = ['./public/index.html']

const self = this

const installSW = event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHES)
    }),
  )
}

const fetchRequest = event => {
  event.respondWith(
    caches.match(event.request).then(() =>
      fetch(event.request).catch(() => {
        /* handle offline request
        caches.match('offline.html') */
      }),
    ),
  )
}


const handlePromises = (cacheNames, cacheWhiteList ) => Promise.all(
    cacheNames.map(cacheName => {
      if (!cacheWhiteList.includes(cacheName)) {
        return caches.delete(cacheName)
      }
    }),
  ),

const activateServiceWorker = event => {
  const cacheWhiteList = []
  cacheWhiteList.push(CACHE_NAME)
  event.waitUntil(
    caches.keys().then(cacheNames =>
      handlePromises(cacheNames, cacheWhiteList)
    ),
  )
}

/* INSTALL SERVICE WORKER */

self.addEventListener('install', installSW)

/* LISTEN FOR REQUEST */

self.addEventListener('fetch', fetchRequest)

/* ACTIVATE SERVICE WORKER */

self.addEventListener('activate', activateServiceWorker)
