import React, { Component } from 'react'
import { styled, Box } from 'reakit'
import get from 'lodash/get'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import Player from '../components/Player'
import { getPlaylist, getVideoById } from '../services/youtube'

const SIDEBAR_WIDTH = 280
const StyledAppContainer = styled(Box)`
  .app__sidebar {
    transition: transform 0.4s;
    position: fixed;
    left: 0;
    height: 100vh;
    width: ${SIDEBAR_WIDTH}px;
    overflow: auto;
    z-index: 4;
    background: rgba(0, 0, 0, 0.5);
    transform: translateX(
      ${props => (props.sidebarActive ? '0' : `-${SIDEBAR_WIDTH}px`)}
    );
  }
  .app__nav {
    background: rgba(0, 0, 0, 0.8);
    bottom: 0;
    left: 0;
    padding: 1rem;
    position: fixed;
    width: 100vw;
    z-index: 5;
  }
  .app__player {
    transition: all 0.4s;
    padding-left: ${props => (props.sidebarActive ? `${SIDEBAR_WIDTH}px` : '0')}
    position: relative;
    background: rgba(0, 0, 0, 0.15);
    height: 100vh;
  }
`

const getVideoIdFromWindowHash = () => {
  return window.location.hash.replace('#videoId=', '')
}

class App extends Component {
  state = {
    sidebarActive: false,
    playlist: [],
    currentVideo: null,
  }

  async componentDidMount() {
    this.setPlaylist()
    this.checkForVideoFromHash()
    window.onhashchange = this.checkForVideoFromHash
  }

  setPlaylist = async () => {
    const playlist = await getPlaylist()
    this.setState({ playlist: playlist })

    const videoId = window.location.hash.replace('#videoId=', '')
    const firstVideoId = get(playlist, '[0].snippet.resourceId.videoId')
    if (!videoId) {
      window.location.hash = `videoId=${firstVideoId}`
    }
  }

  setVideoById = async id => {
    const video = await getVideoById(id)
    this.setState({ currentVideo: video })
  }

  checkForVideoFromHash = () => {
    const videoId = getVideoIdFromWindowHash()
    if (videoId) {
      this.setVideoById(videoId)
    }
  }

  toggleSideBar = e => {
    e.preventDefault()
    this.setState(prevState => ({
      sidebarActive: !prevState.sidebarActive,
    }))
  }

  closeSidebar = () => {
    this.setState({ sidebarActive: false })
  }

  render() {
    const { sidebarActive, playlist, currentVideo } = this.state
    return (
      <StyledAppContainer sidebarActive={sidebarActive}>
        <Box className="app__sidebar">
          <Sidebar playlist={playlist} />
        </Box>
        <Box className="app__nav">
          <Nav toggleSideBar={this.toggleSideBar} />
        </Box>
        <Box className="app__player" onClick={this.closeSidebar}>
          <Player currentVideo={currentVideo} />
        </Box>
      </StyledAppContainer>
    )
  }
}

export default App
