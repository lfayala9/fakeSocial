import { Box, Typography, IconButton } from '@mui/material'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import { useAppSelector } from '../../utils/hooks/selector'
import { useState } from 'react'
import { likePost } from '../../utils/hooks/useGetPosts'
import LikeButton from '../Widgets/LikeButton'
import './styles.css'
import CommentButton from '../Comments/CommentButton'
import ShareModal from '../Widgets/ShareModal'
import useModal from '../../utils/hooks/useModal'

const PostWidget = ({
  direction,
  fontSize,
  pySize,
  pxSize,
  mbSize,
  likeCount,
  isLiked,
  id,
  openFun
}: {
  direction: 'row' | 'column'
  id: string
  fontSize: string
  pySize: number
  pxSize: number
  mbSize: number
  likeCount: number
  isLiked: boolean
  openFun: any
}): JSX.Element => {
  const { theme } = useAppSelector((state) => state.settings)
  const { user, token } = useAppSelector((state) => state.auth)
  const [liked, setLiked] = useState(isLiked)
  const [likedCount, setLikeCount] = useState(likeCount)
  const { open, handleOpen, handleClose } = useModal()

  const likeDislikePost = async (): Promise<void> => {
    await likePost(token, id, user?._id)
    setLiked(!liked)
    setLikeCount(likedCount + (liked ? -1 : 1))
  }

  return (
    <Box
      py={pySize}
      px={pxSize}
      mb={mbSize}
      display="flex"
      flexDirection={direction}
      justifyContent="space-between"
      className='widget-box'
      sx={{
        backgroundColor: theme === 'light' ? '#bdbdbd' : '#757575',
        borderRadius: '1rem'
      }}
    >
      <LikeButton
        isComment={false}
        likeDislikeFun={likeDislikePost}
        liked={liked}
        likedCount={likedCount}
        fontSize={fontSize}
      />
      <CommentButton
        fontSize={fontSize}
        openFun={openFun}
      />
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={handleOpen} sx={{ p: 0, m: '6px 6px 6px 6px' }} aria-label="Widget Button to share">
          <ShareOutlinedIcon fontSize="small" sx={{ color: 'black' }} />
        </IconButton>
        <Typography fontSize={fontSize} color="black">
          <span className="widget-text">Share</span>
        </Typography>
        <ShareModal handleClose={handleClose} open={open}/>
      </Box>
    </Box>
  )
}

export default PostWidget
