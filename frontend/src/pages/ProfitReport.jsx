import { useEffect, useState } from "react";
import axios from "axios";

function ProfitReport() {

  const [profit, setProfit] = useState({
    totalSales:0,
    totalPurchase:0,
    profit:0
  });

  useEffect(()=>{

      fetchProfit();

  },[]);

  const fetchProfit = async ()=>{

      try{

          const res = await axios.get(
              "http://localhost:5000/api/reports/profit"
          );

          setProfit(res.data);

      }

      catch(error){

          console.log(error);

      }

  };

  return(

<div className="min-h-screen bg-gray-100 p-6">

<div className="bg-red-600 text-white rounded-lg p-5 mb-8">

<h1 className="text-3xl font-bold">

Profit Report

</h1>



</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div className="bg-white shadow rounded-xl p-6">

<h2 className="text-xl font-semibold mb-4">

Total Sales

</h2>

<p className="text-4xl font-bold text-green-600">

₹ {profit.totalSales}

</p>

</div>

<div className="bg-white shadow rounded-xl p-6">

<h2 className="text-xl font-semibold mb-4">

Total Purchase

</h2>

<p className="text-4xl font-bold text-orange-500">

₹ {profit.totalPurchase}

</p>

</div>

<div className="bg-white shadow rounded-xl p-6">

<h2 className="text-xl font-semibold mb-4">

Net Profit

</h2>

<p className={`text-4xl font-bold ${
profit.profit>=0
?
"text-green-600"
:
"text-red-600"
}`}>

₹ {profit.profit}

</p>

</div>

</div>

<div className="mt-10 text-center">

<button

onClick={()=>window.print()}

className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"

>

Print Report

</button>

</div>

</div>

  );

}

export default ProfitReport;