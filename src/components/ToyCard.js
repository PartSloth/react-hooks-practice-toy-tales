import React from "react";

function ToyCard({toy, onDelete, onLike}) {
  const {image, likes, name} = toy;

  function handleDeleteButton(event) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => onDelete(toy))
  }

  function handleLikeButton(event) {
    toy.likes = toy.likes + 1;
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: toy.name,
        image: toy.image,
        likes: toy.likes
      })
    })
    .then(res => res.json())
    .then(() => onLike(toy))
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikeButton}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDeleteButton}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
