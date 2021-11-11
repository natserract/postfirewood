import { MetaTags, useMutation } from '@redwoodjs/web'
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
import { CREATEUSER_MUTATION } from './Register.graphql'
import { encryptData } from 'src/utils/encrypt'

const RegisterPage = () => {
  const authConfig = useAuth()
  const [cached] = useCached()
  const formMethods = useForm()

  const [createUserFunc] = useMutation(CREATEUSER_MUTATION)

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

  const handleSignUp = async (input) => {
    try {
      const { email, password } = input
      const hashedPassword = encryptData(password)

      const response = await createUser(email, password, cached, authConfig)

      if (response) {
        const { data } = await createUserFunc({
          variables: {
            input: {
              uid: response.user.uid,
              name: email,
              email,
              hashedPassword,
            },
          },
        })

        console.log('response', response)
        console.log('data register user', data)
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
