import "./components/navigation.js";
import { getWordwrap, getFullwidth } from "./helpers/options.js";

window.addEventListener("load", () =>
{
    document.querySelector("nav .fullwidth").addEventListener("click", toggleFullwidth);
    document.querySelector("nav .wordwrap").addEventListener("click", toggleWordwrap);

    document.getElementById("theme-picker").addEventListener("change", setThemeEvent);

    setFullwidthClasses();

    if (localStorage.getItem("theme") === null)
    {
        localStorage.setItem("theme", "myst");
    }
    else
    {
        const themePicker = document.getElementById("theme-picker");
        const theme = localStorage.getItem("theme");

        themePicker.value = theme;
    }

    setTheme();
});

function toggleFullwidth()
{
    let fullwidth = getFullwidth();

    localStorage.setItem("fullwidth", !fullwidth);

    setFullwidthClasses();
}

function toggleWordwrap()
{
    let wordwrap = getWordwrap();

    localStorage.setItem("wordwrap", !wordwrap);

    let editorElements = document.querySelectorAll(".CodeMirror");

    for (let i = 0; i < editorElements.length; i++)
    {
        let editor = editorElements[i].CodeMirror;
        editor.setOption("lineWrapping", !wordwrap);
    }
}

function setFullwidthClasses()
{
    let fullwidth = localStorage.getItem("fullwidth") === "true";
    let container = document.getElementById("container");

    if (fullwidth)
    {
        if (!container.classList.contains("fullwidth"))
        {
            container.classList.add("fullwidth");
        }
    }
    else
    {
        if (container.classList.contains("fullwidth"))
        {
            container.classList.remove("fullwidth");
        }
    }
}

function setThemeEvent(e)
{
    localStorage.setItem("theme", e.target.value);
    setTheme();
}

function setTheme()
{
    const theme = localStorage.getItem("theme");

    let editorElements = document.querySelectorAll(".CodeMirror");

    for (let i = 0; i < editorElements.length; i++)
    {
        let editor = editorElements[i].CodeMirror;
        editor.setOption("theme", theme);
    }

    document.documentElement.classList = theme;
}
