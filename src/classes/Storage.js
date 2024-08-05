class Storage {
    static getCalorieLimit(defaultLimit = 2000) {
        let calorieLimit;
        if (localStorage.getItem('calorieLimit') === null) {
            calorieLimit = defaultLimit;
        } else {
            calorieLimit = parseInt(localStorage.getItem('calorieLimit'));
        }
        return calorieLimit;
    }

    static setCalorieLimit(calorieLimit) {
        localStorage.setItem('calorieLimit', calorieLimit);
        Storage.clearStorage();
    }

    static getTotalCalories(defaultCalories = 0) {
        let totalCalories;
        if (localStorage.getItem('totalCalories') === null) {
            totalCalories = defaultCalories;
        } else {
            totalCalories = parseInt(localStorage.getItem('totalCalories'));
        }
        return totalCalories;
    }

    static setTotalCalories(totalCalories) {
        localStorage.setItem('totalCalories', totalCalories);
    }

    static getMeals() {
        let meals;
        if (localStorage.getItem('meals') === null) {
            meals = [];
        } else {
            meals = JSON.parse(localStorage.getItem('meals'));
        }
        return meals;
    }

    static saveMeal(meal) {
        const meals = Storage.getMeals();
        meals.push(meal);
        localStorage.setItem('meals', JSON.stringify(meals));

    }

    static removeMeal(id) {
        const meals = Storage.getMeals();
        const updatedMeals = meals.filter(meal => meal.id !== id);
        localStorage.setItem('meals', JSON.stringify(updatedMeals));
    }

    static getWorkouts() {
        let workouts;
        if (localStorage.getItem('workouts') === null) {
            workouts = [];
        } else {
            workouts = JSON.parse(localStorage.getItem('workouts'));
        }
        return workouts;
    }

    static saveWorkout(workout) {
        const workouts = Storage.getWorkouts();
        workouts.push(workout);
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    static removeWorkout(id) {
        const workouts = Storage.getWorkouts();
        const updatedWorkouts = workouts.filter(workout => workout.id !== id);
        localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
    }

    static clearStorage() {
        localStorage.removeItem('totalCalories');
        localStorage.removeItem('meals');
        localStorage.removeItem('workouts');
    }
}

export default Storage;