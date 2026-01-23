/**
  * Fetch products and return the top 5 cheapest in-stock items.
  * */


async function getTopAffordableProducts() {
  try {
    const res = await fetch("https://api.example.com/products");
    const products = await res.json();

    return products
      .filter((p: any) => p.stock > 0)
      .sort((a: any, b: any) => a.price - b.price)
      .slice(0, 5);

  } catch (err) {
    console.error("Failed to fetch products", err);
    return [];
  }
}


