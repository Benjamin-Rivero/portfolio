function initHtml() {
	const script = document.createElement("script");
	script.src = "https://code.jquery.com/jquery-3.7.1.min.js"; // Check https://jquery.com/ for the current version
	document.getElementsByTagName("head")[0].appendChild(script);

	const bootstrap = document.createElement("link");
	bootstrap.rel = "stylesheet";
	bootstrap.href =
		"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
	document.getElementsByTagName("head")[0].appendChild(bootstrap);

	const bootstrapJS = document.createElement("script");
	bootstrapJS.src =
		"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
	bootstrapJS.integrity =
		"sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz";
	bootstrapJS.crossOrigin = "anonymous";
	document.getElementsByTagName("head")[0].appendChild(bootstrapJS);

	const fontAwesome = document.createElement("script");
	fontAwesome.src = "https://kit.fontawesome.com/84cf682a85.js";
	fontAwesome.crossOrigin = "anonymous";
	document.getElementsByTagName("head")[0].appendChild(fontAwesome);

	const common = document.createElement("link");
	common.rel = "stylesheet";
	common.href = "common.css";
	document.getElementsByTagName("head")[0].appendChild(common);

  let body = document.getElementsByTagName("body")[0];
	let header = document.createElement("header");
	header.classList = "header";
	body.innerHTML = header.outerHTML + body.innerHTML;
	let footer = document.createElement("footer");
	footer.classList =
		"d-flex flex-row justify-content-between bg-secondary p-2 footer";
	body.appendChild(footer);
	
}

initHtml();

// Fonction pour charger le fichier XML avec fetch
async function loadXMLDoc(filename) {
  try {
      return fetch(filename)
      .then((response) => response.text())
      .then((text) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, "text/xml");
          return doc;
  });

  } catch (error) {
      console.error(error);
  }
}

// Fonction pour afficher les livres
function displayBooks(xml) {
  const projets = xml.getElementsByTagName("projet");
  console.log(projets);
  const cardSection = document.querySelector("[cards]");
  console.log(cardSection);
  for (let i = 0; i < projets.length; i++) {
      const projet = projets[i];
      const title = projet.getElementsByTagName("title")[0].textContent;
      const description = projet.getElementsByTagName("description")[0].textContent;
      const where = (projet.getElementsByTagName("where").length==0)? 'null': projet.getElementsByTagName("where")[0].textContent;
      const gitLink = (projet.getElementsByTagName("gitLink").length==0)? 'null' : projet.getElementsByTagName("gitLink")[0].textContent;

      const card = document.createElement("div");
      card.classList = "card col-lg-3 col-md-6 col-sm-12 mb-3";
      card.style = "width : 18rem; height:18rem;";
      cardSection.appendChild(card);

      const cardBody = document.createElement("div");
      cardBody.classList = "card-body";
      card.appendChild(cardBody);

      const cardTitle = document.createElement("h5");
      cardTitle.classList = "card-title";
      cardTitle.innerHTML = title;
      if(where != 'null'){
        cardTitle.innerHTML += (" - " + where);
      }
      cardBody.appendChild(cardTitle);

      const cardText = document.createElement("p");
      cardText.classList = "card-text";
      cardText.innerHTML = description;
      cardBody.appendChild(cardText);
      
      const cardFooter = document.createElement("div");
      cardFooter.classList = "card-footer";
      card.appendChild(cardFooter);

      if(gitLink != "null"){
        const cardGitLink = document.createElement("a");
        cardGitLink.href = gitLink;
        cardGitLink.classList = "btn btn-primary";
        cardGitLink.innerHTML = "Depot Git";
        cardFooter.appendChild(cardGitLink);
      }

  }
  // <div class="card col-lg-3 col-md-6 col-sm-12 mb-3" style="width: 18rem">
// 					<div class="card-body">
// 						<h5 class="card-title">
// 							Site de jeux vidéo - Formation Développeur Java
// 						</h5>
// 						<p class="card-text">
// 							Site réalisé avec Java et Springboot en back-end et utilisation
// 							des JSP pour le front-end
// 						</p>
// 					</div>
  //                     <div class="card-footer">
  //                         <a
// 							href="https://github.com/Benjamin-Rivero/capEntreprise"
// 							class="btn btn-primary"
// 							>Github</a
// 						>
  //                     </div>
// 				</div>
}

// Charger et afficher les livres au chargement de la page
window.onload = function () {

  loadXMLDoc("realisation.xml")
      .then(displayBooks)
      .catch(function (error) {
          console.error(error);
      });
  $("header.header").load("header.html");
	$("footer.footer").load("footer.html");
};