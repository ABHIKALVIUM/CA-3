const randomMealContainer = document.getElementById('randomMeal');
const header = document.querySelector("header");

window.addEventListener ("scroll", function() {
	header.classList.toggle ("sticky", window.scrollY > 0);
});

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navbar.classList.toggle('open');
};

window.onscroll = () => {
	menu.classList.remove('bx-x');
	navbar.classList.remove('open');
};
// JavaScript

// Function to fetch random images from the API
fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(response => response.json())
      .then(data => displayRandomMeal(data.meals[0]))
      .catch(error => console.error('Error fetching random meal:', error));
      function displayRandomMeal(meal) {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('meal');
        mealDiv.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <p>${meal.strMeal}</p>
        `;
        randomMealContainer.appendChild(mealDiv);
        randomMealContainer.style.marginTop='20px'
    
        mealDiv.addEventListener('click', () => displayIngredients(meal));
      }
     

// Function to fetch meal images based on user input
function searchByCategory() {
  const userInput = document.getElementById('categoryInput').value;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${userInput}`)
      .then(response => response.json())
      .then(data => displaySearchedMealImages(data.meals))
      .catch(error => console.error('Error fetching meal images:', error));
}
// ... (Previous code remains the same)

// Function to display searched meal images and text below
function displaySearchedMealImages(meals) {
  const searchedMealContainer = document.getElementById('searchedMealContainer');
  searchedMealContainer.innerHTML = ''; // Clear previous images

  if (meals && meals.length > 0) {
    meals.forEach(meal => {
      const mealDiv = document.createElement('div');
      mealDiv.classList.add('meal-item');

      const mealImage = document.createElement('img');
      mealImage.src = meal.strMealThumb;
      mealImage.alt = meal.strMeal;
      mealImage.style.alignItems = 'center';

      const mealName = document.createElement('p');
      mealName.textContent = meal.strMeal;
      mealName.style.marginTop = '10px';
      mealName.style.marginLeft='1px'; // Adding margin top to the <p> tag

      mealDiv.appendChild(mealImage);
      mealDiv.appendChild(mealName);

      searchedMealContainer.appendChild(mealDiv);
    });
  } else {
    searchedMealContainer.innerHTML = 'No meal images found for this category.';
    searchedMealContainer.style.marginLeft='600px';
    searchedMealContainer.style.fontSize='20px';
  }
}