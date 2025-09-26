import React from 'react';
import { useParams } from 'react-router-dom';

export default function OrderConfirm(){
  const { id } = useParams();
  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
      <h2 className="text-2xl font-bold">Order Placed!</h2>
      <p className="mt-2">Thank you — your order id is <span className="font-mono">{id}</span>. Shivance Hotel will contact you shortly for confirmation.</p>
    </div>
  );
}
