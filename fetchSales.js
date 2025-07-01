const axios = require('axios');  // import axios
const db = require('./db/database'); 

//  API URL
const API_URL = `http://api.petpooja.com/V1/orders/get_sales_data/?app_key=srd2neaq1xg7bzc6uyk5jmwv98o4tpfh&app_secret=fd08934c5224af4c975015e599d60a74bf857b4a&access_token=0442e1ee9899bc3806f1a40be490af4ec5c6602a&restID=51wok2zxnsad&from_date=2025-01-20 00:00:00&to_date=2025-01-20 23:59:59`

// API fetching
async function storeSalesData() {
  try {
    const res = await axios.get(API_URL); 
    // console.log(res.data);
    const salesData = res.data.Records;

    if (!Array.isArray(salesData) || salesData.length === 0) {
      console.log(" No sales data received.");
      return;
    }

   const insert = db.prepare(`
      INSERT INTO sales_data (
        receipt_number,
        sale_date,
        transaction_time,
        sale_amount,
        tax_amount,
        discount_amount,
        round_off,
        net_sale,
        payment_mode,
        order_type,
        transaction_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);


    salesData.forEach(sale => {
      insert.run(
        sale["Receipt number"] || '',
        sale["Receipt Date"] || '',
        sale["Transaction Time"] || '',
        parseFloat(sale["Invoice amount"] || 0),
        parseFloat(sale["Tax amount"] || 0),
        parseFloat(sale["Discount amount"] || 0),
        parseFloat(sale["Round Off"] || 0),
        parseFloat(sale["Net sale"] || 0),
        sale["Payment Mode"] || '',
        sale["Order Type"] || '',
        sale["Transaction status"] || ''
      );
    });

    insert.finalize();
    console.log(" Sales data inserted successfully!");

  } 
  catch (error) {
    console.error(" Error in fetching or inserting data:", error.message);
  }
}

storeSalesData();

