function initRecipeSearch() {
  const form = document.getElementById('recipe-form');
  const resultsContainer = document.getElementById('results');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultsContainer.innerHTML = `<p>Searching recipes...</p>`;

    const ingredientsRaw = document.getElementById('ingredients').value;
    const diet = document.getElementById('diet').value.toLowerCase();
    const ingredientList = ingredientsRaw.split(',').map(item => item.trim()).filter(Boolean);

    if (ingredientList.length === 0) {
      resultsContainer.innerHTML = `<p>Please enter at least one ingredient.</p>`;
      return;
    }

    try {
      const mealMap = {};
      for (const ingredient of ingredientList) {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.meals) {
          for (const meal of data.meals) {
            if (mealMap[meal.idMeal]) {
              mealMap[meal.idMeal].count += 1;
            } else {
              mealMap[meal.idMeal] = { ...meal, count: 1 };
            }
          }
        }
      }

      const requiredMatches = ingredientList.length;
      let finalMeals = Object.values(mealMap).filter(meal => meal.count === requiredMatches);

      if (diet) {
        const filteredMeals = [];

        for (const meal of finalMeals) {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
          const data = await res.json();
          const fullMeal = data.meals[0];
          const text = `${fullMeal.strInstructions} ${fullMeal.strCategory}`.toLowerCase();

          if (text.includes(diet)) {
            filteredMeals.push(meal);
          }
        }

        finalMeals = filteredMeals;
      }

      displayRecipes(finalMeals);
    } catch (err) {
      resultsContainer.innerHTML = `<p class="error">Could not fetch recipes. Try again later.</p>`;
      console.error(err);
    }
  });

  function displayRecipes(meals) {
    if (!meals || meals.length === 0) {
      resultsContainer.innerHTML = `<p>No recipes found with all those ingredients.</p>`;
      return;
    }

    resultsContainer.innerHTML = meals.map(meal => `
      <div class="recipe-card" onclick="goToRecipe('${meal.idMeal}')">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <h3>${meal.strMeal}</h3>
      </div>
    `).join('');
  }

  window.goToRecipe = function(idMeal) {
    localStorage.setItem('selectedMealId', idMeal);
    window.location.href = 'recipe.html';
  };
}
