import React, { useState } from 'react'
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
import { CREATEPOST_MUTATION, POSTS_QUERY } from './DashboardPage.graphql'
import { toast } from '@redwoodjs/web/toast'
import { stringToSlug } from 'src/utils/slug'

const DashboardPage = () => {
  const [{ user, auth }] = useData()
  const formMethods = useForm()

  const { data: postsData, refetch: refetchPostsData } = useQuery(POSTS_QUERY)
  const [createPostFunc] = useMutation(CREATEPOST_MUTATION)

  const [openActivityDialog, setOpenActivityDialog] = useState(false)

  const handleSubmit = (data) => {
    if (data) {
      handleCreatePost(data)
        .then(() => {
          refetchPostsData()
          setOpenActivityDialog(false)
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

  const renderForm = () => (
    <Form formMethods={formMethods} onSubmit={handleSubmit}>
      <div className="form-group">
        <Label name="title" className="label" errorClassName="label error" />
        <TextField
          name="title"
          className="input"
          errorClassName="input error"
          placeholder="Input your post title"
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

  return (
    <>
      <MetaTags
        title="Dashboard"
        description="Hey! You're in dashboard page. See your posts here!"
      />

      <Navigation title="Dashboard" onClick={() => setOpenActivityDialog(true)}>
        <Modal
          title="Create New Post"
          openDialog={openActivityDialog}
          setOpenDialog={setOpenActivityDialog}
          closeReason="backdropClick"
        >
          {renderForm()}
        </Modal>
      </Navigation>

      <Container disableGutters={true}>
        {auth.loading ? (
          'Loading...'
        ) : (
          <div>JSON {JSON.stringify(postsData)}</div>
        )}
      </Container>
    </>
  )
}

export default DashboardPage
