import axios from 'axios'
import _ from 'lodash'

export const getPlaylist = async () => {
  const playlistUrl = `${
    process.env.REACT_APP_YOUTUBE_API_URL
  }/playlistItems?part=snippet&maxResults=50&playlistId=${
    process.env.REACT_APP_YOUTUBE_PLAYLIST
  }&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`

  const res = await axios.get(playlistUrl)
  return _.get(res, 'data.items', [])
}

export const getVideoById = async id => {
  const videoUrl = `${
    process.env.REACT_APP_YOUTUBE_API_URL
  }/videos?part=snippet&id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`

  const res = await axios.get(videoUrl)
  return _.get(res, 'data.items[0]', null)
}
