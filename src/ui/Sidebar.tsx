import { HiOutlineHome } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

function SideBar() {
    return (
        <aside className="sidebar">
            <nav>
                <ul className="sidebar-ul">
                    <li>
                        <NavLink to="/" className="text-gray-300 hover:text-white">Home</NavLink>
                        <HiOutlineHome />
                    </li>
                    <li><NavLink to="/about" className="text-gray-300 hover:text-white">About</NavLink></li>
                    <li><NavLink to="/saved" className="text-gray-300 hover:text-white">Saved</NavLink></li>
                </ul>
            </nav>
        </aside>
    )
}

export default SideBar;
// This file defines a functional component named `SideBar` that renders a sidebar navigation menu. 
// The sidebar contains links to different sections of the application, including "Home", "About", and "Saved". 
// Each link has a hover effect that changes its text color. 
// The sidebar is styled using Tailwind CSS classes for layout, spacing, and colors.