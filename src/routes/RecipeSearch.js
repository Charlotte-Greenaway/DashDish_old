import { useRef,useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const apiKey = "cf66ba73db1148cd87cad9e1fb1bb933";


const RecipeSearch = () => {

    
const recipeContainerRef = useRef(null);
  const cuisine = useRef(null);
  const diet = useRef(null);
  const intolerances = useRef(null);
  const type = useRef(null);
  const query = useRef(null);
    const [searchrecipes,setSearchrecipes]=useState([])
    useEffect(() => {
        if (searchrecipes.length > 0 && recipeContainerRef.current) {
          recipeContainerRef.current.scrollIntoView({
            behavior: "smooth", 
            block: "start", 
          });
        }
      }, [searchrecipes]);
  const filterOptions = {
    cuisine: [
      "select",
      "African",
      "Asian",
      "American",
      "British",
      "Cajun",
      "Caribbean",
      "Chinese",
      "Eastern European",
      "European",
      "French",
      "German",
      "Greek",
      "Indian",
      "Irish",
      "Italian",
      "Japanese",
      "Jewish",
      "Korean",
      "Latin American",
      "Mediterranean",
      "Mexican",
      "Middle Eastern",
      "Nordic",
      "Southern",
      "Spanish",
      "Thai",
      "Vietnamese",
    ],
    diet: [
      "select",
      "Gluten Free",
      "Ketogenic",
      "Vegetarian",
      "Lacto-Vegetarian",
      "Ovo-Vegetarian",
      "Vegan",
      "Pescetarian",
      "Paleo",
      "Primal",
      "low FODMAP",
      "Whole30",
    ],
    intolerances: [
      "select",
      "Dairy",
      "Egg",
      "Gluten",
      "Grain",
      "Peanut",
      "Seafood",
      "Sesame",
      "Shellfish",
      "Soy",
      "Sulfite",
      "Tree Nut",
      "Wheat",
    ],
    type: [
      "select",
      "main course",
      "side dish",
      "dessert",
      "appetizer",
      "salad",
      "bread",
      "breakfast",
      "soup",
      "beverage",
      "sauce",
      "marinade",
      "fingerfood",
      "snack",
      "drink",
    ],
  };

  const getResults = (e) => {
    e.preventDefault();
    const refs = [cuisine, diet, intolerances, type, query];
    let url=`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=12`
  // Loop through the refs and log their names and values
    refs.forEach((ref) => {
        if (ref.current) {
            if(ref.current.value!=="select"){
                url= url+"&"+ref.current.name+"="+ref.current.value.replace(" ","");
            }
        }
    });
    axios
        .get(
            url
        )
        .then((res) => {
            let data = res.data.results.map(recipe=>recipe.id);
            data = data.toString();
            axios
            .get(
              `https://api.spoonacular.com/recipes/informationBulk?ids=${data}&apiKey=${apiKey}`
            )
            .then((res) => {
              setSearchrecipes(res.data);
            });
        })
  };

  return (
    <>
      <div id="recipeSearchPage">
        <h1 className="cupboard" >
          Search For Recipes
        </h1>
        <form id="recipeSearch" onSubmit={getResults}>
          <input
            type="search"
            name="searchString"
            placeholder="Type here..."
            ref={query}
          />
          {Object.entries(filterOptions).map(([category, options]) => (
            <div key={category}>
              <h3>{category}</h3>
              <select
                name={category}
                id={category}
                ref={
                  category === "cuisine"
                    ? cuisine
                    : category === "diet"
                    ? diet
                    : category === "intolerances"
                    ? intolerances
                    : type
                }
              >
                {options.map((option, index) => (
                  <option
                    key={index}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <input type="submit" />
        </form>
      </div>
      <div className="recipeContainer" ref={recipeContainerRef}>
      {searchrecipes.map((recipe) =>
              recipe === false ? (
                // Handle the service down condition here
                <div key={recipe} className="error-message">
                  Service is currently down. Please try again later.
                </div>
              ) : (
                <Link
                  key={recipe.id}
                  to="/searchrecipe"
                  state={{ recipe: recipe }}
                >
                  <div className="recipeWidget" key={recipe.id}>
                    <div className="recipeContent">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="recipeImage"
                      />
                      <h3>{recipe.title}</h3>
                    </div>
                  </div>
                </Link>
              )
            )}
        </div>
    </>
  );
};

export default RecipeSearch;
