import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Loginpage = () => {
  let { loginUser } = useContext(AuthContext);



  return (
    <div>
    
      <div className="flex items-center justify-center h-screen bg-gray-200 ">
        <div className="p-10 bg-white rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-center mb-4 text-blue-800">
            SHARE AND EDIT
          </h1>
          <form onSubmit={loginUser}>
            <div>
              <label htmlFor="email" className="sr-only">
                UserName
              </label>
              <input
                type="username"
                id="username"
                name="username"
                className="w-full p-2 border border-gray-300 rounded mt-1  focus:outline-none"
                placeholder="username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded mt-1  focus:outline-none"
                placeholder="password"
                required
              />
            </div>
            <div className="flex items-center justify-between mt-2 ">
              <div className="flex items-center mt-1">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-100 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900 mt-2"
                >
                  Remember me
                </label>
                <div className="text-sm ml-2">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500 "
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 mt-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-center text-sm mt-4">
            Not registered?
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Create new account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;