import { useSelector } from 'react-redux'

export default function NoteItem({ note, deleteNote }) {
  const { user } = useSelector(state => state.auth)


  return (
    <div
      className='note'
      style={{
        backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
        color: note.isStaff ? '#fff' : '#000',
      }}
    >
      <h4>
        Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
      </h4>
      <p>{note.text}</p>
      <div className='note-date'>
        {new Date(note.createdAt).toLocaleString('en-US')}
      </div>
      {!note.isStaff && 
        <div
        style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
      >
        <button className='btn' style={{marginBottom: '0'}} onClick={() => deleteNote(note._id)}>
          Delete
        </button>
      </div>
      }
    </div>
  )
} 