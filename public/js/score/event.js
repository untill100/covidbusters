window.addEventListener("load", function(e) {
    const app = document.querySelector("#app");
    app.style.opacity = 1;

    const value = sessionStorage.getItem("score");
    const your_score = document.querySelector("#your-score");
    your_score.innerHTML = `<p>YOUR SCORE<br>${value}</p>`;
});