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
let funds = 100; //Current funds player has
let insulinPriceArray = [];; //Current price of insulin array;
let insulinPrice = 271; //value of current price of insulin for year
let importantPromptArray;
let normalPromptArray;

//other Sprites
let dontNeedInsulinSprite;
let insulinArea;
let backgroundSprite;
let insulinGameBackground;
let needleSprite;
let insulinBottleSprite;

//other
let font; //Variable for custom font
let month = []; //Array for each month 
let day = []; //Max days in each month
let year = 2012; //Year variable
let whatMonth = 4; //initial month pulled from month[]
let whatDay = 25; //intial starting day
let age = 10; //initial age
let randomArticle = 0; //set first article
let newsStart = 0; //beginning value for news substring
let newsLength = 15; //length of news substring
let currentNewsString; //substring of current news
let randomArticleBuffer; //value to hold next article
let dayInterval;
let newsInterval;
let bloodSugarInterval;
let debtShown = false;
let insulinPopUp = false;
let needleFilled = 0;
let insulinGamePlaying = false;

//preload font and images for sprites
function preload() {

    //load custom font
    font = loadFont("assets/fonts/Broken Console Regular.TTF");
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
    "Medical Costs for Youth with Diabetes More Than $9,000 a Year, CDC study finds annual cost of care is six times higher than for young people without diabetes  ",
    "Insulin's High Cost Leads To Lethal Rationing",
    "People with diabetes account for $1 of every $4 spent on health care in the U.S.",

    ]


    

    //create dateSprite box
    dateSprite = new Sprite();
    dateSprite.width = windowWidth/4;
    dateSprite.height = windowHeight/12;
    dateSprite.x = dateSprite.width/2;
    dateSprite.y = dateSprite.height/2;
    dateSprite.strokeWeight = 5;
    dateSprite.color = "white";
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
    bloodSugarSprite.textSize = 40;
    bloodSugarSprite.collider = "s";
 
 
    //create newsSprite box
    newsSprite = new Sprite();
    newsSprite.width = windowWidth/4;
    newsSprite.height = windowHeight/12;
    newsSprite.x = newsSprite.width + bloodSugarSprite.x;
    newsSprite.y = newsSprite.height/2;
    newsSprite.strokeWeight = 5;
    newsSprite.color = "white";
    newsSprite.collider = "s";
    newsSprite.textSize = 40;
 
    //create fundsSprite box
    fundsSprite = new Sprite();
    fundsSprite.width = windowWidth/4;
    fundsSprite.height = windowHeight/12;
    fundsSprite.x = fundsSprite.width + newsSprite.x;
    fundsSprite.y = fundsSprite.height/2;
    fundsSprite.strokeWeight = 5;
    fundsSprite.color = "white";
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
    currentPriceSprite.textSize = 20;
    currentPriceSprite.collider = "s";

    //create transparent overlay for start game
    startGameSprite = new Sprite();
    startGameSprite.width = windowWidth;
    startGameSprite.height = windowHeight;
    startGameSprite.color = color(125, 125, 125, 200);
    startGameSprite.collider = "s";
    startGameSprite.text = "Start";
    startGameSprite.textSize = 40;
}


function draw() {

    //clear screen of all sprites
    clear();

    //when startGame is pressed, run startGame function
    if (startGameSprite.mouse.presses()) {
        startGame();
    }

    //change date text
    dateSprite.text = month[whatMonth] + "   " + whatDay + "   " + year;

    //change age text
    ageSprite.text = "Age:  " + age;

    //change bloodSugar text
    bloodSugarSprite.text = bloodSugar + "   mg/dL";

    //change fund text
    fundsSprite.text = "$   "+ funds;

    //change currentPrice text
    currentPriceSprite.text = "Current Insulin Price:  $" + insulinPrice;

    if (dontNeedInsulinSprite.mouse.presses()) {
        insulinPopUp = false;
        dontNeedInsulinSprite.remove();
    }

    if (insulinArea.mouse.presses()) {
        insulinClicked();
    }

    if (insulinGamePlaying == true) {
        needleSprite.x = mouse.x;
        needleSprite.y = mouse.y;
        needleSprite.rotateTowards(mouse, 0.1, 0);

        if (needleSprite.overLaps(insulinBottleSprite)) {
            
        }
    }
}

//increase days/month/year
function chooseDay() {

    //increase day
    whatDay++;

    //if day is higher than max number of days in the month, reset to 1 and increase month
    if (whatDay > day[whatMonth]) {
        
        //increase month
        whatMonth++;

        //select a new article to read once current one ends
        randomArticleBuffer = floor(random(news.length));

        //pay insulin price
        payInsulin();

        //change insulin price
        insulinPrice = changeInsulinPrice();

        //reset to first day of month
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

//change insulin price according to https://healthcostinstitute.org/hcci-originals-dropdown/all-hcci-reports/https-healthcostinstitute-org-hcci-research-insulin-prices-in-esi-nearly-doubled-from-2012-2021-with-effects-of-emerging-biosimilars-evident-in-recent-years
function changeInsulinPrice() {

    let predictedPrice;

    //grab predicted price from array
    if (insulinPriceArray[year-2012] != NaN) {
        return insulinPriceArray[year-2012];
    }
    //use function to predict price
    else {
       predictedPrice = 121.31 * log(year) + 277.47
       return predictedPrice;
    }


}

//change news article and move text across screen
function changeNews() {

    //set currentNewsString as a substring as a news article
    currentNewsString = news[randomArticle].substring(newsStart, newsLength);

    //if there is substring, move text over by one letter
     if (currentNewsString.length =! 0) {
         newsStart++;
         newsLength++;
    //if text is empty, reset currentNewsString and grab new article
     if (currentNewsString.length == 0){
         newsStart = 0;
         newsLength = 15;
         randomArticle = randomArticleBuffer;
     }
     newsSprite.text = currentNewsString;
    
}
}

//increase bloodSugar by random amount
function bloodSugarIncrease() {

    let randomIncrease = floor(random(20));

    bloodSugar += randomIncrease;

}

//decrease bloodSugar by random amount
function bloodSugarDecrease() {

    let randomDecrease = floor(random(30));

    bloodSugar -= randomDecrease;

}

//pay insulinPrice every month with money from funds
function payInsulin() {

    funds -= insulinPrice;

}

//starts the game
function startGame() {

    startGameSprite.remove();

    startIntervals();

}


function startIntervals() {

    //run chooseDay function every second
    dayInterval = setInterval(chooseDay, 1000);
    //run changeNews function every 1/4 second
    newsInterval = setInterval(changeNews, 250);

    //run bloodSugarIncrease function every 1/2 second
    bloodSugarInterval = setInterval(bloodSugarIncrease, 500);

}

function stopIntervals() {

    clearInterval(dayInterval);
    clearInterval(newsInterval);
    clearInterval(bloodSugarInterval);

}

function insulinClicked() {

    if (insulinPopUp == false) {
        if(bloodSugar <= 170) {
            dontNeedInsulinSprite = new Sprite();
            dontNeedInsulinSprite.width = windowWidth/3;
            dontNeedInsulinSprite.height = windowHeight/4;
            dontNeedInsulinSprite.x = windowWidth/2;
            dontNeedInsulinSprite.y = windowHeight/3;
            dontNeedInsulinSprite.color = color(125, 125, 125, 200);
            dontNeedInsulinSprite.collider = "s";
            dontNeedInsulinSprite.strokeWeight = 4;
            dontNeedInsulinSprite.stroke = "white";
            dontNeedInsulinSprite.text = "I don't think I need that right now";
            dontNeedInsulinSprite.textSize = 40;
            insulinPopUp = true;
        }
    }

    if (insulinPopUp == true && bloodSugar > 170) {
        dontNeedInsulinSprite.remove();
        insulinGame();
    }
}

function insulinGame() {


    insulinGameBackground = new Sprite();
    insulinGameBackground.height = windowHeight;
    insulinGameBackground.width = windowWidth;
    insulinGameBackground.color = color(125, 125, 125, 200);
    insulinGameBackground.collider = "s";
    insulinGameBackground.textSize = 40;

    needleSprite = new Sprite();
    needleSprite.img = "assets/img/NeedleBase.png";
    needleSprite.addAni("pull", "assets/anim/needlePullAni.png", 38);
    needleSprite.pull.rewind();
    needleSprite.pull.noLoop();

    insulinBottleSprite = new Sprite();
    //insulinBottleSprite = null;


    insulinGamePlaying = true;
    

}