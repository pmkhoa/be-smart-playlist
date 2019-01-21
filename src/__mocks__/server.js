const jsonServer = require('json-server')
const playlist = require('./playlist.json')
const videos = require('./video.json')

const routes = {
  playlistItems: playlist,
  videos: videos,
}

const server = jsonServer.create()
const router = jsonServer.router(routes)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running')
})
