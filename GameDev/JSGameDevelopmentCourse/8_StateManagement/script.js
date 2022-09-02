window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas1");
    const context = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 720;

    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        context.clearRect(0, 0, canvas.width, canvas.height);

        requestAnimationFrame(animate);
    }
    animate(0);
});