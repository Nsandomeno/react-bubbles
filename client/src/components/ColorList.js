import React, { useState } from "react";
import axios from "axios";

import { axiosWithAuth } from '../utils/axiosWithAuth.js';




const initialColor = {
  color: "",
  code: { hex: "" },
  id: 0
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: '',
    code: { hex: ''},
    id: colors.length + 1
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = () => {
  
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((response) => {
        // console.log("This is response from put request:", response)
        updateColors(colors)
      })
      .catch((error) => {
        console.log("This is an error from put request:", error.message)
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    // console.log("Attempting to delete.")
    axiosWithAuth().delete(`/api/colors/${color.id}`)
      .then((response) => {
        console.log("This is response from delete request:", response)
        updateColors(colors)
        window.location.reload()
      })
      .catch((error) => {
        console.log("This is error from delete request:", error.message)
      })
  };

  const handleNewColor = (event) => {
      setNewColor({
        ...newColor,
        [event.target.name]: event.target.value
      })
  }

  const clearAddForm = (event) => {
    event.preventDefault();
    setNewColor({
      ...newColor,
      color: '',
      code: {hex: ''}
    })
  }

  const addNewColor = () => {
    axiosWithAuth().post('/api/colors', newColor)
      .then((response) => {
        console.log("This is a response from add color:", response)
      })
      .catch((error) => {
        console.log("This is an error from add color:", error)
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} id={color.id} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
          <form onSubmit={addNewColor}>
            <label> Color:
              <input
              name="color"
              value={newColor.color}
              onChange={handleNewColor}
              />
            </label>
            <label> Hex Code:
              <input
              // name="code"
              value={newColor.code.hex}
              onChange={(e) => setNewColor({
                ...newColor,
                code: {hex: e.target.value}
              })}
              />
            </label>
            <button type="submit">Add Color</button>
            <button onClick={clearAddForm}>Clear</button>
          </form>
    </div>
  );
};

export default ColorList;
