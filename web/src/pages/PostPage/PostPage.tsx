import { MetaTags, useMutation, useQuery } from '@redwoodjs/web'
import { RouteComponentProps } from 'react-router-dom'
import { POST_QUERY } from './PostPage.graphql'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import styles from './PostPage.styles'
import Button from '@material-ui/core/Button'
import CreateRoundedIcon from '@material-ui/icons/CreateRounded'
import Modal from 'src/components/Modal/Modal'
import {
  Form,
  Label,
  TextField,
  FieldError,
  TextAreaField,
  useForm,
} from '@redwoodjs/forms'
import { useRef, useState } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { EDITPOST_MUTATION } from './PostPage.graphql'
import { stringToSlug } from 'src/utils/slug'
import { extractError } from 'src/utils/errors'

type RouteProps = RouteComponentProps<{
  id: string
}>

const useStyles = makeStyles(styles)

const PostPage: React.FC<RouteProps> = (props) => {
  const { id } = props.match.params
  const classes = useStyles()
  const formMethods = useForm()

  const formRef = useRef({
    title: '',
    body: '',
  })
  const [openDialog, setOpenDialog] = useState(false)

  const { data, loading, error, refetch } = useQuery(POST_QUERY, {
    variables: {
      id,
    },
  })
  const [editPostFunc] = useMutation(EDITPOST_MUTATION)

  const handleSubmit = async (data) => {
    if (data) {
      const { title, content } = data
      const responseEditPost = await editPostFunc({
        variables: {
          id,
          input: {
            title,
            slug: stringToSlug(title),
            body: content,
          },
        },
      })

      if (responseEditPost) {
        formMethods.reset()
        setOpenDialog(false)
        refetch()
      }

      return responseEditPost
    }
  }

  const handleEditPost = ({ title, body }) => {
    formRef.current = { title, body }
    setOpenDialog(true)
  }

  const renderForm = () => (
    <Form formMethods={formMethods} onSubmit={handleSubmit}>
      <div className="form-group">
        <Label name="title" className="label" errorClassName="label error" />
        <TextField
          name="title"
          className="input"
          errorClassName="input error"
          placeholder="Input your post title"
          defaultValue={formRef.current.title}
          validation={{
            required: true,
          }}
        />
        <FieldError name="title" className="error-message" />
      </div>

      <div className="form-group">
        <Label name="content" className="label" errorClassName="label error" />
        <TextAreaField
          name="content"
          className="input"
          errorClassName="input error"
          placeholder="Input your post content"
          defaultValue={formRef.current.body}
          validation={{
            required: true,
          }}
        />
        <FieldError name="content" className="error-message" />
      </div>

      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={{ textTransform: 'capitalize' }}
      >
        Submit
      </Button>
    </Form>
  )

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <p>Error: {extractError(error).message}</p>
  }

  return (
    <>
      <MetaTags title="Post" description="Post description" />

      <Container disableGutters={true}>
        <div className={classes.postTitleContainer}>
          <Typography className={classes.postTitle} component="h2" variant="h3">
            {data.post?.title}
          </Typography>

          <Tooltip title="Edit Post" aria-label="edit_post">
            <Button
              variant="text"
              color="inherit"
              startIcon={<CreateRoundedIcon />}
              className={classes.btnEdit}
              onClick={() => handleEditPost(data.post)}
              disableRipple
            />
          </Tooltip>
        </div>
        <article
          className={classes.postContent}
          dangerouslySetInnerHTML={{
            __html: data.post?.body,
          }}
        />
      </Container>

      <Modal
        title="Edit Post"
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        closeReason="backdropClick"
        onClose={console.log}
      >
        {renderForm()}
      </Modal>
    </>
  )
}

export default PostPage
