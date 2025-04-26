self.addEventListener('install',e=>{
    e.waitUntil(
        caches.open('offline-v5').then(c=>c.add('eventscript42.html'))
    )
})
self.addEventListener('fetch',e=>{
    const url=new URL(e.request.url)
    if(url.pathname.endsWith('eventscript42.html')){
        e.respondWith(
            caches.match('eventscript42.html').then(r=>r||fetch(e.request))
        )
    }
})

