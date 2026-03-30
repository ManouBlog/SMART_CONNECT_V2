import React from "react";
import { assets } from '../assets/assets'
// import axios from "../config/apiconfig.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice.js";

const LoginPage = () => {
const [email, setEmail] = React.useState("");
const { loading, error, user } = useSelector((state) => state.authUser);
const dispatch = useDispatch();
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();


const handleLogin = async(e) => {
  e.preventDefault();
  if (loading) return;
  const response = await dispatch(loginUser({ email, password }));
  //console.log("response_AUTH", response);
  if(response.payload.token && response.payload.user.id){
        await Swal.fire({
      icon: "success",
      title: "Connexion réussie",
      text: "Redirection en cours...",
      timer: 1500,
      showConfirmButton: false,
    });
  const reponseRoute = getRedirectPathByRole(response.payload.user.role_id);
  navigate(reponseRoute);
  }
}

const getRedirectPathByRole = (roleId) => {
  const roleRoutes = {
    1: "/dashboard",
    2: "/dashboard",
    3:"/dashboard",
    4:"/dashboard"
  };

  return roleRoutes[roleId] || "/";
};


  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Partie gauche - Formulaire */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 md:p-0">
        <div className="w-full max-w-md p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl  text-gray-800 mb-6 md:mb-8 text-center">
            LOGIN
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm  mb-2"
                htmlFor="email"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border border-[#E5E5E5] rounded-lg w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="xxx@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
         <div className="mb-4 md:mb-6">
  <label
    className="block text-gray-700 text-sm mb-2"
    htmlFor="password"
  >
    Mot de passe <span className="text-red-500">*</span>
  </label>

  <div className="relative">
    <input
      className="appearance-none border border-[#E5E5E5] rounded-lg w-full py-2 md:py-3 px-3 md:px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="********"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
</div>
            {/* <div className="flex items-center justify-between mb-4 md:mb-6">
              <label className="flex items-center text-gray-700 text-sm">
                <input
                  type="checkbox"
                  className="mr-2 leading-tight"
                />
                <span className="text-sm">Se souvenir de moi</span>
              </label>
            </div> */}
            {error && <div className="bg-red-100 p-2 px-5  flex items-center rounded-lg"><p className="text-red-500 mb-2">{error}</p></div>}
            <br />
            <div className="flex items-center justify-center">
              <button 
                disabled={loading}
                
      className={`
        flex gap-3 justify-center items-center bg-amber-600 cursor-pointer hover:bg-amber-700 text-white font-bold py-2 md:py-3 px-6 md:px-12 rounded-lg focus:outline-none focus:shadow-outline w-full
        ${loading && "bg-gray-400 cursor-not-allowed opacity-70"}
        `}
              
                type="submit"
              >
                {loading ? (
                    <>
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        />
                        <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                    Connexion...
                    </>
                ) : (
                    "Se connecter"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Partie droite - Image et texte */}
      <div
        className="w-full md:w-1/2 bg-cover bg-center relative justify-center p-4 md:p-12 order-first md:order-last"
        style={{
          backgroundImage: `url(${assets.login})`,
          backgroundColor: "rgba(0,0,0,0.5)",
          backgroundBlendMode: "overlay",
          backgroundPosition: "right",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute bottom-20">
            <h1 className="font-bold text-white text-3xl">LCE SUPPORT</h1>
            {/* <h1 className="font-bold text-white text-3xl">UN SUPPORT SOLIDE</h1> */}
            <a href="https://lce-ci.com/" target="_blank"><h1 className="text-[#E27B1B]">lce-ci.com</h1></a>
        </div>
        <div className="absolute bottom-16 right-10">
            <h1 className=" text-white text-2xl"><i>Nous innovons, vous performez !</i></h1>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
