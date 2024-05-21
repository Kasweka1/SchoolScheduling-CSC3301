/**
 * @Author Francis Kalunga
 */

let durations = [];
let courseTimes = [];

const Days = {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday'
}

class Duration {
    constructor(starts, length) {
        this.starts = starts;
        this.length = length;
    }
    starts;
    length; // length in minutes
}

function createDurations(starts, number) {
    /**
     * To be used by programmer to automate:
     * 
     * const from8 = new Duration(8, 50)
     * const from9 = new Duration(9, 50)
     * ...
     */

    for (let i = 1; i <= number; i++) {
        let dur = new Duration(starts, 50);
        durations.push(dur);
        starts++;
    }
}

class CourseTime {
    constructor(duration, day) {
        this.duration = duration;
        this.day = day;
    }

    duration;
    day;
    occupied = false; // true if taken by course
}

class Course {
    constructor(courseID, courseName) {
        this.courseID = courseID;
        this.courseName = courseName;
    }

    courseID;
    courseName;
    courseTimes = [];

    init() {
        document.getElementById(this.courseID).addEventListener('click', () => {
            // show main view
            // document.getElementById('exp-course-viewer').innerHTML = ... just use setState to change which course is in view
            document.getElementById('exp-course-viewer').className = 'exp-course-viewer block';
        });
    }

    setCourseTime(courseTime) {
        // add courseTime to courseTimes array
        if (courseTime.occupied) { 
            console.error("Course time already taken")
            return 
        }
        this.courseTimes.push(courseTime)
        courseTime.occupied = true
    }

    unsetCourseTime(courseTime) {
        // recreate courseTimes array after filtering out courseTime:
        this.courseTimes = this.courseTimes.filter(item => item !== courseTime);
        courseTime.occupied = false
    }
}

function hideExpCourseViewer() {
    document.getElementById('exp-course-viewer').className = 'exp-course-viewer hidden';
}

function createCourseTime(duration, day) {
    // Check if the CourseTime object already exists in the courseTimes array
    for (let i = 0; i < courseTimes.length; i++) {
        if (courseTimes[i].duration === duration && courseTimes[i].day === day) {
            console.log('CourseTime already exists:', courseTimes[i]);
            return; // If it exists, exit the function
        }
    }

    // If it doesn't exist, create a new CourseTime object and add it to the array
    let newCourseTime = new CourseTime(duration, day);
    courseTimes.push(newCourseTime);
    console.log('New CourseTime created:', newCourseTime);
}

// Schedule durations from 07:00 to 12:50 and from 14:00 to 17:50
createDurations(7, 6)
createDurations(14, 4)

console.log(durations)

createCourseTime(durations[0], Days.Mon)
createCourseTime(durations[1], Days.Mon)
createCourseTime(durations[2], Days.Mon)
createCourseTime(durations[3], Days.Mon)
createCourseTime(durations[4], Days.Mon)
createCourseTime(durations[5], Days.Mon)


let csc3600 = new Course("csc3600", "Software Engineering")
let csc3301 = new Course("csc3301", "Programming languages")

csc3600.setCourseTime(courseTimes[0])
csc3301.setCourseTime(courseTimes[0])