// Form docs @see https://redwoodjs.com/docs/forms
import {
  Form,
  Label,
  TextField,
  FieldError,
  PasswordField,
  useForm,
} from '@redwoodjs/forms'
import Button from '@material-ui/core/Button'
import { useCached } from 'src/store/configureStore'
import { MetaTags } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import Modal from 'src/components/Modal/Modal'
import { loginUser } from 'src/api/Authorizations'
import { Link } from 'react-router-dom'
import { useAuth } from '@redwoodjs/auth'

const LoginPage = () => {
  const authConfig = useAuth()
  const [cached] = useCached()
  const formMethods = useForm()

  const [loadingDialog, setLoadingDialog] = useState(false)
  const [openDialog, setOpenDialog] = useState(true)

  const handleSubmit = (data) => {
    if (data) {
      setLoadingDialog(true)

      handleSignIn(data)
        .then(() => {
          setLoadingDialog(false)
        })
        .catch((error) => {
          console.error('error', error.code)
        })
    }
  }

  const handleSignIn = async (data) => {
    try {
      const response = await loginUser(
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

  useEffect(() => {
    return () => {
      formMethods.reset()
    }
  }, [formMethods])

  return (
    <>
      <MetaTags
        title="Sign In"
        description="Please sign in for best experience"
      />

      <Modal
        title="Sign In"
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
            {loadingDialog ? 'Loading...' : 'Sign In'}
          </Button>

          <div style={{ marginTop: 25, fontSize: 13 }}>
            Don’t have an account?
            <Link to="/sign-up"> Sign up</Link>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default LoginPage
