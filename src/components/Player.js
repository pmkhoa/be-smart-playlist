import React from 'react'
import { object } from 'prop-types'
import { Box, styled } from 'reakit'
import get from 'lodash/get'
import YouTube from 'react-youtube'

const PlayerWrapper = styled(Box)`
  height: 100vh;
  .player__container {
    position: relative;
    z-index: 2;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .player__underlay {
    opacity: 0.35;
    position: fixed;
    width: 100vw;
    left: 0;
    top: 0;
    height: 100vh;
    background-image: url('${props => props.backgroundImgUrl}');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

    filter: blur(20px);
    z-index: 1;
  }

  .player__video-title {
    color: #fff;
    font-weight: 600;
    margin: 0.5rem 0;
    text-align: center;
  }

  .player__responsive {
    position: relative;
    overflow: hidden;
    padding-top: 56.25%;
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
`

const Player = ({ currentVideo }) => {
  if (currentVideo) {
    const videoId = currentVideo.id
    const imgUrl = get(currentVideo, 'snippet.thumbnails.medium.url')
    const { title } = currentVideo.snippet

    const opts = {
      height: '559',
      width: '1425',
    }

    return (
      <PlayerWrapper backgroundImgUrl={imgUrl}>
        <Box className="player__underlay" />
        <Box className="player__container">
          <Box width="720px" maxWidth="100%">
            <Box className="player__responsive">
              <YouTube videoId={videoId} opts={opts} />
            </Box>
            <Box className="player__video-title">{title}</Box>
          </Box>
        </Box>
      </PlayerWrapper>
    )
  }
  return null
}

const propTypes = {
  currentVideo: object,
}
const defaultProps = {
  currentVideo: null,
}

Player.propTypes = propTypes
Player.defaultProps = defaultProps
export default Player
