const jsonServer = require('json-server')
const playlist = require('./playlist.json')

const routes = {
  playlistItems: playlist,
}

const server = jsonServer.create()
const router = jsonServer.router(routes)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running')
})
