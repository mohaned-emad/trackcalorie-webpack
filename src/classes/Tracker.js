import Storage from './Storage';

class CalorieTracker {
    #calorieLimit = 2000;
    #totalCalories = 0;
    #meals = [];
    #workouts = [];

    constructor(calorieLimit = 2000) {
        this.#calorieLimit = Storage.getCalorieLimit(calorieLimit);
        this.#totalCalories = Storage.getTotalCalories();
        this.#meals = Storage.getMeals();
        this.#workouts = Storage.getWorkouts();
        this.#render();
    }

    get totalCalories() {
        return this.#totalCalories;
    }

    get meals() {
        return this.#meals;
    }

    get workouts() {
        return this.#workouts;
    }

    addMeal(meal) {
        this.#totalCalories += meal.calories;
        Storage.setTotalCalories(this.#totalCalories);
        this.#meals.push(meal);
        Storage.saveMeal(meal);
        this.#displayNewMeal(meal);
        this.#render();
    }

    removeMeal(id) {
        const meal = this.#meals.find(m => m.id === id);
        this.#totalCalories -= meal.calories;
        Storage.setTotalCalories(this.#totalCalories);
        this.#meals = this.#meals.filter(m => m.id !== id);
        Storage.removeMeal(id);
        this.#render();
    }

    addWorkout(workout) {
        this.#totalCalories -= workout.calories;
        Storage.setTotalCalories(this.#totalCalories);
        this.#workouts.push(workout);
        Storage.saveWorkout(workout);
        this.#displayNewWorkout(workout);
        this.#render();
    }

    removeWorkout(id) {
        const workout = this.#workouts.find(w => w.id === id);
        this.#totalCalories += workout.calories;
        Storage.setTotalCalories(this.#totalCalories);
        this.#workouts = this.#workouts.filter(w => w.id !== id);
        Storage.removeWorkout(id);
        this.#render();
    }

    #displayTotalCalories() {
        const totalCaloriesElement = document.querySelector('#calories-total');
        totalCaloriesElement.textContent = this.#totalCalories;
    }

    #displayCaloriesLimit() {
        const caloriesLimitElement = document.querySelector('#calories-limit');
        caloriesLimitElement.textContent = this.#calorieLimit;
    }

    #displayCaloriesBurned() {
        const caloriesBurnedElement = document.querySelector('#calories-burned');
        const caloriesBurned = this.#workouts.reduce((total, workout) => total + workout.calories, 0);
        caloriesBurnedElement.textContent = caloriesBurned;
    }

    #displayCaloriesConsumed() {
        const caloriesConsumedElement = document.querySelector('#calories-consumed');
        const caloriesConsumed = this.#meals.reduce((total, meal) => total + meal.calories, 0);
        caloriesConsumedElement.textContent = caloriesConsumed;
    }

    #displayCaloriesRemaining() {
        const caloriesRemainingElement = document.querySelector('#calories-remaining');
        const remainingCalories = this.#calorieLimit - this.#totalCalories;
        const progressBar = document.querySelector('.progress-bar');
        caloriesRemainingElement.textContent = remainingCalories;

        if (remainingCalories <= 0) {
            caloriesRemainingElement.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemainingElement.parentElement.parentElement.classList.add('bg-danger');
            caloriesRemainingElement.style.color = 'white';
            caloriesRemainingElement.parentElement.childNodes[3].style.color = 'white';
            caloriesRemainingElement.parentElement.childNodes[3].textContent = 'Limit Exceeded!';
            progressBar.classList.remove('bg-success');
            progressBar.classList.add('bg-danger');
        } else {
            caloriesRemainingElement.parentElement.parentElement.classList.remove('bg-danger');
            caloriesRemainingElement.parentElement.parentElement.classList.add('bg-light');
            caloriesRemainingElement.style.color = 'black';
            caloriesRemainingElement.parentElement.childNodes[3].style.color = 'black';
            caloriesRemainingElement.parentElement.childNodes[3].textContent = 'Calories Remaining';
            progressBar.classList.remove('bg-danger');
            progressBar.classList.add('bg-success');
        }
    }

    #displayCaloriesProgress() {
        const progressBar = document.querySelector('.progress-bar');
        const progress = Math.floor((this.#totalCalories / this.#calorieLimit) * 100);
        if(progress < 0) {
            progressBar.style.width = '0%';
        }
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    #displayNewMeal(meal) {
        const container = document.querySelector('#meal-items');
        const div = document.createElement('div');
        div.classList.add('card', 'my-2');
        div.setAttribute('data-id', meal.id);
        div.innerHTML = `
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${meal.name}</h4>
                <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
                    ${meal.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>`;

        container.appendChild(div);
    }

    #displayNewWorkout(workout) {
        const container = document.querySelector('#workout-items');
        const div = document.createElement('div');
        div.classList.add('card', 'my-2');
        div.setAttribute('data-id', workout.id);
        div.innerHTML = `
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${workout.name}</h4>
                <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
                    ${workout.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>`;
        container.appendChild(div);
    }

    displayItems(type) {
        if(type === 'meals') {
            this.#meals.forEach(meal => this.#displayNewMeal(meal));
        } else {
            this.#workouts.forEach(workout => this.#displayNewWorkout(workout));
        }
    }

    #render() {
        this.#displayTotalCalories();
        this.#displayCaloriesLimit();
        this.#displayCaloriesBurned();
        this.#displayCaloriesConsumed();
        this.#displayCaloriesRemaining();
        this.#displayCaloriesProgress();
    }
}

export default CalorieTracker;