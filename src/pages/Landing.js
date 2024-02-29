import { Drama } from "lucide-react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="w-full h-screen bg-slate-200 flex flex-col items-center gap-8 justify-center pb-12 px-8">
      <div className="flex gap-2">
        <Drama className="w-16 h-16 text-indigo-700" />
        <span class="bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 inline-block text-transparent bg-clip-text font-[bonny] text-6xl font-black">
          odyssey
        </span>
      </div>

      <span className="font-[satoshi] text-4xl text-center font-semibold ">
        Biggest college fest in India
      </span>

      <span className="text-2xl font-light -mt-6">IIT Kharagpur</span>

      <div className="fixed flex w-full top-4 px-4 gap-4 justify-between md:justify-end">
        <Link
          to="signup"
          className="bg-blue-500 font-semibold text-white rounded-lg px-4 py-2"
        >
          Signup
        </Link>
        <Link
          to="/login"
          className="border border-slate-600 font-semibold text-slate-600 rounded-lg px-4 py-2"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Landing;
