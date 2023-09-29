import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState} from 'react';
import Layout from './components/Layout';
import Home from './routes/Home';
import Cupboard from './routes/Cupboard';
import RecipePage from './routes/RecipePage';
import RecipeSearch from './routes/RecipeSearch';
import SearchRecipe from './routes/SearchRecipe';

function App() {
  const [ingredients, setIngredients] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home ingredients={ingredients}/>} />
          <Route path = "cupboard" element={<Cupboard ingredients={ingredients} setIngredients={setIngredients}/>} />
          <Route path="/recipepage" element={<RecipePage />} />
          <Route path="/recipesearch" element={<RecipeSearch />} />
          <Route path="/searchrecipe" element={<SearchRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



