import { useLocation, Navigate } from "react-router-dom";

const RecipeSearch = () => {
  const location = useLocation();
  const { state } = location;

  if (!state) {
    // Don't return anything here because you're redirecting
    return <Navigate to="/" />;
  }
  const { recipe } = state;

  return (
    <div class="recipePage">
      <h1>{recipe.title}</h1>
      <img alt={recipe.title} src={recipe.image} />
      <br />
      <small>Credit: {recipe.creditsText}</small>
      <h3>Summary</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: recipe.summary.split(". ").splice(0, 3).join(".<br/>"),
        }}
      ></p>
      <h3>Ingredients</h3>
      {
        recipe.extendedIngredients.map(
            (item)=><p>{item.original}</p>
        )
      }
      <h3 className="instructionsMap">Instructions</h3>
      {recipe.analyzedInstructions[0].steps.map((step) => (
        <p className="instructionsMap" key={step.number}>
          {step.number}.{step.step}
        </p>
      ))}
    </div>
  );
};

export default RecipeSearch;
