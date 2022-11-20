
import axios from 'axios'

let API_URL = 'http://localhost:5000/api/tickets'

const getNotes = async(id, token) => {
  var header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  let url = API_URL + `/${id}/notes`
  const response = await axios.get(url, header)
  return response.data
}

const createNote = async(noteText, id, token) => {
  try {
    var header = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  let url = API_URL + `/${id}/notes`
  var postNote = {
    text: noteText ? noteText : "note not send",
  }
  const response = await axios.post(url, postNote, header)
  return response.data
  } catch (error) {
    console.log(error)
  }
}

const deleteNote = async(idNote, id, token) => {
  try {
    var header = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    let url = API_URL + `/${id}/notes/${idNote}`
    const response = await axios.delete(url, header)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const notesService = {
  getNotes, 
  createNote,
  deleteNote
}

export default notesService
