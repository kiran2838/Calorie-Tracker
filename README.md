# Calorie Tracker

A simple web application built using **HTML**, **CSS**, **JavaScript**, and an external **API** to help users track their daily calorie intake. The app allows users to log their meals, view their calorie consumption, and manage their calorie goals.

## Features

- **Add Meals**: Users can add meals with calorie counts.
- **View Calorie Log**: Users can see a log of their meals and the calories consumed.
- **Track Total Calories**: Automatically calculates total daily calorie intake.
- **Set and Track Calorie Goal**: Users can set a daily calorie goal, and the app will track their progress.
- **API Integration**: The app fetches calorie data from an external API (e.g., Nutritionix) for meal items.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **API Integration**: Nutritionix API (or another calorie-related API)
- **Storage**: LocalStorage (for storing meal data on the user's browser)

## Setup & Installation

To run this project locally, follow these steps:

### Prerequisites

1. A web browser (Google Chrome, Firefox, etc.).
2. An API key from the external API you're using (e.g., **Nutritionix API**).

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/calorie-tracker.git
    cd calorie-tracker
    ```

2. Open the `index.html` file in your preferred web browser.

    - Simply double-click `index.html` to open it.
    - Alternatively, you can use an extension like **Live Server** in VS Code to view the project.

3. **API Key Setup**:
    - If you're using an external API like **Nutritionix**, you'll need to get an API key.
    - Once you have the API key, open the `script.js` file and replace `YOUR_API_KEY` with your actual API key.
    
    Example for Nutritionix API:

    ```javascript
    const API_KEY = 'YOUR_API_KEY';
    const API_URL = 'https://api.nutritionix.com/v1_1/search/';
    ```

4. The app will run directly in your browser, and you can start adding meals, fetch calorie data, and track your progress.

## Usage

1. **Add Meals**: Enter the meal name (e.g., "Apple") and its calorie value (either manually or fetched from the API).
2. **API Search**: The app will fetch calorie information for food items from the external API (like Nutritionix) when you enter a food name.
3. **View Calorie Log**: See a list of meals and their calorie values.
4. **Track Progress**: The total daily calories will automatically update as you add meals.
5. **Set Calorie Goal**: You can set a daily calorie goal, and the app will compare it with your total calorie intake.

## Example API Integration

The app uses the **Nutritionix API** (or another calorie-related API) to fetch calorie information for food items. Here’s how it works:

- **GET /api/meal-calories**: Fetch calorie information for a specific food item.

Example request:

```javascript
fetch(`https://api.nutritionix.com/v1_1/search/${foodItem}?results=0:20&fields=food_name,nf_calories&appId=YOUR_APP_ID&appKey=YOUR_API_KEY`)
  .then(response => response.json())
  .then(data => {
    // Handle the data (e.g., display calorie information)
  });
