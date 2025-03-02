document.addEventListener("dblclick",async(event) =>{
    const selection=window.getSelection().toString().trim();
    if(selection){
        fetchMeaning(selection);
    }
});

async function fetchWordMeaning(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data && data.length > 0) {
        const meaning = data[0].meanings[0].definitions[0].definition;
        showPopup(word, meaning);
      }
    } catch (error) {
      console.error("Error fetching definition.");
    }
  }

function showPopup(word,meaning){
    let popup=document.getElementById("word-popup");
    if(!popup){
        popup=document.createElement("div");
        popup.id="word-popup";
        document.body.appendChild(popup);
    }
    popup.innerHTML=`<strong>${word}:</strong>${meaning}`;
    popup.style.top = `${event.pageY + 10}px`;
    popup.style.left = `${event.pageX + 10}px`;
    popup.style.display = "block";
    setTimeout(() => popup.style.display = "none", 4000);
}