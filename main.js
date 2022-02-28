const form = document.querySelector('form'),
  searchInput = document.querySelector('#search'),
  mealList = document.querySelector('.meals'),
  recipeModal = document.querySelector('.recipe-modal'),
  recipeWindow = document.querySelector('.recipe-details'),
  recipe = document.querySelector('.recipe-content'),
  closeBtn = document.querySelector('.close-btn');

const searchURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const lookupURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

form.addEventListener('submit', getMeals);
mealList.addEventListener('click', getRecipe);
closeBtn.addEventListener('click', closeRecipe);
recipeModal.addEventListener('click', closeRecipe);
recipeWindow.addEventListener('click', (e) => {
  e.stopPropagation();
});

async function getMeals() {
  let searchInputVal = searchInput.value.trim();
  const res = await fetch(`${searchURL}${searchInputVal}`);
  const data = await res.json();
  console.log(data);

  displayMeals(data.meals);
}

function displayMeals(meals) {
  let html = '';
  if (meals) {
    meals.forEach((meal) => {
      html += `
            <div class="meal" data-id="${meal.idMeal}">
                <div class="meal-img"><img src="${meal.strMealThumb}" alt=""></div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">View Recipe &rarr;</a>
                </div>
            </div>
            `;
    });
  } else {
    html = `<p>No meal was found. Please try again.<p>`;
  }

  mealList.innerHTML = html;
}

async function getRecipe(e) {
  if (e.target.classList.contains('recipe-btn')) {
    let mealItem = e.target.parentElement.parentElement;
    const res = await fetch(`${lookupURL}${mealItem.dataset.id}`);
    const data = await res.json();
    console.log(data);

    displayRecipe(data.meals[0]);
  }
}

function displayRecipe(meal) {
  let html = `
    <div class="recipe-img"><img src="${meal.strMealThumb}" alt=""></div>
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <div class="recipe-instruction">
        <h3>Instruction</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-watch">
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
    `;

  recipe.innerHTML = html;
  recipeModal.style.display = 'block';
}

function closeRecipe() {
  recipeModal.style.display = 'none';
}
