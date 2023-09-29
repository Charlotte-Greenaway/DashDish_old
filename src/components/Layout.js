import {Outlet, Link} from 'react-router-dom';
import logo from '../Images/logo.png';

const Layout =  () => {
    return(
        <>
        <nav>
        <ul>
          <li>
            <img src={logo} alt="logo" id="logo"/>
          </li>
          <div id="navLinks">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cupboard">Cupboard</Link>
            </li>
            <li>
              <Link to="/recipesearch">Recipe Search</Link>
            </li>
          </div>
        </ul>
      </nav>
      <main>
        <Outlet/>
      </main>
        </>
    )
}
export default Layout;