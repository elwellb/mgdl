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


//other Sprites
let dontNeedInsulinSprite; //sprite for popup
let insulinArea; //invisible sprite for clickable area
let backgroundSprite; //sprite for countertop
let windowSprite; //sprite for window
let insulinGameBackground; //sprite for insulin game
let needleSprite; //sprite for needle
let insulinBottleSprite; //sprite for insulin bottle
let stomachSprite; //sprite for stomach
let stomachBarrier; //sprite for stomach barrier
let restartSprite; //sprite for restart button
let popUp; //group for all pop ups
let emptyBottle; //group for empty bottles
let ruleSprite1; //sprite for insulin game rule
let ruleSprite2; //sprite for insulin game rule
let exitGame; //sprite for close button
let startGameText1; //text for beginning of game
let startGameText2; //text for beginning of game
let startGameText3; //text for beginning of game
let startGameText4; //text for beginning of game
let startGameText5; //text for beginning of game

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
let dayInterval; //interval for day function
let newsInterval; //interval for news function
let bloodSugarInterval; //interval for bloodsugar function
let insulinPopUp = false; //is the pop up on screen
let needleFilled = 0; //how much of the needle is filled
let insulinGamePlaying = false; //is the insulin game currently active
let windowAnimation; //holds window animation
let needleAnimation; //holds needle animation
let bottleNumber = 0; //number of bottles player has bought
let insulinInBottle = 500; //percentage of insulin in bottle
let randomChoice; 
let highCounter = 0; //counts how often you are high in a row
let lowCounter = 0; //counts how often you are low in a row
let daysPast = 0; //days since diagnosed
let checkBGInterval; //interval to check blood sugar to give sound
let gameGroup; //group for everything to do with the insulin game
let needleFrame = 37; //initial needle frame
let insulinPlayed = false; //has the first iteration of the game happened
let dead = false; //is player dead

//sound variables (self explanitory)
let lowAlarm;
let highAlarm;
let urgentLow;
let urgentLowSoon;



//preload font and images for sprites
function preload() {

    //load custom font
    font = loadFont("assets/fonts/BrokenConsoleRegular.ttf");

    //load window animation
    windowAnimation = loadAnimation("assets/anim/windowAni.png", {frameSize: [206, 100], frames: 197});
    
    //load needle animation
    needleAnimation = loadAnimation("assets/anim/needlePullAni.png", {frameSize: [14, 100], frames: 38});

    //load all sounds
    lowAlarm = loadSound("assets/sounds/LowAlarm_1.wav");
    highAlarm = loadSound("assets/sounds/HighAlarm.wav");
    urgentLow = loadSound("assets/sounds/UrgentLowAlarm.wav");
    urgentLowSoon = loadSound("assets/sounds/UrgentLowSoon.wav");
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

    //create Group for popups
    popUp = new Group();
    popUp.width = windowWidth/2;
    popUp.height = windowHeight/4;
    popUp.x = windowWidth/2;
    popUp.y = windowHeight/3;
    popUp.color = color(125, 125, 125, 200);
    popUp.collider = "s";
    popUp.strokeWeight = 4;
    popUp.stroke = "white";
    popUp.textSize = 40;

    //create group for emptyBottles
    emptyBottle = new Group();
    emptyBottle.img = "assets/img/Insulin.png";
    emptyBottle.collider = "n";
    emptyBottle.scale = 0.7;
    emptyBottle.rotation = () => random(360);
    emptyBottle.layer = 8;

    //create empty group for all Insulin game things
    gameGroup = new Group();

    //create windowSprite and animation
    windowSprite = new Sprite();
    windowSprite.ani = windowAnimation;
    windowAnimation.stop();
    windowAnimation.frame = 196;
    windowAnimation.frameDelay = 0.5;
    windowSprite.width = 206;
    windowSprite.height = 100;
    windowSprite.collider = "n";
    windowSprite.scale = 4;
    windowSprite.y = windowHeight/2 - windowHeight/3;
    

    //create main background sprite
    backgroundSprite = new Sprite();
    backgroundSprite.width = windowWidth;
    backgroundSprite.height = windowHeight;
    backgroundSprite.x = windowWidth/2;
    backgroundSprite.y = windowHeight/2;
    backgroundSprite.img = "assets/img/BackgroundSprite1.png";
    backgroundSprite.collider = "n";
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
    dateSprite.collider = "k";
 
     
    //create ageSprite box
    ageSprite = new Sprite();
    ageSprite.width = windowWidth/4;
    ageSprite.height = windowHeight/16;
    ageSprite.x = ageSprite.width/2;
    ageSprite.y = dateSprite.height + ageSprite.height/2;
    ageSprite.strokeWeight = 5;
    ageSprite.color = "white";
    ageSprite.textSize = 40;
    ageSprite.collider = "k";
 
    //create bloodSugarSprite box
    bloodSugarSprite = new Sprite();
    bloodSugarSprite.width = windowWidth/4;
    bloodSugarSprite.height = windowHeight/12;
    bloodSugarSprite.x = bloodSugarSprite.width/2 + dateSprite.width;
    bloodSugarSprite.y = bloodSugarSprite.height/2;
    bloodSugarSprite.strokeWeight = 5;
    bloodSugarSprite.color = "white";
    bloodSugarSprite.textSize = 40;
    bloodSugarSprite.collider = "k";
 
 
    //create newsSprite box
    newsSprite = new Sprite();
    newsSprite.width = windowWidth/4;
    newsSprite.height = windowHeight/12;
    newsSprite.x = newsSprite.width + bloodSugarSprite.x;
    newsSprite.y = newsSprite.height/2;
    newsSprite.strokeWeight = 5;
    newsSprite.color = "yellow";
    newsSprite.collider = "k";
    newsSprite.textSize = 40;
    newsSprite.scale.y = 0.7;
    newsSprite.layer = 5;

    let blankSprite = new Sprite();
    blankSprite.width = newsSprite.width;
    blankSprite.height = newsSprite.height;
    blankSprite.x = newsSprite.x;
    blankSprite.y = newsSprite.y;
    blankSprite.stroke = "black";
    blankSprite.strokeWeight = 5;
    blankSprite.color = "white";
    blankSprite.collider = "n";
    blankSprite.layer = 4

 
    //create fundsSprite box
    fundsSprite = new Sprite();
    fundsSprite.width = windowWidth/4;
    fundsSprite.height = windowHeight/12;
    fundsSprite.x = fundsSprite.width + newsSprite.x;
    fundsSprite.y = fundsSprite.height/2;
    fundsSprite.strokeWeight = 5;
    fundsSprite.color = "white";
    fundsSprite.textSize = 40;
    fundsSprite.collider = "k";
 
    //create currentPriceSprite box
    currentPriceSprite = new Sprite();
    currentPriceSprite.width = windowWidth/4;
    currentPriceSprite.height = windowHeight/16;
    currentPriceSprite.x = windowWidth - currentPriceSprite.width/2;
    currentPriceSprite.y = fundsSprite.height + currentPriceSprite.height/2;
    currentPriceSprite.strokeWeight = 5;
    currentPriceSprite.color = "white";
    currentPriceSprite.textSize = 20;
    currentPriceSprite.collider = "k";

    //create transparent overlay for start game
    startGameSprite = new Sprite();
    startGameSprite.width = windowWidth;
    startGameSprite.height = windowHeight;
    startGameSprite.color = color(125, 125, 125, 200);
    startGameSprite.collider = "k";
    startGameSprite.textSize = 40;

    //create text for beginning of game
    startGameText1 = new Sprite();
    startGameText1.width = 1;
    startGameText1.height = 1;
    startGameText1.y = windowHeight/5;
    startGameText1.color = color(125, 125, 125, 200);
    startGameText1.collider = "k";
    startGameText1.strokeWeight = 0;
    startGameText1.text = "Just 11 Days before your 11th birthday, you were diagnosed with type 1 diabetes";
    startGameText1.textSize = 30;

    startGameText2 = new Sprite();
    startGameText2.width = 1;
    startGameText2.height = 1;
    startGameText2.y = 2 * windowHeight/5;
    startGameText2.color = color(125, 125, 125, 200);
    startGameText2.collider = "k";
    startGameText2.strokeWeight = 0;
    startGameText2.text = "An incurable disease where your body does not produce insulin";
    startGameText2.textSize = 30;

    startGameText3 = new Sprite();
    startGameText3.width = 1;
    startGameText3.height = 1;
    startGameText3.y = 3 * windowHeight/5;
    startGameText3.color = color(125, 125, 125, 200);
    startGameText3.collider = "k";
    startGameText3.strokeWeight = 0;
    startGameText3.text = "Now, as a 10 year old, you must survive as long as you can against yourself";
    startGameText3.textSize = 30;

    startGameText4 = new Sprite();
    startGameText4.width = 1;
    startGameText4.height = 1;
    startGameText4.y = 4 * windowHeight/5;
    startGameText4.color = color(125, 125, 125, 200);
    startGameText4.collider = "k";
    startGameText4.strokeWeight = 0;
    startGameText4.text = "Your parents will be giving you 1000$ a month for insulin, be sure not to waste it.";
    startGameText4.textSize = 30;

    startGameText5 = new Sprite();
    startGameText5.width = 1;
    startGameText5.height = 1;
    startGameText5.y = 4.5 * windowHeight/5;
    startGameText5.color = color(125, 125, 125, 200);
    startGameText5.collider = "k";
    startGameText5.strokeWeight = 0;
    startGameText5.text = "Click anywhere to begin";
    startGameText5.textSize = 30;

    //create fake area for insulin area to move it
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

    //if player is dead and hits restart, reload page
    if (dead) {
        if (restartSprite.mouse.presses()) {
            location.reload();
        }}

    //play window animation backwards
    if (windowAnimation.frame == 0) {
        windowAnimation.play(196);
        windowAnimation.rewind();
    }

    //change date text
    dateSprite.text = month[whatMonth] + "   " + whatDay + "   " + year;

    //change age text
    ageSprite.text = "Age:  " + age;

    //change bloodSugar text and color
    bloodSugarSprite.text = bloodSugar + "   mg/dL";
    if (bloodSugar >= 350) {
        bloodSugarSprite.color = "red";
    } else if (bloodSugar >= 170 && bloodSugar <= 350) {
        bloodSugarSprite.color = "yellow";
    } else if (bloodSugar <= 60 && bloodSugar >= 40) {
        bloodSugarSprite.color = "yellow";
    } else if (bloodSugar <= 80 && bloodSugar >= 60) {
        bloodSugarSprite.color = "blue";
    } else if (bloodSugar <= 40) {
        bloodSugarSprite.color = "red";
    } else {
        bloodSugarSprite.color = "lightgreen";
    }

    //change fund text
    fundsSprite.text = "$   "+ funds;

    //change currentPrice text
    currentPriceSprite.text = "Current Insulin Price:  $" + insulinPrice;

    //when Insulin popup is up, click to remove and set to false
    if (insulinPopUp == true) {
    if (dontNeedInsulinSprite.mouse.presses()) {
        insulinPopUp = false;
        dontNeedInsulinSprite.remove();
    }
    }

    //when any popup is clicked it is removed
    if (popUp.mouse.presses()) {
        popUp.removeAll();
    }

    // if the insulin area is clicked, run insulinClicked function
   if (insulinArea.mouse.presses()) {
        insulinClicked();
   } 

    //Insulin Game function
    //make needle follow mouse
    if (insulinGamePlaying == true) {
        needleSprite.moveTowards(mouse.x, mouse.y);
        needleSprite.rotateTowards(mouse, 0.1, 90);

        //add changing text to bottle
        insulinBarrier.text = round(insulinInBottle/5) + "%";

        //if needle is in bottle...
       if (insulinBottleSprite.overlapping(needleSprite)) {

            //Left click: pull from bottle
            if (mouse.pressing() && insulinInBottle > 0) {
                needleAnimation.rewind();
                if (needleAnimation.frame != 0) {
                needleFilled++;
                insulinInBottle--;
                }
            }

            //Right Click: Push back into bottle
            else if (mouse.pressing("right") && needleAnimation.frame != 37 && insulinInBottle < 500) {
                needleAnimation.play();
                needleFilled--;
                insulinInBottle++;
            } 

            //Otherwise stop animation
            else {
            needleAnimation.stop();
            }
        }

        //if needle is in stomach and pushing, decrease blood sugar
        else if ((stomachSprite.overlapping(needleSprite) % 10 == 1) && mouse.pressing("right") && (needleAnimation.frame != 37)) {
            needleAnimation.play();
            bloodSugarDecrease();
            needleFilled--;
        }

        //if needle is in air, send insulin to the shadow realm
        else if (mouse.pressing("right")) {
                needleAnimation.play();
                if (needleAnimation.frame != 37) {
                    needleFilled--;
                }
                if (insulinBottleSprite.overlapping(needleSprite)) {
                    insulinInBottle++;
                }
        } 

        //otherwise stop animation
        else {
            needleAnimation.stop();
        }

        //if bottle and needle are empty, reset everything and buy new bottle
        if (insulinInBottle <= 0 && needleAnimation.frame == 37) {
                needlefilled =  0;
                payInsulin();
                insulinInBottle = 500;
                newEmptyBottle();
                closeGame();
        }

        //if player clicks close, close insulin game
        if (exitGame.mouse.presses()) {
            closeGame();
        }
    }

    //if bloodSugar is too low, game over
    if (bloodSugar < 5) {
        gameOver();
    }

       
}



//increase days/month/year
function chooseDay() {
    //increase day
    whatDay++;
    daysPast++;
    //if day is higher than max number of days in the month, reset to 1 and increase month
    if (whatDay > day[whatMonth]) {
        
        funds += 1000;
        //increase month
        whatMonth++;

        //select a new article to read once current one ends
        randomArticleBuffer = floor(random(news.length));

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

    let randomIncrease = floor(random(15));

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

    //if funds too low, give player a pop up
    if (funds <= insulinPrice) {
        fundsSprite.textColor = "red";
        let debtPopUp = new popUp.Sprite();
        debtPopUp.text = "You will not be able to afford another bottle of Insulin until next month. Ration well."
        debtPopUp.textSize = 20;
        debtPopUp.width = windowWidth/1.5;
    }

}

//starts the game
function startGame() {

    //remove overlay
    startGameSprite.remove();
    startGameText1.remove();
    startGameText2.remove();
    startGameText3.remove();
    startGameText4.remove();
    startGameText5.remove();

    //create insulinArea
    insulinArea = new Sprite();
    insulinArea.x = windowWidth/2 + 650;
    insulinArea.y = windowHeight/2 + 100;
    insulinArea.scale = 3;
    insulinArea.color = color(0,0);
    insulinArea.strokeWeight = 0;
    insulinArea.collider = "s";

    //start playing window Animation
    windowAnimation.play(196);
    windowAnimation.rewind();

    //start all the intervals
    startIntervals();

}


function startIntervals() {

    //run chooseDay function every 3.3 second
    dayInterval = setInterval(chooseDay, 3300);

    //run changeNews function every 1/4 second
    newsInterval = setInterval(changeNews, 250);

    //run bloodSugarIncrease function every 1/2 second
    bloodSugarInterval = setInterval(bloodSugarIncrease, 500);

    //run checkBG every 7 seconds
    checkBGInterval = setInterval(checkBG, 7000);

}

//removes all intervals
function stopIntervals() {

    clearInterval(dayInterval);
    clearInterval(newsInterval);
    clearInterval(bloodSugarInterval);
    clearInterval(checkBGInterval);
}

function insulinClicked() {

    //if popup is not there
    if (insulinPopUp == false) {
        //if bg is under 170, show popup
        if(bloodSugar <= 170) {
            dontNeedInsulinSprite = new popUp.Sprite();
            dontNeedInsulinSprite.text = "I don't think I need that right now";
            insulinPopUp = true;  
        }

        //if game has already been played  
        else if (insulinPlayed) {
            reopenGame();
        }

        //if first time
        else {
            insulinGame();
        }
    }
}

//creates assests for insulin game
function insulinGame() {

    //create background
    insulinGameBackground = new gameGroup.Sprite();
    insulinGameBackground.height = windowHeight;
    insulinGameBackground.width = windowWidth;
    insulinGameBackground.color = color(255, 255, 255, 230);
    insulinGameBackground.collider = "n";
    insulinGameBackground.layer = 9;
    
    //create needle
    needleSprite = new gameGroup.Sprite();
    needleSprite.ani = needleAnimation;
    needleSprite.width = 6;
    needleSprite.height = 90;
    needleAnimation.frame = needleFrame;
    needleAnimation.stop();
    needleAnimation.noLoop();
    needleSprite.debug = true;
    needleSprite.collider = "d";
    needleSprite.scale = 5;
    needleAnimation.frameDelay = 8;
    needleSprite.offset.y = 200;
  
    //create insulin bottle
    insulinBottleSprite = new gameGroup.Sprite();
    insulinBottleSprite.img = "assets/img/Insulin.png";
    insulinBottleSprite.mirror.y = true;
    insulinBottleSprite.x = windowWidth/2;
    insulinBottleSprite.y = windowHeight/5;
    insulinBottleSprite.width = 32;
    insulinBottleSprite.height = 64;
    insulinBottleSprite.collider = "s";
    insulinBottleSprite.scale = 2.5;
    insulinBottleSprite.debug = true;


    //invisible barriers for sprite bottle

    insulinBarrier = new gameGroup.Sprite([
        [insulinBottleSprite.x - insulinBottleSprite.width/2, insulinBottleSprite.y - insulinBottleSprite.height/2],
        [insulinBottleSprite.x - insulinBottleSprite.width/2, insulinBottleSprite.y + insulinBottleSprite.height/2],
        [insulinBottleSprite.x - insulinBottleSprite.width/3, insulinBottleSprite.y + insulinBottleSprite.height/2],
        [insulinBottleSprite.x - insulinBottleSprite.width/3, insulinBottleSprite.y + insulinBottleSprite.height/3],
        [insulinBottleSprite.x + insulinBottleSprite.width/3, insulinBottleSprite.y + insulinBottleSprite.height/3],
        [insulinBottleSprite.x + insulinBottleSprite.width/3, insulinBottleSprite.y + insulinBottleSprite.height/2],
        [insulinBottleSprite.x + insulinBottleSprite.width/2, insulinBottleSprite.y + insulinBottleSprite.height/2],
        [insulinBottleSprite.x + insulinBottleSprite.width/2, insulinBottleSprite.y - insulinBottleSprite.height/2],
        [insulinBottleSprite.x - insulinBottleSprite.width/2, insulinBottleSprite.y - insulinBottleSprite.height/2],
    ]);
    insulinBarrier.color = color(0,0);
    insulinBarrier.strokeWeight = 0;
    insulinBarrier.collider = "s";
    insulinBarrier.textSize = 20;

    //create stomach
    stomachSprite = new gameGroup.Sprite();
    stomachSprite.diameter = windowWidth;
    stomachSprite.x = windowWidth/2;
    stomachSprite.y = windowHeight*1.9;
    stomachSprite.collider = "s";
    stomachSprite.color = "bisque";

    //create internal stomach barrier
    stomachBarrier = new gameGroup.Sprite();
    stomachBarrier.diameter = stomachSprite.diameter - stomachSprite.diameter/50;
    stomachBarrier.x = stomachSprite.x;
    stomachBarrier.y = stomachSprite.y;
    stomachBarrier.color = color(0,0);
    stomachBarrier.strokeWeight = 0;
    // stomachBarrier.debug = true;
    stomachBarrier.collider = "s";

    //create close button
    exitGame = new gameGroup.Sprite();
    exitGame.width = windowWidth/5;
    exitGame.height = windowHeight/7;
    exitGame.x = exitGame.width/2;
    exitGame.y = exitGame.height/2;
    exitGame.color = color(100, 100, 100, 190);
    exitGame.strokeWeight = 3;
    exitGame.text = "Close";
    exitGame.textSize = 40;
    exitGame.textColor = "white";
    exitGame.collider = "s";

    //create left rule
    ruleSprite1 = new gameGroup.Sprite();
    ruleSprite1.color = color(0,0);
    ruleSprite1.text = "Left Click to Pull";
    ruleSprite1.strokeWeight = 0;
    ruleSprite1.textSize = 40;
    ruleSprite1.x = windowWidth/4
    ruleSprite1.y = 5*windowHeight/6;
    ruleSprite1.collider = "n";

    //create right rule
    ruleSprite2 = new gameGroup.Sprite();
    ruleSprite2.color = color(0,0);
    ruleSprite2.text = "Right Click to Push";
    ruleSprite2.strokeWeight = 0;
    ruleSprite2.textSize = 40;
    ruleSprite2.x = 3*windowWidth/4
    ruleSprite2.y = 5*windowHeight/6;
    ruleSprite2.collider = "n";

    //set all other sprites to no collider
    dateSprite.collider = "n";
    fundsSprite.collider = "n";
    ageSprite.collider = "n";
    insulinArea.collider = "n";
    currentPriceSprite.collider = "n";
    newsSprite.collider = "n";
    bloodSugarSprite.collider = "n";    

    //set game playing to true
    insulinGamePlaying = true;
    insulinPlayed = true;
    
}

//when game closes run this
function closeGame() {

    //set all game things invisible
    gameGroup.visible = false;
    needleAnimation.stop();
    needleSprite.x = insulinArea.x;
    needleSprite.y = insulinArea.y

    //revert all colliders
    dateSprite.collider = "s";
    fundsSprite.collider = "s";
    ageSprite.collider = "s";
    insulinArea.collider = "s";
    currentPriceSprite.collider = "s";
    newsSprite.collider = "s";
    bloodSugarSprite.collider = "s";  
    
    //not playing anymore
    insulinGamePlaying = false;
}

//when a bottle runs out of insulin, add sprite to game
function newEmptyBottle() {

    let emptyInsulin = new emptyBottle.Sprite();
    let randomNumber1 = round(random(0,1));

    if (randomNumber1) {
        emptyInsulin.x = random(windowWidth/3);
    } else {
        emptyInsulin.x = random(2*windowWidth/3, windowWidth);
    }

    emptyInsulin.y = random(windowHeight/2 + windowHeight/15, windowHeight/2 + windowHeight/6);
    emptyInsulin.strokeWeight = 0;
    emptyInsulin.layer = 8;
    bottleNumber++;
    
}

//checks BG to see what sound to play
function checkBG() {

    if (bloodSugar >= 350) {
        highAlarm.play();
        highCounter++;
        lowCounter = 0;
    } else if (bloodSugar <= 60 && bloodSugar >= 40) {
        urgentLowSoon.play();
        highCounter = 0;
        lowCounter = 0;
    } else if (bloodSugar <= 80 && bloodSugar >= 60) {
        lowAlarm.play();
        highCounter = 0;
    } else if (bloodSugar <= 40) {
        urgentLow.play();
        lowCounter++;
        highCounter = 0;
    } else {
        highCounter = 0;
        lowCounter = 0;
    }

    //if high or low for too long, game over
    if (highCounter >= 7 || lowCounter >= 2) {
        gameOver();
    }
}

//ending of game
function gameOver() {
    //stop all intervals
    stopIntervals();

    //close game if its playing
    closeGame();

    dead = true;

    //remove all groups;
    gameGroup.removeAll();
    emptyBottle.removeAll();
    popUp.removeAll();

    //new background
    let gameOverBackground = new Sprite();
    gameOverBackground.height = windowHeight;
    gameOverBackground.width = windowWidth;
    gameOverBackground.color = "red";
    gameOverBackground.collider = "n";

    //tells you how you died
    let gameOverText = new Sprite();
    gameOverText.color = "black";
    gameOverText.textColor = "white";
    gameOverText.textSize = 30;
    gameOverText.width = windowWidth;
    gameOverText.height = windowHeight/4
    gameOverText.x = windowWidth/2
    gameOverText.y = windowHeight/4;
    gameOverText.collider = "n";
    if (highCounter >= 6) {
        gameOverText.text = "Your blood sugar has been high for too long. You have died from Diabetic Ketoacidosis.";
    }
    else if (lowCounter >= 2) {
        gameOverText.text = "Your blood sugar has been too low for too long. You have died from Hypoglycemia.";
    } else if (bloodSugar <= 5) {
        gameOverText.text = "Your blood sugar has been gone too low. You have died from Hypoglycemia.";
    }

    //stats from the game
    let stats = new Sprite();
    stats.x = windowWidth/2;
    stats.y = 2*windowHeight/3;
    stats.width = windowWidth/2;
    stats.height = windowHeight/3;
    stats.color = "black";
    stats.textColor = "white";
    stats.textSize = 25;
    stats.text = "Days with Diabetes: " + daysPast + "    # of Insulin Bottles bought: " + bottleNumber;
    stats.collider = "n";

    //restart button
    restartSprite = new Sprite();
    restartSprite.y = stats.y + windowHeight/4;
    restartSprite.x = windowWidth/2;
    restartSprite.width = windowWidth/3;
    restartSprite.height = windowHeight/5;
    restartSprite.color = "darkred"
    restartSprite.text = "Restart";
    restartSprite.textColor = "White";
    restartSprite.textSize = 30;    
    restartSprite.collider = "s";
}

//when insulin game reopens
function reopenGame() {

    //make everything visible
    gameGroup.visible = true;
    needleSprite.collider = "d";
    insulinBottleSprite.collider = "s";
    stomachSprite.collider = "s";

    //set colliders to none
    dateSprite.collider = "n";
    fundsSprite.collider = "n";
    ageSprite.collider = "n";
    insulinArea.collider = "n";
    currentPriceSprite.collider = "n";
    newsSprite.collider = "n";
    bloodSugarSprite.collider = "n";  
    

    insulinGamePlaying = true;
}