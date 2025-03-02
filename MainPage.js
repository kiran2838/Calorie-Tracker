const apiKey = '84twkbpNtvyJURDvyx8dVdlhPJCgCJrNgQJP8ECo'; // Replace with your actual USDA API key

document.getElementById('food-form').addEventListener('submit', logFood);

let totalCalories = 0;
let DCI = 0;
let userGoal = '';

// Retrieve DCI from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        DCI = parseFloat(userData.DCI);
        userGoal = userData.goal;
        document.getElementById('dci-value').textContent = DCI;
        fetchMealSuggestions(userData.goal);
    }
});

async function logFood(event) {
    event.preventDefault();

    const foodName = document.getElementById('food-name').value;
    const foodAmount = document.getElementById('food-amount').value;

    const calories = await fetchCalories(foodName, foodAmount);

    if (calories !== null) {
        addFoodToList(foodName, foodAmount, calories);
        totalCalories += calories;
        updateTotalCalories();
        checkCelebration();

        // Clear the form fields after logging the food
        document.getElementById('food-name').value = '';
        document.getElementById('food-amount').value = '';
    }
}

async function fetchCalories(foodName, foodAmount) {
    const API_URL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${encodeURIComponent(foodName)}`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.foods.length > 0) {
            const foodItem = data.foods[0];
            const caloriesPerGram = foodItem.foodNutrients.find(nutrient => nutrient.nutrientName === 'Energy').value / 100;
            return caloriesPerGram * foodAmount;
        } else {
            alert('Food item not found!');
            return null;
        }
    } catch (error) {
        alert('Error fetching calorie information.');
        return null;
    }
}

function addFoodToList(foodName, foodAmount, calories) {
    const foodList = document.getElementById('food-list');
    const li = document.createElement('li');
    li.innerHTML = `${foodName} (${foodAmount}g): ${calories.toFixed(2)} kcal <i class="fas fa-trash delete-icon" onclick="deleteFood(this, ${calories.toFixed(2)})"></i>`;
    foodList.appendChild(li);
}

function updateTotalCalories() {
    document.getElementById('total-calories').textContent = totalCalories.toFixed(2);
}

function checkCelebration() {
    if (totalCalories >= DCI) {
        if (userGoal === 'loss') {
            showDangerDialog();
        } else {
            triggerCelebration();
        }
    }
}

function triggerCelebration() {
    const celebrationSound = document.getElementById('celebration-sound');
    celebrationSound.play();

    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function showDangerDialog() {
    const dangerDialog = document.createElement('div');
    dangerDialog.className = 'danger-dialog';
    dangerDialog.innerHTML = `
        <h2>Warning!</h2>
        <p>You are exceeding your daily calorie intake.</p>
        <button onclick="closeDangerDialog()">OK</button>
    `;
    document.body.appendChild(dangerDialog);
    dangerDialog.style.display = 'block';
}

function closeDangerDialog() {
    const dangerDialog = document.querySelector('.danger-dialog');
    dangerDialog.style.display = 'none';
    document.body.removeChild(dangerDialog);
}

// Function to fetch meal suggestions based on user's goal
async function fetchMealSuggestions(goal) {
    const EDAMAM_API_ID = 'c863b2b3'; // Replace with your Edamam API ID
    const EDAMAM_API_KEY = '551e9981ea62c4f075437d6fd4a3c757'; // Replace with your Edamam API key
    let query = '';

    if (goal === 'gain') {
        query = 'high-calorie';
    } else if (goal === 'loss') {
        query = 'low-calorie high-protein';
    }

    const API_URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${EDAMAM_API_ID}&app_key=${EDAMAM_API_KEY}`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        displayMealSuggestions(data.hits);
    } catch (error) {
        alert('Error fetching meal suggestions.');
    }
}

function displayMealSuggestions(meals) {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';

    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'suggestion';
        mealDiv.innerHTML = `
            <h3>${meal.recipe.label}</h3>
            <img src="${meal.recipe.image}" alt="${meal.recipe.label}" style="width:100%; border-radius: 8px;">
            <p>Calories: ${meal.recipe.calories.toFixed(2)}</p>
            <p>Protein: ${meal.recipe.totalNutrients.PROCNT.quantity.toFixed(2)}g</p>
        `;
        suggestionsDiv.appendChild(mealDiv);
    });
}

function deleteFood(element, calories) {
    const li = element.parentElement;
    li.remove();
    totalCalories -= calories;
    updateTotalCalories();
}
