import { Button } from '@material-ui/core'

// Form docs @see https://redwoodjs.com/docs/forms
import {
  Form,
  Label,
  TextField,
  FieldError,
  PasswordField,
  useForm,
} from '@redwoodjs/forms'

import { useCached } from 'src/store/configureStore'
import { MetaTags } from '@redwoodjs/web'
import { Link, navigate, routes } from '@redwoodjs/router'
import { useState } from 'react'
import Modal from 'src/components/Modal/Modal'
import { loginUser } from 'src/api/Authorizations'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'

const LoginPage = () => {
  const auth = useAuth()
  const formMethods = useForm()
  const [cached] = useCached()

  const [openDialog, setOpenDialog] = useState(true)

  const handleSubmit = (data) => {
    if (data) {
      return handleSignIn(data)
    }
  }

  const handleSignIn = async (data) => {
    try {
      const response = await loginUser(data.email, data.password, cached)

      if (response) {
        const user = response.user

        if (user) {
          setOpenDialog(false)
          console.log('auth', auth)

          navigate(routes.dashboard(), {
            replace: true,
          })
        }
      }
    } catch (error) {
      console.error('error', error.code)
      toast.error(`Error: ${error.what}, Code: ${error.code}`)
    } finally {
      formMethods.reset()
    }
  }

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
            Sign In
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
