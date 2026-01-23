/**
 * Problem
The API returns only 50 results per page:
GET /transactions?page=1

Fetch ALL pages and return total amount.
 */

async function fetchAllTransactions() {
  let page = 1;
  let all: any[] = [];

  while (true) {
    const res = await fetch(`https://api.example.com/transactions?page=${page}`);
    const data = await res.json();

    if (data.length === 0) break;

    all = all.concat(data);
    page++;
  }

  const total = all.reduce((sum, t) => sum + t.amount, 0);

  return total;
}


