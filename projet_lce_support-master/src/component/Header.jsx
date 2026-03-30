import React from "react";
import { UserRound } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiconfig from "../config/apiconfig";
import { useDispatch } from 'react-redux';
import {toggleIsSpinner} from "../store/slices/isLoadingSlice.js"


const Header = () => {
  const { user } = useSelector((state) => state.authUser);
  const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const handleLogout = async () => {
    //console.log('handleLogoutADMIN')
    dispatch(toggleIsSpinner(true))
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await apiconfig.post(
          "/auth/logout",
          {}, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/", { replace: true });
       dispatch(toggleIsSpinner(false))
    }
  };
  return (
    <div className="bg-white px-30 flex items-center border-b border-b-[#E5E5E5] p-4 md:px-4">
      <div className="flex items-center gap-5 justify-end w-full">
        <div
          className="flex gap-3 relative cursor-pointer"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {/* Avatar */}
          <div className="border flex justify-center items-center h-13 w-13 border-[#E5E5E5] rounded-full">
            <UserRound size={18} />
          </div>

          {/* User Info */}
          <div>
            <ul>
              <li>{user?.first_name}</li>
              <li className="font-bold">{user?.last_name}</li>
             <li>
  <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-full">
    {user.role.title}
  </span>
</li>
            </ul>
            
          </div>

          {/* Dropdown Card */}
          {open && (
          <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 transition-all duration-200">
  <ul className="py-2 text-sm">
    <li>
      <Link
        to="/compteadmin"
        className="block px-4 py-2 hover:bg-gray-50 transition"
      >
        Mon compte
      </Link>
    </li>

    <li>
      <a
       onClick={handleLogout}
        href="#"
        className="block px-4 py-2 hover:bg-red-50 text-red-500 transition"
      >
        Déconnexion
      </a>
    </li>
  </ul>
</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;