import wishes from '../public/wishes.json'

const getPrice = (amount, currency) =>
  Math.ceil(amount).toLocaleString("ru", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  });


const getWish = ({ name, link, price, currency }) => 
  `<li class="wish">
    <a class="link" href="${link}" target="_blank" rel="nofollow noopener">${name}</a>&nbsp;&mdash; 
    <span>${getPrice(price, currency)}</span>
  </li>`

const render = ({ categories, items }) => {
  const html = categories.map(({ id, name }) => {
    const title = `<h4 class="category-title">${name}</h4>`;
    const data = items
      .filter(({ categoryId }) => categoryId === id)
      .map(getWish)
      .join('');

    return `<div class="category">${title}<ul>${data}</ul></div>`;
  }).join('');

  document.querySelector("#root").innerHTML = html;
};

document.addEventListener('DOMContentLoaded', () => {
  render(wishes);
});