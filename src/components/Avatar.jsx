import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Avatar as AntdAvatar, Badge } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const StyledAvatar = styled(AntdAvatar)`
  user-select: none;
`

const Avatar = ({ size, photoUrl, name, email }) => {
  const avatarSize = size || 32

  if (photoUrl) {
    return <StyledAvatar size={avatarSize} src={photoUrl} />
  } else if (name) {
    const formattedName = name
      .split(' ')
      .map((str) => str.charAt(0).toUpperCase())
      .join('')
    return <StyledAvatar size={avatarSize}>{formattedName}</StyledAvatar>
  } else if (email) {
    return <StyledAvatar size={avatarSize}>{email.charAt(0).toUpperCase()}</StyledAvatar>
  }

  return <StyledAvatar size={avatarSize} icon={<UserOutlined />} />
}

const AvatarWithBadge = ({ badge = 0, ...rest }) => {
  return (
    <Badge count={badge} dot offset={[-3, 5]}>
      <Avatar {...rest} />
    </Badge>
  )
}

const avatarPropTypes = {
  size: PropTypes.number,
  photoUrl: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
}

Avatar.propTypes = {
  ...avatarPropTypes,
}

AvatarWithBadge.propTypes = {
  ...avatarPropTypes,
  badge: PropTypes.number,
}

export default AvatarWithBadge
