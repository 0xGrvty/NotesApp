import React, { useState, useEffect } from 'react'
//import notes from '../assets/data'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { useParams, useNavigate } from 'react-router-dom'

const NotePage = () => {
  const navigate = useNavigate()
  let noteID = useParams().id

  let [note, setNote] = useState(null)
  useEffect(() => {

    getNote()
  
  }, [noteID])

  let getNote = async () => {
    if (noteID === 'new') return

    let response = await fetch(`http://localhost:5000/notes/${noteID}`)
    let data = await response.json()
    setNote(data)
  }

  let createNote = async () => {
    await fetch(`http://localhost:5000/notes/`, {
      method:'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify({...note, 'updated': new Date()})
    })
  }

  let updateNote = async () => {
    await fetch(`http://localhost:5000/notes/${noteID}`, {
      method:'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify({...note, 'updated': new Date()})
    })
  }

  let deleteNote = async () => {
    await fetch(`http://localhost:5000/notes/${noteID}`, {
      method:'DELETE',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify(note)
    })
    navigate('/')
  }

  let handleSubmit = () => {
    if (noteID !== 'new' && !note.body) {
      deleteNote()
    } else if (noteID !== 'new') {
      updateNote()
    } else if (noteID === 'new' && note !== null) {
      createNote()
    }
    navigate('/')
  }

  //let note = notes.find(note => note.id === Number(noteID))
  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {noteID !== 'new' ? (
          <button onClick={deleteNote}>Delete it</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}

        
      </div>

      <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage
