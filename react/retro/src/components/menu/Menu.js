
import React, {useState} from 'react';
import { Link } from 'react-router-dom';


export const NewMenu = () => {
  return (
    <Navbar>
      <NavItem  y="/">Editar Usuario</NavItem> 
      <NavItem/>
      <NavItem />
      <navItem >
      </navItem>
      
    </Navbar>

  );
}

// function DropdownMenu() {
//   function DropdownItem (props) {
//     return (
//       <a href="#" className ="menu-item">
//         <span className="icon-button">{props.lefticon}</span>
//         {props.children}
//         <span className="icon-right">{props.rightIcon}</span>
//       </a>
//     )

//   }

//   return (
//     <div className="dropdown">
//       <DropdownItem>MY MENU</DropdownItem>
//     </div>
//   )
// }

// function Navbar(props){
//   return(
//     <nav className="navbar">
//       <ul className="Navbar-nav">{ props.children }
//       </ul>
//     </nav>
//   )
// }

// function NavItem({children,y}){

//   const [open, setOpen] =useState(false);
//   return(
//     <li className="nav-item">
//       <Link to = {y} >

      
//        {open && children} 
//       </Link>
//     </li>
//   );
// }



//nClick={(e) => setOpen(!open)}