window.addEventListener("load", function(e) {
    const app = document.querySelector("#app");
    app.style.opacity = 1;

    window.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            if (toggle_mizaru) {
                const app = document.querySelector("#app");
                app.style.opacity = 0;

                setTimeout(() => {
                    window.location.href = "play-mizaru.html";
                }, 1000);
            }

            if (toggle_iwazaru) {
                const app = document.querySelector("#app");
                app.style.opacity = 0;

                setTimeout(() => {
                    window.location.href = "play-iwazaru.html";
                }, 1000);
            }

            if (toggle_kikazaru) {
                const app = document.querySelector("#app");
                app.style.opacity = 0;

                setTimeout(() => {
                    window.location.href = "play-kikazaru.html";
                }, 1000);
            }
        }
    });
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