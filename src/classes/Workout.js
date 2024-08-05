import capitalizeFirst from "../utils/utils";

class Workout {
    static count = 0;
    constructor(name, calories) {
        Workout.count++;
        this.id = Workout.count;
        this.name = capitalizeFirst(name);
        this.calories = calories;
    }
}

export default Workout;