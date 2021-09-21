//enter to search system
const searchField = document.getElementById('search-field');
const searchBtn = document.getElementById('button-search');
searchField.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});
// This function will work for search input
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    if (searchText.replace(/\s/g, '') == '') {
        showError('word');
        return;
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        // clear search
        // Load data
        fetch(url)
            .then(res => res.json())
            .then(data => {
                //if no result found this condition will  work
                if (data.meals == null) {
                    showError('result');
                }
                else {
                    displaySearchResult(data.meals);
                }
            });
    }
}
// This function will work to clear  search field and to make the error message more understandable
const removeValueAndError = () => {
    document.getElementById('search-field').value = '';
    const removeError = document.getElementById('remove-error');
    removeError.innerHTML = '';
}

//This function will work to show error
const showError = errorWord => {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    document.getElementById('meal-details').style.display = 'none';
    const error = document.createElement('div');
    error.setAttribute('id', 'remove-error');
    error.classList.add('text-center', 'w-100');
    error.innerHTML = `
         <div style="color:red;"><h2>Sorry! No ${errorWord} found</h2></div>
         `;
    searchResult.appendChild(error);
    return;
}

//This function will work to show search result
const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    document.getElementById('meal-details').style.display = 'none';
    searchResult.innerHTML = '';
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealsData(${meal.idMeal})" class="card border border-warning">
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
//This function will work to show more details of clicked meal
const loadMealsData = mealId => {
    document.documentElement.scrollTop = 0;
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