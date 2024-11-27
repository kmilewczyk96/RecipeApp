import style from "./MainNavigationBar.module.css";

import {Form, NavLink, useRouteLoaderData} from "react-router-dom";


export default function MainNavigationBar() {
  const token = useRouteLoaderData("root");

  const authenticatedLinks = (
    <>
      <li>
        <NavLink
          className={({isActive}) => isActive ? style["active"] : null}
          to={"/recipes"}
        >Recipes</NavLink>
      </li>
      <li>
        <NavLink
          className={({isActive}) => isActive ? style["active"] : null}
          to={"/my-profile"}
        >My Profile</NavLink>
      </li>
      <li>
        <Form action={"/logout"} method="post">
          <button>Logout</button>
        </Form>
      </li>
    </>
  );
  const unauthenticatedLinks = (
    <>
      <li>
        <NavLink
          className={({isActive}) => isActive ? style["active"] : null}
          to={"/auth/register"}
          end
        >Register</NavLink>
      </li>
      <li>
        <NavLink
          className={({isActive}) => isActive ? style["active"] : null}
          to={"/auth/login"}
          end
        >Log In</NavLink>
      </li>
    </>
  );


  return (
    <header className={style["main-navigation"]}>
      <nav>
        <div>
          <NavLink to={"/"} className={style["banner"]}>Recipe App</NavLink>
          <ul>
            <li>

            </li>
          </ul>
        </div>
        <div>
          <ul className={style["site-links"]}>
            {token ? authenticatedLinks : unauthenticatedLinks}
          </ul>
        </div>
      </nav>
    </header>
  );
}