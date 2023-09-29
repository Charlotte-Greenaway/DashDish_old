import { useRef } from "react";

const Cupboard = ({ ingredients, setIngredients }) => {
  const ingRef = useRef(null);
  const setField = (e) => {
    e.preventDefault();
    const newIngredients = [
      ...ingredients,
      ingRef.current.value.replace(" ", ""),
    ];
    setIngredients(newIngredients);
    ingRef.current.value = "";
  };
  return (
    <>
      <div id="yourCupboard">
        <h1 className="cupboard">Your Cupboard</h1>
        <form onSubmit={setField}>
          <input type="text" ref={ingRef} id="ingredientBox" spellCheck="true" placeholder="Enter your ingredient here"></input>
          <input type="submit" /> 
        </form>

        <div id="ingredientList">
          {ingredients.map((item) => (
            <p key ={item} className="ingredientListItem">{item}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cupboard;
