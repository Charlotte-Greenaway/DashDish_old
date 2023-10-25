import { useRef } from "react";

const Cupboard = ({ ingredients, setIngredients }) => {
  const ingRef = useRef(null);
  const setField = (e) => {
    e.preventDefault();
    if(!(ingredients.includes(ingRef.current.value)|| ingRef.current.value.trim()==="")){
      const newIngredients = [
        ...ingredients,
        ingRef.current.value.replace(" ", ""),
      ];
      setIngredients(newIngredients);
      ingRef.current.value = "";
    }
  };

  const removeIngredient = (itemtoremove) => {
    var ingreds = ingredients.filter(item => item!==itemtoremove);
    setIngredients(ingreds);
  }

  return (
    <>
      <div id="yourCupboard">
        <h1 className="cupboard">Your Cupboard</h1>
        <form onSubmit={setField}>
          <input type="text" ref={ingRef} id="ingredientBox" spellCheck="true" placeholder="Enter your ingredient here"></input>
          <input type="submit" /> 
        </form>

        <div id="ingredientList">
          {ingredients.map((item, index) => (
            <p key ={item} className="ingredientListItem">{item}<button className="deleteIngredient" onClick={() => removeIngredient(item)} key={index}>X</button></p>   
          ))}
        </div>
      </div>
    </>
  );
};

export default Cupboard;
