import React, {useState} from "react";

function ToyForm({onAddNewToy}) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    likes: 0
  })

  function handleFormChange(event) {
    const updateFormData = {...formData}
    updateFormData[event.target.name] = event.target.value;
    setFormData(updateFormData);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        image: formData.image,
        likes: formData.likes
      })
    })
    .then(res => res.json())
    .then(newToy => onAddNewToy(newToy))
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleFormSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          onChange={handleFormChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          onChange={handleFormChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
