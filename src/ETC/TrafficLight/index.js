
// Write your JavaScript here.

const redLight = document.querySelector("#red");
const yellowLight = document.querySelector("#yellow");
const greenLight = document.querySelector("#green");

    lightsCameraAction();
    console.log("bingo")

    function sleep(ms)
    {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async function lightsCameraAction()
    {
        setLights(redLight, "red", yellowLight, greenLight);
        await sleep(1000);
        setLights(yellowLight, "yellow", redLight, greenLight);
        await sleep(1000);
        setLights(greenLight, "green", yellowLight, redLight);
        await sleep(1000);
    }

function setLights(on, colour, off1, off2)
{
    on.setAttribute("fill", colour);
    off1.setAttribute("fill", "black");
    off2.setAttribute("fill", "black");
}