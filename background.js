
chrome.runtime.onInstalled.addListener(() => {

    chrome.contextMenus.create({
        id: "lookupWord",
        title: "Get Meaning",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "lookupWord" && info.selectionText) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: fetchWordMeaning,
            args: [info.selectionText]
        });
    }
});

async function fetchWordMeaning(word) {
    if (!word) return;

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.length > 0) {
            const meaning = data[0].meanings[0].definitions[0].definition;
            alert(`Meaning of "${word}":\n${meaning}`);
        } else {
            alert(`No definition found for "${word}".`);
        }
    } catch (error) {
        console.error("Error fetching definition:", error);
        alert("Error fetching definition.");
    }
}
