class Die {
    "use strict";
    constructor(s) {
        this.side = s;
    }

    // <getter methods>
    getSide() {
        return this.side;
    }
    getFace() {
        return this.face;
    }
    // <\getter methods>

    reRoll(num)/* re-generates the dice results*/ {
        this.face = Math.floor((Math.random() * num) + 1)
    }
    drawDie(x, y, n)/*draws the dice to the screen*/ {
        if (this.face != null) {
            switch (n)/*based on what type the die is*/ {
                case 2:
                    fill(255);
                    circle(x + 25, y + 25, 25);
                    fill(0);
                    switch (this.face) {
                        case 1: {
                            ellipse(x + 25, y + 25, 10, 10);
                            break;
                        }
                        case 2: {
                            ellipse(x + 20, y + 20, 10, 10);
                            ellipse(x + 30, y + 30, 10, 10);
                            break;
                        }

                    }
                    break;
                case 3:
                    fill(255);
                    rect(x, y + 10, 50, 30, 10);
                    fill(0);
                    switch (this.face) {
                        case 3:
                        case 2:
                            ellipse(x + 10, y + 25, 10, 10);
                            ellipse(x + 40, y + 25, 10, 10);
                            if (this.face != 3) {
                                break;
                            }
                            case 1:
                                ellipse(x + 25, y + 25, 10, 10);
                                break;
                    }
                    break;
                case 4:
                    fill(255);
                    triangle(x + 25, y, x, y + 50, x + 50, y + 50)
                    fill(0);
                    switch (this.face) {
                        case 4:
                        case 3:
                            ellipse(x + 25, y + 20, 10, 10)
                        case 2:
                            ellipse(x + 15, y + 40, 10, 10);
                            ellipse(x + 35, y + 40, 10, 10);
                            if (this.face !== 4) {
                                break;
                            }
                            case 1:
                                ellipse(x + 25, y + 32, 10, 10);
                                break;
                    }
                    break;
                case 6:
                    fill(255);
                    rect(x, y, 50, 50, 10);
                    fill(0);
                    switch (this.face) {
                        case 6:
                            ellipse(x + 10, y + 25, 10, 10);
                            ellipse(x + 40, y + 25, 10, 10);
                        case 5:
                        case 4:
                            ellipse(x + 10, y + 40, 10, 10);
                            ellipse(x + 40, y + 10, 10, 10);
                        case 3:
                        case 2:
                            ellipse(x + 10, y + 10, 10, 10);
                            ellipse(x + 40, y + 40, 10, 10);
                            if (this.face !== 3 && this.face !== 5) {
                                break;
                            }
                            case 1:
                                ellipse(x + 25, y + 25, 10, 10);
                                break;
                    }
                    break;
                case 8:
                    fill(255);
                    triangle(x, y + 50, x + 50, y + 50, x + 25, y + 5)
                    fill(0);
                    text(this.face, x + 15, y + 45);
                    break;
                default:
                    fill(255);
                    text(this.face, x + 10, y + 25);
                    break;
            }
        }
    }
}

// <decleration block>
var count;
var sides;
var dice;
var runningTotal;
var i;
// <\declerationblock>

function setup() {
    //Canvas setup//
    createCanvas(400, 400);
    background(0);
    frameRate(5);
    textSize(32);
    var canvas = createCanvas(500,500)
    canvas.parent('dice')
    
    //variable initialization//
    count = 4;
    sides = 6;
    runingTotal = 0;

    //dice initialization//
    dice = new Array(count);
    for (i = 0; i < count; i += 1) {
        dice[i] = new Die(sides);
        dice[i].reRoll(sides);
    }
    
    //startup//
    drawDice();
}

function draw() /*is only here to tell the browser to watch for events*/ {}

function keyPressed()/*handles key inputs*/ {
    "use strict";
    background(0); //clear the screen
    var i;
    switch (keyCode) {/* based on which key is pressed*/
        case LEFT_ARROW: /* decrease the dice type */ {
            if (sides > 2) {
                sides -= 1;
                if (sides === 5 || sides === 7) {
                    sides -= 1;
                }
                for (i = 0; i < count; i += 1) {
                    dice[i] = new Die(sides);
                }
            }
            drawDice();
            break;
        }
        case RIGHT_ARROW: /* increase the dice type*/ {
            if (sides < 8) {
                sides += 1;
                if (sides === 5 || sides === 7) {
                    sides += 1;
                }
                for (i = 0; i < count; i += 1) {
                    dice[i] = new Die(sides);
                }
            }
            drawDice();
            break;
        }
        case UP_ARROW: /* increase the number of dice*/ {
            if (count < 10) {
                count += 1;
                dice = new Array(count);
                for (i = 0; i < count; i += 1) {
                    dice[i] = new Die(sides);
                }
            }
            drawDice();
            break;
        }
        case DOWN_ARROW: /* decrease the number of dice*/ {
            if (count > 1) {
                count -= 1;
                dice = new Array(count);
                for (i = 0; i < count; i += 1) {
                    dice[i] = new Die(sides);
                }
            }
            drawDice();
            break;
        }
        case 32: /* reroll the dice when the spacebar is pressed */ {
            drawDice();
            break;
        }
    }
    retainDice(); //retain the dice on screen, needed in case the user inputs a key not checked for here
}   

function drawDice()/*draws dice when rerolled*/ {
    "use strict";
    var a;
    background(0);
    for (a = 0; a < dice.length; a += 1) {
        dice[a].reRoll(sides);
        if (a < 5) {
            dice[a].drawDie((10 + 60 * a), 10, sides);
        } else {
            dice[a].drawDie((10 + 60 * a) - 300, 70, sides);
        }
    }
    drawTotal(); //draw the text
} 

function retainDice()/*keeps the dice the same*/ {
    "use strict";
    var a;
    background(0);
    for (a = 0; a < dice.length; a += 1) {
        if (a < 5) {
            dice[a].drawDie((10 + 60 * a), 10, sides);
        } else {
            dice[a].drawDie((10 + 60 * a) - 300, 70, sides);
        }
    }
    drawTotal(); //draw the text
} 

function drawTotal()/*draws the text on screen*/ {
    "use strict";
    var a;
    var b;
    let total = 0;
    var nums = new Array(dice[0].getSide());
    for (a = 0; a < nums.length; a += 1) {
        nums[a] = 0;
    }
    for (a = 0; a < dice.length; a += 1) {
        total += dice[a].getFace();
        nums[dice[a].getFace() - 1] += 1;
        runningTotal += dice[a].getFace();
    }

    fill(255);
    noStroke();
    text("Total: " + total, 10, 160);

    if (dice.length === 1) {
        text(dice.length + " " + dice[0].getSide() + "-sided die", 10, 200);
    } else {
        text(dice.length + " " + dice[0].getSide() + "-sided dice", 10, 200);
    }

    for (a = 0; a < dice[0].getSide(); a += 1) {
        if (a < 3) {
            text(a + 1 + ": " + nums[a], 10, 240 + (40 * a));
        } else if (a < 6) {
            text(a + 1 + ": " + nums[a], 100, 240 + (40 * (a - 3)));
        } else {
            text(a + 1 + ": " + nums[a], 190, 240 + (40 * (a - 6)));
        }

    }

    textSize(10);
    text("Space: Reroll    Left/Right: Faces on the dice    Up/Down: Number of dice", 10, 360, );
    textSize(32);
} 
