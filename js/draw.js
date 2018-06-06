var draw = (function() {

    var getRandomColor = function()
    {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    var bodySnake = function(x, y) {
        // Single Square
        ctx.fillStyle = getRandomColor();
        ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        // Border of Square
        ctx.strokeStyle = "black";
        ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    }

    var drawFood = function(x, y) {
        // This is the border of the food
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        // This is the single square 
        ctx.fillStyle = 'red';
        ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
    }

    var scoreText = function(){
        // Current Score
        var scoreText = "Score: " + score;
        ctx.fillStyle = "white";
        ctx.fillText(scoreText, 145, height - 5);
    }

    var drawSnake = function() {
        snake = [];
        // Push squares into array
        for (i = 4; i >= 0; i--) {
            snake.push({ x: i, y: 0 });
        }
    }

    var createFood = function() {
        food =
            {
                // Random Positions
                x: Math.floor((Math.random() * 30) + 1),
                y: Math.floor((Math.random() * 30) + 1)
            }

        // Check for snake pos
        for (i = 0; i > snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;

            if (food.x === snakeX || food.y === snakeY ||
                food.y === snakeY && food.x === snakeX) {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    }

    var checkCollision = function(x, y, array) {
        for (i = 0; i < array.length; i++) {
            if (array[i].x === x && array[i].y === y)
                return true;
        }
        return false;
    }

    var paint = function() {
        // Background 
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);

        // Background border
        ctx.strokeStyle = "white";
        ctx.strokeRect(0, 0, width, height);

        // Turn Button Off 
        btn.setAttribute("disabled", true);

        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        // MAKE DE SNAKE MOVE TIME
        if (direction == 'right') {
            snakeX++;
        }
        else if (direction == 'left') {
            snakeX--;
        }
        else if (direction == 'up') {
            snakeY--;
        }
        else if (direction == 'down') {
            snakeY++;
        }
        // If snake touches canvas path or itself DIE
        if (snakeX == -1 || snakeX == width / snakeSize ||
            snakeY == -1 || snakeY == height / snakeSize ||
            checkCollision(snakeX, snakeY, snake)) {
            //Turn Button back On
            btn.removeAttribute("disabled", true);
            console.log('dead');
            ctx.clearRect(0, 0, width, height);
            gameloop = clearInterval(gameloop);
            return;
        }
        if (snakeX == food.x && snakeY == food.y) {
            var tail =
                {
                    x: snakeX,
                    y: snakeY
                };
            score++;

            createFood(); // if you get a food create a new one
        }
        else {
            var tail = snake.pop(); // Pops out last cell
            tail.x = snakeX;
            tail.y = snakeY;
        }
        //Tail first cell
        snake.unshift(tail);

        // Create body of snake
        for (i = 0; i < snake.length; i++) {
            bodySnake(snake[i].x, snake[i].y);
        }

        drawFood(food.x, food.y);

        scoreText();
    }

    var init = function() {
        direction = "down";
        drawSnake();
        createFood();
        gameloop = setInterval(paint, 80);
        score = 0;
    }

    return {init: init};
}());