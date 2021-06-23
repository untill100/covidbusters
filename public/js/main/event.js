window.addEventListener("load", function(e) {
    const app = document.querySelector("#app");
    app.style.opacity = 1;
});

window.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const app = document.querySelector("#app");
        app.style.opacity = 0;

        setTimeout(() => {
            window.location.href = "intro.html";
        }, 1000);
    }
});