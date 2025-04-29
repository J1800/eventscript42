const CACHE_NAME='offline-v11'
const CACHE_FILE='eventscript42-v1.html'

self.addEventListener('install',e=>{
    self.skipWaiting()
    e.waitUntil(
        caches.open(CACHE_NAME).then(c=>c.add(CACHE_FILE))
    )
})

self.addEventListener('activate',e=>{
    e.waitUntil(
        caches.keys().then(keys=>
            Promise.all(
                keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))
            )
        ).then(()=>self.clients.claim())
    )
})

self.addEventListener('fetch',e=>{
    const url=new URL(e.request.url)
    if(url.pathname.endsWith(CACHE_FILE)){
        e.respondWith(
            caches.match(CACHE_FILE).then(r=>r||fetch(e.request))
        )
    }
})


