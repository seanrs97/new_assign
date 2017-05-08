if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {

    console.log('Service worker registered successfully');
  }).catch(function(err) {
    console.log('Service worker registration failed: ', err);
  });
}

fetch("events.json")
    .then(response => {
        return response.json();
    }).then(events => {
        const eventsHTML = events.map(event => {
            return `<div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
				<div class = "mdl_card_title">
					<h1 class = "mdl_card_title-text">${event.main_heading}</h1>
				</div>
                <div class="mdl-card__media">
                    <img class="article-image" src="${event.picture}" border="0" alt="further information image">
					<img class="article-image" src="${event.picture2}" border="0" alt="further information image">
                </div>
                <div class="mdl-card__title">
                    <h3 class="mdl-card__title-text">${event.heading}</h3>
                </div>
                <div class="mdl-card__supporting-text">
                    ${event.text}
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="${event.link}" data-upgraded=",MaterialButton,MaterialRipple">Interesting Site 1<span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></a>
					<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="${event.link2}" data-upgraded=",MaterialButton,MaterialRipple">Interesting Site 2<span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></a>
                </div>
            </div>`;
        }).join("\n");
        const eventsContainer = document.getElementById('events');
        eventsContainer.innerHTML = eventsHTML;
    });