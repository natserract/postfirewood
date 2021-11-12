import React, { useCallback, useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import { useData } from 'src/store/configureStore'
import Navigation from 'src/components/Navigation/Navigation'
import Modal from 'src/components/Modal/Modal'
import {
  Form,
  Label,
  TextField,
  FieldError,
  TextAreaField,
  useForm,
} from '@redwoodjs/forms'
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core'
import { useMutation, useQuery } from '@redwoodjs/web'
import {
  CREATEPOST_MUTATION,
  DELETEPOST_MUTATION,
  POSTS_QUERY,
  POST_QUERY,
} from './DashboardPage.graphql'
import { toast } from '@redwoodjs/web/toast'
import { stringToSlug } from 'src/utils/slug'
import Grid from '@material-ui/core/Grid'
import Card from 'src/components/Card/Card'
import { parseDate } from 'src/utils/date'
import { extractError } from 'src/utils/errors'

const DashboardPage = () => {
  const [{ user, auth }] = useData()
  const formMethods = useForm()

  const {
    data: postsData,
    error: errorPostsData,
    refetch: refetchPostsData,
  } = useQuery(POSTS_QUERY)

  const [selectedId, setSelectedId] = useState(null)

  const { data: postData } = useQuery(POST_QUERY, {
    variables: {
      id: selectedId,
    },
  })

  const [createPostFunc] = useMutation(CREATEPOST_MUTATION)
  const [deletePostFunc] = useMutation(DELETEPOST_MUTATION)

  const [openNewPostDialog, setOpenNewPostDialog] = useState(false)
  const [openEditPostDialog, setOpenEditPostDialog] = useState(false)

  const handleSubmit = (data) => {
    if (data) {
      handleCreatePost(data)
        .then(() => {
          refetchPostsData()
          setOpenNewPostDialog(false)
        })
        .catch((error) => {
          console.error('error', error.code)
          toast.error(`Error create post ${error.message}, ${error.code}`)
        })
    }
  }

  const handleCreatePost = async ({ title, content }) => {
    try {
      const responseCreatePost = await createPostFunc({
        variables: {
          input: {
            title,
            slug: stringToSlug(title),
            body: content,

            // We need edit in the backend {services/posts}
            // Example: db.post.findUnique({ where: { id: root.userId } }).user(),
            userId: user.id,
          },
        },
      })

      return responseCreatePost
    } catch (error) {
      console.error(error)
      toast.error(`Error handleCreatePost: ${error.what}, Code: ${error.code}`)
    }
  }
  const handleDeletePost = useCallback(
    async (id: string) => {
      try {
        const responseDeletePost = await deletePostFunc({
          variables: {
            id,
          },
        })

        refetchPostsData()
        return responseDeletePost
      } catch (error) {
        console.error(error)
        toast.error(
          `Error handleDeletePost: ${error.what}, Code: ${error.code}`
        )
      }
    },
    [deletePostFunc, refetchPostsData]
  )

  const renderForm = () => (
    <Form formMethods={formMethods} onSubmit={handleSubmit}>
      <div className="form-group">
        <Label name="title" className="label" errorClassName="label error" />
        <TextField
          name="title"
          className="input"
          errorClassName="input error"
          placeholder="Input your post title"
          value={postData?.post.title ?? ''}
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
          value={postData?.post.body ?? ''}
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

  const handleClickCard = useCallback((id: string) => {
    setSelectedId(id)
    setOpenEditPostDialog(true)
  }, [])

  const renderActivityItems = useCallback(() => {
    if (!postsData && !postsData?.posts) {
      return <Grid item>Fetching data...</Grid>
    }

    if (errorPostsData) {
      return <Grid item>{extractError(errorPostsData).message}</Grid>
    }

    return (
      postsData &&
      postsData.posts.map((item, index) => (
        <Grid item xs={12} sm={3} key={`item-${item.id}-${index}`}>
          <Card
            title={item?.title}
            date={parseDate(item?.createdAt)}
            onClick={() => handleClickCard(item.id)}
            onDelete={() => handleDeletePost(item.id)}
          />
        </Grid>
      ))
    )
  }, [postsData, errorPostsData, handleDeletePost, handleClickCard])

  return (
    <>
      <MetaTags
        title="Dashboard"
        description="Hey! You're in dashboard page. See your posts here!"
      />

      <Navigation title="Dashboard" onClick={() => setOpenNewPostDialog(true)}>
        <Modal
          title="Create New Post"
          openDialog={openNewPostDialog}
          setOpenDialog={setOpenNewPostDialog}
          closeReason="backdropClick"
        >
          {renderForm()}
        </Modal>
      </Navigation>

      <Container disableGutters={true}>
        {auth.loading ? (
          'Loading...'
        ) : (
          <Grid container spacing={3} alignItems="stretch">
            {renderActivityItems()}

            <Modal
              title="Edit Post"
              openDialog={openEditPostDialog}
              setOpenDialog={setOpenEditPostDialog}
              closeReason="backdropClick"
            >
              {renderForm()}
            </Modal>
          </Grid>
        )}
      </Container>
    </>
  )
}

export default DashboardPage
