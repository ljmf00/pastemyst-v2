import { timeDifferenceToString } from "../helpers/time.js";

window.addEventListener("load", async () =>
{
    for (let i = 0; i < pastes.length; i++) // jshint ignore:line
    {
        let pasteElement = document.querySelectorAll("#profile .pastes .paste")[i];
        let createdAtDate = new Date(pastes[i].createdAt * 1000); // jshint ignore:line

        pasteElement.querySelector(".info .created-at .value").textContent = "created at: " + createdAtDate.toDateString().toLowerCase();
        pasteElement.querySelector(".info .created-at .tooltip-text").textContent = createdAtDate.toString().toLowerCase();

        // TODO: this can be optimized, the pastes now hold information where they will get deleted
        const response = await fetch(`/api/v2/time/expiresInToUnixTime?createdAt=${pastes[i].createdAt}&expiresIn=${pastes[i].expiresIn}`, // jshint ignore:line
        {
            headers:
            {
                "Content-Type": "application/json"
            }
        });

        let expiresAt = (await response.json()).result;

        if (expiresAt !== 0)
        {
            let expiresIn = timeDifferenceToString(expiresAt * 1000 - new Date());
            pasteElement.querySelector(".info .expires-in").textContent = "expires in: " + expiresIn;
        }
        else
        {
            let expiresInElem = pasteElement.querySelector(".info .expires-in");
            expiresInElem.parentNode.removeChild(expiresInElem);
        }

        if (pastes[i].editedAt !== 0) // jshint ignore:line
        {
            let editedAt = new Date(pastes[i].editedAt * 1000); // jshint ignore:line

            pasteElement.querySelector(".info .edited-at .value").textContent = "edited at: " + editedAt.toDateString().toLowerCase();
            pasteElement.querySelector(".info .edited-at .tooltip-text").textContent = editedAt.toString().toLowerCase();
        }
        else
        {
            let editedAtElem = pasteElement.querySelector(".info .edited-at");
            editedAtElem.parentNode.removeChild(editedAtElem);
        }
    }
});
