let steps = document.querySelectorAll(".steps")
let nextBtn = document.querySelector(".next-btn")
steps[0].style.display = "block"
steps[0].style.opacity = "1"

let currStep = 0
let nextStep = false
nextBtn.addEventListener("click",()=>{
    let inputs = steps[currStep].querySelectorAll("input.required")
    inputs.forEach(input => {
        if (input.type == "text") {
            if (input.value == "") {
                nextStep = false
                inputs.forEach(input => {
                    if (input.type == "text") {
                        if (input.value == "") {
                            input.nextElementSibling.style.display = "block"
                        }
                        else{
                            input.nextElementSibling.style.display = "none"
                        }
                    }
                });
                return;
            }
            else{
                nextStep = true
            }
        }
        else if(input.type == "number"){
            if (input.value <= "0") {
                nextStep = false
                inputs.forEach(input => {
                    if (input.type == "number") {
                        if (input.value <= "0") {
                            input.parentElement.nextElementSibling.style.display = "block"
                        }
                        else{
                            input.parentElement.nextElementSibling.style.display = "none"
                        }
                    }
                });
                return 
            }
            else{
                inputs.forEach(input => {
                    if (input.type == "number") {
                        if (input.value >= "1") {
                            input.parentElement.nextElementSibling.style.display = "none"
                        }
                        else{
                            input.parentElement.nextElementSibling.style.display = "block"
                        }
                    }
                });
                nextStep = true
            }
        }
    });
    
    if (nextStep) {
        currStep++
        showStep()
    }
})

function showStep() {
    if (currStep == 5) {
        nextBtn.style.display = "none"
    }
    steps.forEach(step => {
        step.style.display = "none"
        step.style.opacity = "0"
    });
    steps[currStep].style.display = "block"
    steps[currStep].style.opacity = "1"
}