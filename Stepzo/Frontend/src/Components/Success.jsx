import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";
import { usePaymentStore } from "../Store/usePaymentStore";

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { createOrders } = usePaymentStore();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    const orderCreatedKey = `orderCreated_${sessionId}`;
    if (sessionId && !sessionStorage.getItem(orderCreatedKey)) {
      createOrders(sessionId);
      sessionStorage.setItem(orderCreatedKey, "true");
    }
  }, [searchParams, createOrders]);

  return (
    <div className="flex justify-center items-center bg-white h-screen w-full">
      <div className="text-2xl flex justify-center items-center border-1 border-black/25 flex-col w-[300px] h-[300px] rounded-2xl">
        <CircleCheckBig className="size-30 text-green-500 m-5" />
        <span className="py-2">Success </span>
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

export default Success;
