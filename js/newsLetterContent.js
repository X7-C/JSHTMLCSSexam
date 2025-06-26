document.addEventListener("DOMContentLoaded", loadNewsletterRecipes);

async function loadNewsletterRecipes() {
  const container = document.getElementById('newsletter-highlights');
  container.innerHTML = '<p>Loading delicious recipes...</p>';

  try {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const recipes = [];

    for (let i = 0; i < 3; i++) {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await res.json();
      if (data.meals && data.meals.length > 0) {
        recipes.push(data.meals[0]);
      }
    }

    container.innerHTML = recipes.map(meal => `
      <div class="newsletter-card" onclick="viewRecipe('${meal.idMeal}')">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <h3>${meal.strMeal}</h3>
        <p>Try this tasty ${meal.strCategory.toLowerCase()} dish from ${meal.strArea} cuisine!</p>
        <button>View Recipe</button>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = '<p>Could not load recipes. Please try again later.</p>';
    console.error(err);
  }
}

function viewRecipe(id) {
  localStorage.setItem('selectedMealId', id);
  window.location.href = 'recipe.html';
}
