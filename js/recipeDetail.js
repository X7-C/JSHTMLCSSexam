async function loadRecipe() {
  const idMeal = localStorage.getItem('selectedMealId');
  const container = document.getElementById('recipe-container');

  if (!idMeal) {
    container.innerHTML = "<p>No recipe selected.</p>";
    return;
  }

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    const data = await res.json();
    const meal = data.meals[0];

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }

    container.innerHTML = `
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-detail-img" />
      <p><strong>Category:</strong> ${meal.strCategory}</p>
      <p><strong>Area:</strong> ${meal.strArea}</p>

      <h3>Ingredients</h3>
      <ul class="ingredients-list">
        ${ingredients.map(item => `<li>${item}</li>`).join('')}
      </ul>

      <h3>Instructions</h3>
      <p>${meal.strInstructions}</p>

      <div class="centered-button">
        <a href="search.html" class="cta">← Back to Search</a>
      </div>
    `;
  } catch (err) {
    container.innerHTML = "<p>Error loading recipe.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadRecipe);
