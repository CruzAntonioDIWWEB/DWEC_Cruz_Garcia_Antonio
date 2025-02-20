
window.onload = () => {
    let isRunning = false;
    let startTime = 0;
    let elapsedTime = 0;
    let interval;

    function updateStopwatch() {
        const currentTime = Date.now();
        const totalTime = elapsedTime + (currentTime - startTime) / 1000;
        document.getElementById("display").textContent = totalTime.toFixed(2);
    }

    function start() {
        if (!isRunning) {
            startTime = Date.now();
            interval = setInterval(updateStopwatch, 1);
            document.getElementById("start").disabled = true;
            document.getElementById("stop").disabled = false;
            isRunning = true;
        }
    }

    function stop() {
        if (isRunning) {
            clearInterval(interval);
            elapsedTime += (Date.now() - startTime) / 1000;
            document.getElementById("start").disabled = false;
            document.getElementById("stop").disabled = true;
            isRunning = false;
        }
    }

    function reset() {
        clearInterval(interval);
        isRunning = false;
        elapsedTime = 0;
        document.getElementById("display").textContent = "0.00";
        document.getElementById("start").disabled = false;
        document.getElementById("stop").disabled = true;
    }

    document.getElementById("start").addEventListener("click", start);
    document.getElementById("stop").addEventListener("click", stop);
    document.getElementById("reset").addEventListener("click", reset);
};
