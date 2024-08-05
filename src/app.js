import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse } from 'bootstrap';
import './css/style.css';
import './css/bootstrap.css';
import CalorieTracker from './classes/Tracker';
import Storage from './classes/Storage';
import Meal from './classes/Meal';
import Workout from './classes/Workout';

class App {
    constructor () {
        this.calorieTracker = new CalorieTracker();
        document.querySelector('#meal-form').addEventListener('submit', this._addItem.bind(this, 'meal'));
        document.querySelector('#workout-form').addEventListener('submit', this._addItem.bind(this, 'workout'));
        document.querySelector('#meal-items').addEventListener('click', this._removeItem.bind(this, 'meal'));
        document.querySelector('#workout-items').addEventListener('click', this._removeItem.bind(this, 'workout'));
        document.querySelector('#reset').addEventListener('click', this._reset.bind(this));
        document.querySelector('#filter-meals').addEventListener('input', this._filterItems.bind(this, 'meal'));
        document.querySelector('#limit-form').addEventListener('submit', this._setLimit.bind(this));
        this.calorieTracker.displayItems('meals');
        this.calorieTracker.displayItems('workouts');
    }

    _addItem(type, e) {
        e.preventDefault();
        const name = document.querySelector(`#${type}-name`);
        const calories = document.querySelector(`#${type}-calories`);

        if(name.value === '' || calories.value === '') {
            alert('Please provide valid values');
            return;
        }

        if (type === 'meal') {
            const meal = new Meal(name.value, parseFloat(calories.value));
            this.calorieTracker.addMeal(meal);
        } else {
            const workout = new Workout(name.value, parseFloat(calories.value));
            this.calorieTracker.addWorkout(workout);
        }

        name.value = '';
        calories.value = '';

        const collapseElement = document.querySelector(`#collapse-${type}`);
        const bsCollapse = new Collapse(collapseElement);
    }

    _removeItem(type, e) {
        if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
            const item = e.target.closest('.card');
            const id = parseInt(item.getAttribute('data-id'));
            if(type === 'meal') {
                this.calorieTracker.removeMeal(id);
            }
            else {
                this.calorieTracker.removeWorkout(id);
            }
            item.remove();
        }
    }

    _filterItems(type, e) {
        const filterValue = e.target.value.toLowerCase();
        console.log(filterValue);
        const items = document.querySelectorAll(`#${type}-items .card`);
        items.forEach(item => {
            if(item.textContent.toLowerCase().indexOf(filterValue) !== -1) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    _setLimit(e) {
        e.preventDefault();
        const limit = document.querySelector('#limit');
        if(limit.value === '') {
            alert('Please provide a valid limit');
            return;
        }
        this.calorieTracker = new CalorieTracker(parseFloat(limit.value));
        Storage.setCalorieLimit(parseFloat(limit.value));
        this._reset();
        limit.value = '';

        const modalEl = document.querySelector('#limit-modal');
        const modal = Modal.getInstance(modalEl);
        modal.hide();
    }

    _reset() {
        Storage.clearStorage();
        this.calorieTracker = new CalorieTracker();
        document.querySelector('#meal-items').innerHTML = '';
        document.querySelector('#workout-items').innerHTML = '';
    }
}

const app = new App();