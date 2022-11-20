import { useState } from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { createNote } from '../features/notes/notesSlice'
import { toast } from 'react-toastify'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

export default function ModalItem(props){
  const {
    id,
    handleModal,
    showModal
  } = props
  const [noteText, setNoteText] = useState('')
  const dispatch = useDispatch()

  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({noteText, id}))
      .unwrap()
      .then(() => {
        setNoteText('')
        toast.success(`Note created`);
        handleModal()
      })
      .catch(toast.error)
  }
  
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={handleModal}
      style={customStyles} 
      contentLabel='Add Note'
    >
      <h2> Add Note </h2>
      <button
        className='btn-close'
        onClick={handleModal}
      >
       Close
      </button>
      <form onSubmit={onNoteSubmit}> 
        <div className='form-group'>
          <textarea
            name='noteText'
            id='noteText'
            className='form-control'
            placeholder='Note text'
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          >
          </textarea>
        </div>
        <div className='form-group'>
          <button className='btn' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </Modal>
  )
}