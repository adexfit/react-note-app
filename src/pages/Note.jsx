import React, { useEffect, useState } from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
//import notes from '../assets/data'
import { useParams, Link, useNavigate } from 'react-router-dom';

const Note = () => {
  const [note, setNote] = useState({})
  let navigate = useNavigate()
  let { id } = useParams();

  useEffect(() => {
      getNote()
  }, [id])

  let getNote = async () => {
    if(id === 'new') return
    let response = await fetch(`http://localhost:5000/notes/${id}`)
    let data = await response.json()
    setNote(data)
  }

  let createNote = async () => {
    await fetch(`http://localhost:5000/notes/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date() })
    })
  }

  let updateNote = async () => {
    await fetch(`http://localhost:5000/notes/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date() })
    })
  }

  let deleteNote = async () => {
    await fetch(`http://localhost:5000/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    navigate('/')
  }

  let handleSubmit = () => {
    if(id !== 'new' && !note.body ){
        deleteNote()
    } else if(id !== 'new'){
      updateNote()
    } else if(id === 'new'){
      createNote()
    }

    navigate('/')
  }

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to={'/'}>
              <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        { id !== 'new' ? (
            <button onClick={deleteNote}>Delete</button>
          ) : (
            <button>Done</button>
          )
        }
        

      </div>

      <textarea onChange={(e) => { setNote({ ...note, 'body': e.target.value }) }} placeholder="Edit note" value={note.body}></textarea> 
    </div>
  )
}

export default Note