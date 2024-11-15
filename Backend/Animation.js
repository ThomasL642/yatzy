function animateDieRoll(result, dieNumber) {
    const $imageElement = $("#die" + dieNumber); // Use jQuery selector
    let rollCount = 0;
    let maxRolls = 15;
    let intervalTime = 50;

    // Function to generate a random dice face
    function getRandomDiceFace() {
        return Math.floor(Math.random() * 6) + 1;
    }

    // Start the rolling animation
    let rollInterval = setInterval(function() {
        const randomFace = getRandomDiceFace();
        $imageElement.attr("src", "https://github.com/ThomasL642/yatzy/blob/main/Dice%20Assets/dice(${randomFace}).png?raw=true"); // jQuery to update image source
        rollCount++;

        // Slow down the interval as it approaches the max roll count
        if (rollCount > maxRolls / 2) {
            intervalTime += 20;  // Increase time between rolls
            clearInterval(rollInterval);
            rollInterval = setInterval(function() {
                const randomFace = getRandomDiceFace();
                $imageElement.attr("src", "https://github.com/ThomasL642/yatzy/blob/main/Dice%20Assets/dice(${randomFace}).png?raw=true"); 
                rollCount++;

                // When max rolls reached, stop and set the final roll result
                if (rollCount >= maxRolls) {
                    clearInterval(rollInterval);
                    $imageElement.attr("src", "https://github.com/ThomasL642/yatzy/blob/main/Dice%20Assets/dice(${result}).png?raw=true"); // Set the final face with jQuery
                }
            }, intervalTime);
        }
    }, intervalTime);
}

window.animateDieRoll = animateDieRoll;