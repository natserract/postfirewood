// import Modal from './Modal'
// import { action } from '@storybook/addon-actions'

export const Default = () => {
  return (
    // HAVE A PROBLEMS:
    // Invalid attempt to destructure non-iterable instance.
    // In order to be iterable, non-array objects must have a [Symbol.iterator]() method.
    //
    // <Modal
    //   title="Modal"
    //   openDialog={false}
    //   setOpenDialog={action('openDialogChanged')}
    //   closeReason="backdropClick"
    //   onClose={action('closed')}
    // >
    //   <p>Hello Im Children</p>
    // </Modal>
    <>
      <h2>Content not displayed</h2>
      If i show the code, error:{' '}
      {JSON.stringify('Invalid attempt to destructure non-iterable instance.')}
    </>
  )
}

export default { title: 'Components/Modal' }
