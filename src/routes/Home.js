import axios from "axios";
import Cupboard from './Cupboard';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const apiKey = "4d8c7b70cb994ecb8e9d31c55d7d894a"

const Home = ({ ingredients, setIngredients }) => {
  const [rec, setRecs] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  useEffect(() => {
    if (ingredients.length < 1) {
      setRecs(["Please add ingredients to get your recipes!"]);
    } else {
      const formattedString = ingredients.join(",+");
      axios
        .get(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${formattedString}&number=44&apiKey=${apiKey}`
        )
        .then((res) => {
          let ingredientInfo = res.data.map((item) => {
            return {
              id: item.id,
              missedIngredients: item.missedIngredients,
              usedIngredients: item.usedIngredients,
              missedIngredientCount: item.missedIngredientCount,
              usedIngredientCount: item.usedIngredientCount
            };
          });
          let ids = ingredientInfo.map((item) => item.id);
          ids = ids.toString();
          axios
            .get(
              `https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=${apiKey}`
            )
            .then((res) => {
              const matchedData = res.data.map((recipe) => {
                let matchingInfo = ingredientInfo.find(
                  (info) => info.id === recipe.id
                );
                if (matchingInfo) {
                  recipe.missedIngredients = matchingInfo.missedIngredients;
                  recipe.usedIngredients = matchingInfo.usedIngredients;
                  recipe.missedIngredientCount = matchingInfo.missedIngredientCount;
                  recipe.usedIngredientCount = matchingInfo.usedIngredientCount;
                }
                return recipe;
              });
              setOriginalData(matchedData);
              setRecs(matchedData);
            });
        })
        .catch((error) => {
          console.warn(error);
          setRecs([false]);
        });
    }
  }, [ingredients.length, ingredients]);

  const applyFilter = (filter) => {
    let currFilters= appliedFilters;
    if (appliedFilters.includes(filter)) {
      currFilters= currFilters.filter((item) => item !== filter)
    } else {
      currFilters= [...appliedFilters,filter];
    }
    if(filter==="vegan"&& appliedFilters.includes("vegetarian")){
      currFilters= currFilters.filter(item=> item!=="vegetarian");
    }
    if(filter==="vegetarian"&& appliedFilters.includes("vegan")){
      currFilters= currFilters.filter(item=> item!=="vegan");
    }
    if(filter==="least"&& appliedFilters.includes("most")){
      currFilters= currFilters.filter(item=> item!=="most");
    }
    if(filter==="most"&& appliedFilters.includes("least")){
      currFilters= currFilters.filter(item=> item!=="least");
    }
    let filtered = originalData;
    if (currFilters.includes("vegetarian")) {
      filtered = filtered.filter((item) => item.vegetarian === true);
    }
    if (currFilters.includes("vegan")) {
      filtered = filtered.filter((item) => item.vegan === true);
    }
    if (currFilters.includes("most")) {
      filtered = filtered.sort(
        (a, b) => b.usedIngredientCount - a.usedIngredientCount
      );
    }
    if (currFilters.includes("least")) {
      filtered = filtered.sort(
        (a, b) => b.missedIngredientCount - a.missedIngredientCount
      );
    }
    setAppliedFilters(currFilters);
    setRecs(filtered);
  };

  return (
    <>
    <Cupboard ingredients={ingredients} setIngredients={setIngredients}/>
       {rec.length === 1 &&
      rec[0] === "Please add ingredients to get your recipes!" ? (
        <div className="home">
          <div className="container">
            <h1>Welcome to Your Kitchen!</h1>
            <h3>
              Please add ingredients to get our
              recipes.
            </h3>
          </div>
        </div>
      ) : (
        <>
          <div className="dropdown">
            <button className="dropdown-toggle" id="dropdownMenuButton">
              Filter <span className="arrow-icon">&#9660;</span>
            </button>
            <div className="dropdown-menu" id="dropdownMenu">
              <small className={appliedFilters.includes("vegetarian")?"selected":null} onClick={() => applyFilter("vegetarian")}>
                Vegetarian
              </small>
              <br />
              <small className={appliedFilters.includes("vegan")?"selected":null} onClick={() => applyFilter("vegan")}>Vegan</small>
              <br />
              <div className="dropdown-divider"></div>
              <small className={appliedFilters.includes("most")?"selected":null}onClick={() => applyFilter("most")}>
                Most matched Ingredients
              </small>
              <br />
              <small className={appliedFilters.includes("least")?"selected":null} onClick={() => applyFilter("least")}>
                Least matched Ingredients
              </small>
            </div>
          </div>
          {
            appliedFilters.map((item, index)=>
              <p className="filterBubble" key={item}>{item}<button className="deleteIngredient" onClick={() => applyFilter(item)} key={index}>X</button></p>
              )
          }

          <div className="recipeContainer">
            {rec.map((recipe) =>
              recipe === false ? (
                // Handle the service down condition here
                <div key={recipe} className="error-message">
                  Service is currently down. Please try again later.
                </div>
              ) : (
                <>
                <Link
                  key={recipe.id}
                  to="/recipepage"
                  state={{ recipe: recipe }}
                  className="recipeLink"
                >
                  <div className="recipeWidget" key={recipe.id} style={{backgroundImage:"url("+recipe.image+")"}}>
                  </div>
                  <h3 key= {recipe.id+1}>{recipe.title}</h3>
                  
                </Link>
                </>
              )
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
