export const formatPrice = (price) => `${Number(price).toFixed(0)} руб.`;

export const getProductsUrl = (id, offset, q) => {
  let fetchUrl = `${process.env.REACT_APP_BASE_URL}items?offset=${offset}`;

  if (id) {
      fetchUrl += `&categoryId=${id}`
  }

  if (q) {
      fetchUrl += `&q=${q}`
  }

return fetchUrl
};