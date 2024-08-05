import capitalizeFirst from "../utils/utils";

class Meal {
    static count = 0;
    constructor(name, calories) {
        Meal.count++; 
        this.id = Meal.count;
        this.name = capitalizeFirst(name);
        this.calories = calories;
    }
}

export default Meal;