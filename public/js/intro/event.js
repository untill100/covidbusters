window.addEventListener("load", function(e) {
    const app = document.querySelector("#app");
    app.style.opacity = 1;

    handle_intro();

    const skip = document.querySelector("#skip");
    skip.addEventListener("click", function(e) {
        const app = document.querySelector("#app");
        app.style.opacity = 0;

        move_to_link("select.html");
    });
});

window.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const app = document.querySelector("#app");
        app.style.opacity = 0;

        setTimeout(() => {
            window.location.href = "select.html";
        }, 1000);
    }
});

function handle_intro() {
    const intro = document.querySelector("#intro");
    intro.style.top = -intro.offsetHeight + "px";
    setTimeout(() => {
        const app = document.querySelector("#app");
        app.style.opacity = 0;

        move_to_link("select.html");
    }, 21 * 1000);
}

function move_to_link(_link) {
    setTimeout(() => {
        window.location.href = _link;
    }, 1000);
}