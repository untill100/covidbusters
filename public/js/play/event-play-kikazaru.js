window.addEventListener("resize", function(e) {
    init_input_container();
});

init_input_container();

function init_input_container() {
    const input_container = document.querySelector("#input-container");

    input_container.style.left = (window.innerWidth - input_container.offsetWidth) / 2 + "px";
    input_container.style.bottom = 20 + "vh";
}

const weapon = document.querySelector("#weapon");
weapon.focus();

window.addEventListener("keydown", function(e) {
    const weapon = document.querySelector("#weapon");
    if (e.key === "Enter") {
        if (weapon.value !== "") {
            const input_text = weapon.value;
            const virus_text = VIRUSES[0].set_text;

            for (let i = 0; i < input_text.length; i++) {
                for (let j = 0; j < virus_text.length; j++) {
                    if (input_text[i] === virus_text[j]) {
                        VIRUSES[0].toggle_collision = true;
                        VIRUSES[0].calc_life();
                    }
                }
            }
            weapon.value = "";
        } else {
            weapon.focus();
        }
    }
});