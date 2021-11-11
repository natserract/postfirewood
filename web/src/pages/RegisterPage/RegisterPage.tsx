import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'
import Modal from 'src/components/Modal/Modal'
import {
  Form,
  Label,
  TextField,
  FieldError,
  PasswordField,
  useForm,
} from '@redwoodjs/forms'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { createUser } from 'src/api/ManageUser'
import { useCached } from 'src/store/configureStore'
import { useAuth } from '@redwoodjs/auth'
import { browserHistory } from 'src/utils/history'

const RegisterPage = () => {
  const authConfig = useAuth()
  const [cached] = useCached()
  const formMethods = useForm()

  const [openDialog, setOpenDialog] = useState(true)

  const handleSubmit = (data) => {
    if (data) {
      handleSignUp(data)
        .then(() => {
          browserHistory.push('/dashboard')
        })
        .catch((error) => {
          console.error('error', error.code)
        })
    }
  }

  // TODO: ADD VERIFICATION MESSAGE

  const handleSignUp = async (data) => {
    try {
      const response = await createUser(
        data.email,
        data.password,
        cached,
        authConfig
      )

      if (response) {
        return response
      }
    } catch (error) {
      console.error('error', error.code)
    }
  }

  return (
    <>
      <MetaTags
        title="Register"
        description="Please sign up if you not have an account"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <Modal
        title="Sign Up"
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        closeReason="disabled"
      >
        <Form formMethods={formMethods} onSubmit={handleSubmit}>
          <div className="form-group">
            <Label
              name="email"
              className="label"
              errorClassName="label error"
            />
            <TextField
              name="email"
              className="input"
              errorClassName="input error"
              placeholder="Input your email"
              validation={{
                required: true,
                pattern: {
                  value: /[^@]+@[^\.]+\..+/,
                  message: "Email isn't valid!",
                },
              }}
            />
            <FieldError name="email" className="error-message" />
          </div>

          <div className="form-group">
            <Label
              name="password"
              className="label"
              errorClassName="label error"
            />
            <PasswordField
              name="password"
              className="input"
              errorClassName="input error"
              placeholder="Input your password"
              validation={{
                required: true,
                maxLength: 30,
              }}
            />
            <FieldError name="password" className="error-message" />
          </div>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ textTransform: 'capitalize' }}
          >
            Sign Up
          </Button>

          <div style={{ marginTop: 25, fontSize: 13 }}>
            Have an account?
            <Link to="/sign-in"> Sign in</Link>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default RegisterPage