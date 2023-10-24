//Initialize Variables
let dateSprite; //Sprite for Date Box
let ageSprite; //Sprite for Age Box
let bloodSugar; //Number for blood sugar
let font; //Variable for custom font
let month = []; //Array for each month 
let day = []; //Max days in each month
let year = 2012; //Year variable
let whatMonth = 4; //initial month pulled from month[]
let whatDay = 25; //intial starting day
let age = 10; //initial age

//preload font and images for sprites
function preload() {

    //load custom font
    font = loadFont("assets/fonts/ARCADECLASSIC.TTF");
}


function setup() {

    //create fullscreen canvas
    let canvas = new Canvas("fullscreen");

    //set all text to custom font
    textFont(font);

    //set array of months
    month = 
    ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    //set array of max days in each month
    day =
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //run chooseDay function every 1/4 second
    let dayInterval = setInterval(chooseDay, 250);
}


function draw() {

    //clear screen of all sprites
    clear();

    //create dateSprite box
    dateSprite = new Sprite();
    dateSprite.width = windowWidth/6;
    dateSprite.height = windowHeight/8;
    dateSprite.x = dateSprite.width/2;
    dateSprite.y = dateSprite.height/2;
    dateSprite.stroke = 50;
    dateSprite.color = "white";
    dateSprite.text = month[whatMonth] + "    " + whatDay + "    " + year;
    dateSprite.textSize = 40;
    dateSprite.collider = "s";

    //create ageSprite box
    ageSprite = new Sprite();
    ageSprite.width = windowWidth/6;
    ageSprite.height = windowHeight/10;
    ageSprite.x = ageSprite.width/2;
    ageSprite.y = dateSprite.height + ageSprite.height/2;
    ageSprite.stroke = 50;
    ageSprite.color = "white";
    ageSprite.text = "Age     " + age;
    ageSprite.textSize = 40;
    ageSprite.collider = "s";

    
}

//increase days/month/year
function chooseDay() {

    //increase day
    whatDay++;

    //if day is higher than max number of days in the month, reset to 1 and increase month
    if (whatDay > day[whatMonth]) {
        whatMonth++;
        whatDay = 1;
        //if past Dec, reset to Jan 1 and increase year
        if (whatMonth == 12) {
            whatMonth = 0;
            whatDay = 1;
            year++;
        }
        }

    //if birthday, increase age
    if (whatDay == 5 && whatMonth == 5) {
        age++;
    }
}



