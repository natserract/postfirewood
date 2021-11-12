import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import styles from './Modal.styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useData } from 'src/store/configureStore'

type Props = {
  title: string
  openDialog: boolean
  setOpenDialog: Function
  children: React.ReactNode
  closeReason?: 'backdropClick' | 'escapeKeyDown' | 'disabled'
  onClose?: Function

  [k: string]: any
}

const useStyles = makeStyles(styles)

const Modal: React.FC<Props> = (props) => {
  const {
    title,
    openDialog,
    setOpenDialog,
    closeReason,
    onClose,
    children,
    ...restProps
  } = props

  const classes = useStyles()
  const isDisabled = closeReason && closeReason !== 'disabled'

  const [{ auth }] = useData()

  const handleClose = (_, reason: typeof closeReason) => {
    if (reason !== 'disabled') {
      setOpenDialog(false)
    }
    onClose()
  }

  const handleCloseActionButton = () => {
    setOpenDialog(false)
    onClose()
  }

  return (
    <Dialog
      className={classes.dialog}
      open={openDialog}
      onClose={(event, _reason) => handleClose(event, closeReason)}
      aria-labelledby="dialog-title"
      disableEscapeKeyDown={isDisabled}
      {...restProps}
    >
      <DialogTitle id="dialog-title" className={classes.dialogTitle}>
        {title}

        {!closeReason ||
          (isDisabled && (
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={() => handleCloseActionButton()}
            >
              <CloseIcon />
            </IconButton>
          ))}
      </DialogTitle>

      <DialogContent dividers className={classes.dialogContent}>
        {auth.loading ? <CircularProgress /> : children}
      </DialogContent>

      {/* <DialogActions>
        <Submit
          disabled={disabled}
          style={{ textTransform: 'capitalize' }}
          onClick={() => handleSubmit}
        >
          Simpan
        </Submit>
      </DialogActions> */}
    </Dialog>
  )
}

export default Modal
