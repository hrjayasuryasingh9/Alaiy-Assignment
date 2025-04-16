import React from "react";
import { CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Cancel = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center bg-white h-screen w-full">
      <div className="text-2xl flex justify-center items-center border-1 border-black/25 flex-col w-[300px] h-[300px] rounded-2xl">
        <CircleX className="size-30 text-red-500 m-5" />
        <span className="py-2">Canceled</span>
        <button
          className="btn btn-neutral"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Back To Shopping
        </button>
      </div>
    </div>
  );
};

export default Cancel;
