const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals));
}
const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealsData(${meal.idMeal})" class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}
const loadMealsData = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showMealData(data.meals[0]));
}
const showMealData = mealData => {
    const youtubeBtn = document.getElementById('youtube-btn');
    document.getElementById('meal-details').style.display = 'block';
    document.getElementById('meal-head').innerText = mealData.strMeal;
    document.getElementById('meal-image').src = mealData.strMealThumb;
    document.getElementById('meal-detail').innerText = mealData.strInstructions.slice(0, 200);
    youtubeBtn.href = mealData.strYoutube;
    youtubeBtn.target = "_blank"
}