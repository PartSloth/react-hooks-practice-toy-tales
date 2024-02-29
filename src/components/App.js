import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
    .then(res => res.json())
    .then(toys => {
      setToys(toys)
      console.log("Toy Data:", toys)
    })
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleNewToy(newToy) {
    const updateToys = [...toys, newToy];
    setToys(updateToys);
  }

  function handleDeletedToy(deletedToy) {
    const updateToys = toys.filter(toy => toy.id !== deletedToy.id);
    setToys(updateToys);
  }

  function handleUpdateLikes(updateToy) {
    const updateToys = toys.map(toy => {
      if(toy.id !== updateToy.id) {
        return toy;
      } else {
        return updateToy;
      }
    });
    setToys(updateToys);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddNewToy={handleNewToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDelete={handleDeletedToy} onLike={handleUpdateLikes} />
    </>
  );
}

export default App;
