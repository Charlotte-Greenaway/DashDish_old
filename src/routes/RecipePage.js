import { useLocation, Navigate } from "react-router-dom";

const RecipePage = () => {
  const location = useLocation();
  const { state } = location;

  if (!state) {
    // Don't return anything here because you're redirecting
    return <Navigate to="/" />;
  } 
  const { recipe } = state;
  return (
    <div className="recipePage">
      <div id="headerRecipe">
        <div className="firstRec">
        <h1>{recipe.title}</h1>
        
      <p
        dangerouslySetInnerHTML={{
          __html: recipe.summary.split(". ").splice(0, 3).join(".<br/>"),
        }}
      ></p>
      <hr/>
      <small>Credit: {recipe.creditsText}</small>
        </div>

        <img alt={recipe.title} src={recipe.image}  id="recipeImage"/>
      </div>
      
      <br />
      <div className = "ingredientInfo">
        <div className="yourIngs">
            <h3>Your Ingredients</h3>
          {recipe.usedIngredients.map((ingredient) => (
            <p key={ingredient}>{ingredient.original}</p>
          ))}
        </div>
      <div className="missingIngs">
      <h3>Missing Ingredients</h3>
      {recipe.missedIngredients.map((ingredient) => (
        <p key={ingredient}>{ingredient.original}</p>
      ))}
      </div>
      
      </div>
      
      <h3 className="instructionsMap">Instructions</h3>
      {recipe.analyzedInstructions[0].steps.map((step) => (
        <p className="instructionsMap" key={step.number}>
          {step.number}.{step.step}
        </p>
      ))}
    </div>
  );
};

export default RecipePage;
