import React from 'react'
import { arrayOf, object } from 'prop-types'
import { styled, Box, Flex, Image } from 'reakit'

const StyledSidebar = styled(Box)`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      margin-bottom: -1px;
      position: relative;
      a {
        color: white;
        text-decoration: none;
      }
      .playlist__item {
        position: relative;
        padding: 15px 20px;
        align-items: flex-start;
        transition: all ease-in-out 0.3s;
        &:before {
          content: '';
          height: 100%;
          position: absolute;
          bottom: 1px;
          left: 0;
          right: 0;
          opacity: 0;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 60%,
            rgba(255, 255, 255, 0) 100%
          );
        }
        &:hover:before {
          transition: all ease-in-out 0.3s;
          opacity: 1;
        }
      }

      &:before {
        content: '';
        height: 1px;
        position: absolute;
        bottom: 1px;
        left: 0;
        right: 0;
        background-image: linear-gradient(
          to right,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0.05) 60%,
          rgba(255, 255, 255, 0) 100%
        );
      }
    }
  }
`

const SidebarPlaylist = ({ playlist }) => (
  <StyledSidebar>
    <ul>
      {playlist.map((v, i) => {
        const { title } = v.snippet
        const { videoId } = v.snippet.resourceId
        const imgUrl = v.snippet.thumbnails.default.url
        return (
          <li key={`${videoId}-${i}`}>
            <a href={`#videoId=${videoId}`}>
              <Flex className="playlist__item">
                <Image src={imgUrl} alt={title} width="45" marginTop="2px" />
                <Box marginLeft="8px">{title}</Box>
              </Flex>
            </a>
          </li>
        )
      })}
    </ul>
  </StyledSidebar>
)

const propTypes = {
  playlist: arrayOf(object),
}

const defaultProps = {
  playlist: [],
}

SidebarPlaylist.propTypes = propTypes
SidebarPlaylist.defaultProps = defaultProps
export default SidebarPlaylist
