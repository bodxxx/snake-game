// Creating the field with cells
let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i = 1; i < 101; i++) {
    let cell = document.createElement('div');
    field.appendChild(cell);
    cell.classList.add('cell');
}

// Getting coordinates for cells
let cell = document.getElementsByClassName('cell');
let x = 1;
let y = 10;

for (let i = 0; i < cell.length; i++) {
    if (x > 10) {
        x = 1;
        y--;
    }
    cell[i].setAttribute('posX', x);
    cell[i].setAttribute('posY', y);
    x++;
}

// Creating snake, getting random coordinates
function generateSnake() {
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
}

// Setting coordinates for snake
let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] +'"][posY = "' + coordinates[1] +'"]'), document.querySelector('[posX = "' + (coordinates[0] - 1) +'"][posY = "' + coordinates[1] +'"]'), document.querySelector('[posX = "' + (coordinates[0] - 2) +'"][posY = "' + coordinates[1] +'"]')];

// Creating snake body
for (let i = 0; i<snakeBody.length; i++) {
    snakeBody[i].classList.add('snake-body');
}
// Creating snake head
snakeBody[0].classList.add('snake-head');

// Creating mouse
let mouse;

// Getting random coordinates
function createMouse () {
    function generateMouse() {
        let posX = Math.round(Math.random() * (10 - 3) + 3);
        let posY = Math.round(Math.random() * (10 - 1) + 1);
        return [posX, posY];
    }

    // Setting mouse coordinates
    let mouseCoordinates = generateMouse();
    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] +'"][posY = "' + mouseCoordinates[1] +'"]');
    
    // Make the coordinates of the mouse and the snake do not match at the start
    while(mouse.classList.contains('snake-body')) {
        let mouseCoordinates = generateMouse();
        mouse = document.querySelector('[posX = "' + mouseCoordinates[0] +'"][posY = "' + mouseCoordinates[1] +'"]');
    }

    mouse.classList.add('mouse');
};

createMouse();

// Variable for moving the snake
let direction = 'right';
let steps = false;

// Input for the score
let input = document.createElement('input');
input.setAttribute('readonly', true);
document.body.appendChild(input);
input.style.cssText = `
margin: auto;
margin-top: 15px;
font-size: 30px;
display: block;
cursor: unset;
outline: none;
text-align: center;
`;

let score = 0;
input.value = `Your score: ${score}`;

// Making snake move
function move() {
    // Move the snake right by default
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('snake-head');
    snakeBody[snakeBody.length - 1].classList.remove('snake-body');
    snakeBody.pop();

    // Move the snake right/left/up/down
    if (direction == 'right') {
        if (snakeCoordinates[0] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) +'"][posY = "' + snakeCoordinates[1] +'"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] +'"]'));
        }
    } else if (direction == 'left') {
        if (snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) +'"][posY = "' + snakeCoordinates[1] +'"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] +'"]'));
        }
    } else if (direction == 'up') {
        if (snakeCoordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] +'"][posY = "' + (+snakeCoordinates[1] + 1) +'"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] +'"][posY = "1"]'));
        }
    } else if (direction == 'down') {
        if (snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] +'"][posY = "' + (+snakeCoordinates[1] - 1) +'"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] +'"][posY = "10"]'));
        }
    }

    // Making  the snake eat the mouse
    if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
        // Remove the mouse
        mouse.classList.remove('mouse');
        // Make the snake bigger
        let a = snakeBody[snakeBody.length-1].getAttribute('posX');
        let b = snakeBody[snakeBody.length-1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "'+ a +'"][posY = "'+ b +'"]'));
        // Add new mouse
        createMouse();
        // Add score
        score++;
        input.value = `Your score: ${score}`;
    }

    // End game rules
    if (snakeBody[0].classList.contains('snake-body')) {
        setTimeout(() => {
            alert(`Game is over! Your score: ${score}`);
            document.location.reload();
        }, 200)
        clearInterval(interval);
        snakeBody[0].classList.add('red');
    }

    snakeBody[0].classList.add('snake-head');
    for (let i = 0; i<snakeBody.length; i++) {
        snakeBody[i].classList.add('snake-body');
    }

    steps = true;
}

// Interval for moving the snake
let interval = setInterval(move, 300);

// Move your snake with keydown 
window.addEventListener('keydown', function (e) {
    if (steps == true) {
        if (e.keyCode == 37 && direction != 'right') {
            direction = 'left';
            steps = false;
        } else if (e.keyCode == 38 && direction != 'down') {
            direction = 'up';
            steps = false;
        } else if (e.keyCode == 39 && direction != 'left') {
            direction = 'right';
            steps = false;
        } else if (e.keyCode == 40 && direction != 'up') {
            direction = 'down';
            steps = false;
        }
    }
});