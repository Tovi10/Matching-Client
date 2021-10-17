import React, { useState } from 'react';
import ReactStickies from 'react-stickies'; //ES6

export default function Note(props) {

    const [notes, setNotes] = useState([]);

    // const onSave = () => {
    //     const notesArray = notes;
    //     notesArray.map(note => {
    //         // delete note.editorState;
    //     })
    // }

    const onChange = (notes) => {
        setNotes([...notes]);
    }

    return (
        <ReactStickies
            notes={notes}
            onChange={onChange}
        />
    )

}