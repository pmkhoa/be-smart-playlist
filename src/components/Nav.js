import React from 'react'
import { Box, Flex, Image, styled } from 'reakit'
import logo from '../assets/logo.png'

const StyledIcon = styled.a`
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.4s;
  line-height: 0;
  &:hover {
    color: #FF6F61;
  }
  span {
    margin-left: 10px;
  }
`

const Nav = ({ toggleSideBar }) => (
  <Flex justifyContent="space-between" alignItems="center">
    <Box>
      <StyledIcon href="#show-playlist" onClick={toggleSideBar}>
        <Flex alignItems="center">
          <Image src={logo} alt="Be Smart Playlist Logo" height="40px" />
          <span className="icon-lamp2" />
        </Flex>
      </StyledIcon>
    </Box>
  </Flex>
)

export default Nav
