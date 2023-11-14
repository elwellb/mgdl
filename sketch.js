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
let windowSprite;
let insulinGameBackground;
let needleSprite;
let insulinBottleSprite;
let currentAniFrame = 0;

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
let windowAnimation;
let needleAnimation;

//preload font and images for sprites
function preload() {

    //load custom font
    font = loadFont("assets/fonts/Broken Console Regular.TTF");

    windowAnimation = loadAnimation("assets/anim/windowAni.png", {frameSize: [206, 100], frames: 197});
    
    needleAnimation = loadAnimation("assets/anim/needlePullAni.png", {frameSize: [14, 100], frames: 38});
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

    //create windowSprite and animation
    windowSprite = new Sprite();
    windowSprite.ani = windowAnimation;
    windowAnimation.stop();
    windowAnimation.frame = 196;
    windowAnimation.frameDelay = 0.5;
    windowSprite.width = 206;
    windowSprite.height = 100;
    windowSprite.collider = "s";
    windowSprite.scale = 4;
    windowSprite.y = windowHeight/2 - windowHeight/3;
    

    //create main background sprite
    backgroundSprite = new Sprite();
    backgroundSprite.width = windowWidth;
    backgroundSprite.height = windowHeight;
    backgroundSprite.x = windowWidth/2;
    backgroundSprite.y = windowHeight/2;
    backgroundSprite.img = "assets/img/BackgroundSprite1.png";
    backgroundSprite.collider = "s";
    backgroundSprite.scale = 4;

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

    insulinArea = new Sprite();
    insulinArea.x = -100;
    insulinArea.y = -100;
}


function draw() {

    //clear screen of all sprites
    clear();

    //when startGame is pressed, run startGame function
    if (startGameSprite.mouse.presses()) {
        startGame();
    }

    if (windowAnimation.frame == 0) {
        windowAnimation.play(196);
        windowAnimation.rewind();
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


    if (insulinPopUp == true) {
    if (dontNeedInsulinSprite.mouse.presses()) {
        insulinPopUp = false;
        dontNeedInsulinSprite.remove();
    }
    }

    // if the insulin area is clicked, run insulinClicked function
   if (insulinArea.mouse.presses()) {
        insulinClicked();
   } 

    //Insulin Game function
    //make needle follow mouse
    if (insulinGamePlaying == true) {
        needleSprite.moveTowards(mouse, 0.1);
        needleSprite.rotateTowards(mouse, 0.1, 90);

        //
       // if (needleSprite.overlaps(insulinBottleSprite)) {
            if (mouse.pressing()) {
                needleAnimation.rewind();
                console.log("Left Mouse");
            } else if (mouse.pressing("right")) {
                needleAnimation.play();
                console.log("Right Mouse");
            } else {
                needleAnimation.stop();
            }

            
            }
        }
  // }



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

    insulinArea = new Sprite();
    insulinArea.x = windowWidth/2 + 650;
    insulinArea.y = windowHeight/2 + 100;
    insulinArea.scale = 3;
    insulinArea.color = color(0,0);
    insulinArea.strokeWeight = 0;
    insulinArea.collider = "s";


    windowAnimation.play(196);
    windowAnimation.rewind();

    startIntervals();

}


function startIntervals() {

    //run chooseDay function every 3.3 second
    dayInterval = setInterval(chooseDay, 3300);
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

    if (insulinPopUp == false && bloodSugar > 170) {
        insulinGame();
    }
}

function insulinGame() {


    insulinGameBackground = new Sprite();
    insulinGameBackground.height = windowHeight;
    insulinGameBackground.width = windowWidth;
    insulinGameBackground.color = color(255, 255, 255, 230);
    insulinGameBackground.collider = "s";
    insulinGameBackground.textSize = 40;
    insulinGameBackground.layer = 9;

    needleSprite = new Sprite();
    needleSprite.ani = needleAnimation;
    needleSprite.width = 12;
    needleSprite.height = 98;
    needleAnimation.frame = 37;
    needleAnimation.stop();
    needleAnimation.noLoop();
    needleSprite.layer = 10;
    needleSprite.debug = true;
    needleSprite.collider = "k";
    needleSprite.scale = 5;
    needleAnimation.frameDelay = 8;
    needleSprite.offset.y = 150;

    // insulinBottleSprite = new Sprite();
    // insulinBottleSprite.img = "assets/img/Insulin.png";
    // insulinBottleSprite.mirror.y = true;
    // insulinBottleSprite.x = windowWidth/2;
    // insulinBottleSprite.y = windowHeight/5;


    insulinGamePlaying = true;
    
}