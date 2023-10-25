//Initialize Variables

//Top menu UI
let dateSprite; //Sprite for Date Box
let ageSprite; //Sprite for Age Box
let bloodSugarSprite; //Sprite for Blood Sugar Box
let newsSprite; //Sprite for News Box
let fundsSprite; //Sprite for Funds Box
let currentPriceSprite; //Sprite for Current Price Box

//Changing Variables
let bloodSugar = 135; //Number for blood sugar
let news; //Current news array
let funds = 1000; //Current funds player has
let insulinPriceArray = [];; //Current price of insulin array;
let insulinPrice = 271; //value of current price of insulin for year

//other
let font; //Variable for custom font
let month = []; //Array for each month 
let day = []; //Max days in each month
let year = 2012; //Year variable
let whatMonth = 4; //initial month pulled from month[]
let whatDay = 25; //intial starting day
let age = 10; //initial age
let randomArticle = 0;
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

    //price of insulin from 2013-2021
    insulinPriceArray = [271, 332, 404, 471, 504, 527, 540, 541, 518, 499];


    //news titles
    news = [
    "Medical Costs for Youth with Diabetes More Than $9,000 a Year, CDC study finds annual cost of care is six times higher than for young people without diabetes",
    "Insulin's High Cost Leads To Lethal Rationing",
    "People with diabetes account for $1 of every $4 spent on health care in the U.S.",

     ]

    
    //run chooseDay function every 1/4 second
    let dayInterval = setInterval(chooseDay, 250);
}


function draw() {

    //clear screen of all sprites
    clear();

    //create dateSprite box
    dateSprite = new Sprite();
    dateSprite.width = windowWidth/4;
    dateSprite.height = windowHeight/12;
    dateSprite.x = dateSprite.width/2;
    dateSprite.y = dateSprite.height/2;
    dateSprite.strokeWeight = 5;
    dateSprite.color = "white";
    dateSprite.text = month[whatMonth] + "    " + whatDay + "    " + year;
    dateSprite.textSize = 40;
    dateSprite.collider = "s";

    //create ageSprite box
    ageSprite = new Sprite();
    ageSprite.width = windowWidth/4;
    ageSprite.height = windowHeight/16;
    ageSprite.x = ageSprite.width/2;
    ageSprite.y = dateSprite.height + ageSprite.height/2;
    ageSprite.strokeWeight = 5;
    ageSprite.color = "white";
    ageSprite.text = "Age     " + age;
    ageSprite.textSize = 40;
    ageSprite.collider = "s";

    //create bloodSugarSprite box
    bloodSugarSprite = new Sprite();
    bloodSugarSprite.width = windowWidth/4;
    bloodSugarSprite.height = windowHeight/12;
    bloodSugarSprite.x = bloodSugarSprite.width/2 + dateSprite.width;
    bloodSugarSprite.y = bloodSugarSprite.height/2;
    bloodSugarSprite.strokeWeight = 5;
    bloodSugarSprite.color = "white";
    bloodSugarSprite.text = bloodSugar + "      mg/dL";
    bloodSugarSprite.textSize = 40;
    bloodSugarSprite.collider = "s";


    //FIX TEXT
    //create newsSprite box
    newsSprite = new Sprite();
    newsSprite.width = windowWidth/4;
    newsSprite.height = windowHeight/12;
    newsSprite.x = newsSprite.width + bloodSugarSprite.x;
    newsSprite.y = newsSprite.height/2;
    newsSprite.strokeWeight = 5;
    newsSprite.color = "white";
    //text(news[randomArticle], newsSprite.x + newsSprite.width, newsSprite.y, newsSprite.width);
    newsSprite.layer = 1;
    newsSprite.collider = "s";

    //create fundsSprite box
    fundsSprite = new Sprite();
    fundsSprite.width = windowWidth/4;
    fundsSprite.height = windowHeight/12;
    fundsSprite.x = fundsSprite.width + newsSprite.x;
    fundsSprite.y = fundsSprite.height/2;
    fundsSprite.strokeWeight = 5;
    fundsSprite.color = "white";
    fundsSprite.text = "$      "+ funds;
    fundsSprite.textSize = 40;
    fundsSprite.collider = "s";

    //create currentPriceSprite box
    currentPriceSprite = new Sprite();
    currentPriceSprite.width = windowWidth/4;
    currentPriceSprite.height = windowHeight/16;
    currentPriceSprite.x = windowWidth - currentPriceSprite.width/2;
    currentPriceSprite.y = fundsSprite.height + currentPriceSprite.height/2;
    currentPriceSprite.strokeWeight = 5;
    currentPriceSprite.color = "white";
    currentPriceSprite.text = "Current Insulin Price:      " + insulinPrice;
    currentPriceSprite.textSize = 40;
    currentPriceSprite.collider = "s";



}

//increase days/month/year
function chooseDay() {

    //increase day
    whatDay++;

    //if day is higher than max number of days in the month, reset to 1 and increase month
    if (whatDay > day[whatMonth]) {
        whatMonth++;
        insulinPrice = changeInsulinPrice();
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


function changeInsulinPrice() {

    let predictedPrice;

    if (insulinPriceArray[year-2012] != NaN) {
        return insulinPriceArray[year-2012];
    }
    else {
       predictedPrice = 121.31 * log(year) + 277.47
       return predictedPrice;
    }


}
