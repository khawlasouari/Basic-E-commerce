const produits = [
    { 
        id: 1, 
        name: "Vase Organique Terracotta", 
        category: "deco", 
        price: 95.00, 
        promo: "-20%", 
        image: "https://tse1.mm.bing.net/th/id/OIP.J4m_mOCTjanpZiw2llyDwgHaHb?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", 
        desc: "Céramique modelée à la main, finition mate pour la décoration intérieure." 
    },
    { 
        id: 2, 
        name: "Bougeoir Artisanal en Bois", 
        category: "deco", 
        price: 45.00, 
        promo: null, 
        image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80", 
        desc: "Support à bougie sculpté dans du bois d'olivier naturel." 
    },
    { 
        id: 3, 
        name: "Assiettes en Céramique Peintes", 
        category: "deco", 
        price: 80.00, 
        promo: "-10%", 
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80", 
        desc: "Lot d'assiettes artisanales façonnées et peintes à la main." 
    },-
    { 
        id: 4, 
        name: "Collier Berbère Argenté", 
        category: "bijoux", 
        price: 135.00, 
        promo: null, 
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80", 
        desc: "Pendentif ciselé selon la tradition ancestrale, en argent pur." 
    },
    { 
        id: 5, 
        name: "Bague Artisanal en Or", 
        category: "bijoux", 
        price: 175.00, 
        promo: "-15%", 
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80", 
        desc: "Bague élégante confectionnée en fil d'or martelé à la main." 
    },
    { 
        id: 6, 
        name: "Bracelet Ethnique Gravé", 
        category: "bijoux", 
        price: 90.00, 
        promo: null, 
        image: "https://i.etsystatic.com/25940181/r/il/956f8c/6565688443/il_1080xN.6565688443_eyya.jpg", 
        desc: "Bracelet ouvert en argent massif agrémenté de motifs traditionnels." 
    },
    { 
        id: 7, 
        name: "Cabas en Fibres Naturelles", 
        category: "accessoires", 
        price: 65.00, 
        promo: "-15%", 
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80", 
        desc: "Sac tressé à la main, résistant et idéal comme accessoire éco-responsable." 
    },
    { 
        id: 8, 
        name: "Pochette en Cuir Artisanal", 
        category: "accessoires", 
        price: 55.00, 
        promo: null, 
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80", 
        desc: "Pochette cousue à la main en cuir véritable pleine fleur." 
    },
    { 
        id: 9, 
        name: "Écharpe en Laine Tissée", 
        category: "accessoires", 
        price: 70.00, 
        promo: "-10%", 
        image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=600&q=80", 
        desc: "Écharpe chaude tissée sur métier à tisser traditionnel." 
    }
];

let panier = [];
let remise = 0;
let produitSelectionne = null;

let slideActuelle = 0;
const slides = document.querySelectorAll('.slide');

function slideSuivante() {
    if (slides.length > 0) {
        slides[slideActuelle].classList.remove('active');
        slideActuelle = (slideActuelle + 1) % slides.length;
        slides[slideActuelle].classList.add('active');
    }
}
setInterval(slideSuivante, 5000);

// GÉNÉRATION HTML DES PRODUITS
function genererHTMLProduits(liste) {
    return liste.map(p => `
        <div class="product-card">
            ${p.promo ? `<span class="badge-promo">PROMO ${p.promo}</span>` : ''}
            <img src="${p.image}" alt="${p.name}" onclick="ouvrirModaleProduit(${p.id})" onerror="this.onerror=null;this.src='https://via.placeholder.com/500x300?text=Produit+Artisanal';">
            <div class="product-body">
                <h3 class="product-title" onclick="ouvrirModaleProduit(${p.id})">${p.name}</h3>
                <div class="product-price">${p.price.toFixed(2)} DT</div>
                <button class="btn-primary" style="width:100%; border:none; cursor:pointer;" onclick="ajouterAuPanier(${p.id})">Ajouter au Panier</button>
            </div>
        </div>
    `).join('');
}
function afficherAccueil() {
    document.getElementById("accueil").style.display = "flex";
    document.getElementById("section-categories").style.display = "block";
    document.getElementById("accueil-populaires").style.display = "block";
    document.getElementById("boutique").style.display = "none";
    
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if(event && event.target) event.target.classList.add('active');
}
function afficherBoutique() {
    document.getElementById("accueil").style.display = "none";
    document.getElementById("section-categories").style.display = "none";
    document.getElementById("accueil-populaires").style.display = "none";
    document.getElementById("boutique").style.display = "block";

    document.getElementById("search-input").value = "";
    document.getElementById("category-filter").value = "tous";
    document.getElementById("price-range").value = 200;
    document.getElementById("price-output").innerText = "200";
    
    appliquerFiltres();

    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if(event && event.target) {
        event.target.classList.add('active');
    }
}
////filtrage par categorie 
function filtrerParCategorieRapide(cat) {
    afficherBoutique();
    document.getElementById("category-filter").value = cat;
    appliquerFiltres();
}
/////filtrage par  prix mn mt3 range
function mettreAJourPrixMax() {
    const val = document.getElementById("price-range").value;
    document.getElementById("price-output").innerText = val;
}
////taml filtrage 3al kol 7assb les donnes  category wel prix
function appliquerFiltres() {
    const recherche = document.getElementById("search-input").value.toLowerCase();
    const categorie = document.getElementById("category-filter").value;
    const prixMax = parseFloat(document.getElementById("price-range").value);

    const resultats = produits.filter(p => {
        const correspondNom = p.name.toLowerCase().includes(recherche) || p.desc.toLowerCase().includes(recherche);
        const correspondCat = (categorie === "tous" || p.category === categorie);
        const correspondPrix = p.price <= prixMax;

        return correspondNom && correspondCat && correspondPrix;
    });

    const grille = document.getElementById("products-grid");
    if (resultats.length === 0) {
        grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #888;'>Aucun produit ne correspond à votre recherche.</p>";
    } else {
        grille.innerHTML = genererHTMLProduits(resultats);
    }
}

function ouvrirModaleProduit(id) {
    produitSelectionne = produits.find(p => p.id === id);
    document.getElementById("modal-img").src = produitSelectionne.image;
    document.getElementById("modal-title").innerText = produitSelectionne.name;
    document.getElementById("modal-price").innerText = produitSelectionne.price.toFixed(2) + " DT";
    document.getElementById("modal-desc").innerText = produitSelectionne.desc;
    document.getElementById("product-modal").style.display = "flex";
}

function fermerModaleProduit() { 
    document.getElementById("product-modal").style.display = "none"; 
}

function ajouterAuPanier(id, quantite = 1) {
    const element = panier.find(i => i.id === id);
    if(element) {
        element.qty += quantite;
    } else {
        const p = produits.find(x => x.id === id);
        panier.push({ ...p, qty: quantite });
    }
    mettreAJourPanier();
}

function ajouterAuPanierDepuisModale() {
    ajouterAuPanier(produitSelectionne.id, parseInt(document.getElementById("modal-qty").value));
    fermerModaleProduit();
}

function mettreAJourPanier() {
    const conteneur = document.getElementById("cart-items");
    let total = 0, nombreArticles = 0;
    conteneur.innerHTML = panier.length === 0 ? "Votre panier est vide." : "";
    panier.forEach(i => {
        total += i.price * i.qty;
        nombreArticles += i.qty;
        conteneur.innerHTML += `<div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px dashed #ddd; padding-bottom:5px;"><span>${i.name} (x${i.qty})</span><strong>${(i.price*i.qty).toFixed(2)} DT</strong></div>`;
    });
    total -= total * remise;
    document.getElementById("cart-total").innerText = total.toFixed(2) + " DT";
    document.getElementById("cart-count").innerText = nombreArticles;
}

function appliquerCodePromo() {
    if(document.getElementById("promo-input").value.toUpperCase() === "ARTISAN10") {
        remise = 0.10; 
        alert("10% de réduction appliquée !");
    } else { 
        alert("Code invalide"); 
        remise = 0; 
    }
    mettreAJourPanier();
}

function basculerAffichagePanier() { 
    document.getElementById("cart-drawer").classList.toggle("open"); 
}


function ouvrirPaiement() {
    if(panier.length === 0) return alert("Panier vide");
    document.getElementById("checkout-total").innerText = document.getElementById("cart-total").innerText;
    document.getElementById("checkout-modal").style.display = "flex";
    document.getElementById("payment-method").value = "card";
    basculerChampsCarteBancaire();
}

function fermerPaiement() { 
    document.getElementById("checkout-modal").style.display = "none"; 
}

function validerCommande(e) {
    e.preventDefault(); 
    alert("Commande validée avec succès !");
    panier = []; 
    remise = 0; 
    mettreAJourPanier(); 
    fermerPaiement(); 
    basculerAffichagePanier();
}

function basculerChampsCarteBancaire() {
    const modePaiement = document.getElementById("payment-method").value;
    const champsCarte = document.getElementById("card-fields");
    const numeroCarte = document.getElementById("card-number");
    const dateExpiration = document.getElementById("card-exp");
    const codeCvv = document.getElementById("card-cvv");

    if (modePaiement === "card") {
        champsCarte.classList.remove("hidden");
        numeroCarte.setAttribute("required", "true");
        dateExpiration.setAttribute("required", "true");
        codeCvv.setAttribute("required", "true");
    } else {
        champsCarte.classList.add("hidden");
        numeroCarte.removeAttribute("required");
        dateExpiration.removeAttribute("required");
        codeCvv.removeAttribute("required");
    }
}

function publierAvisClient(e) {
    e.preventDefault();
    const nom = document.getElementById("review-name").value;
    const note = document.getElementById("review-rating").value;
    const commentaire = document.getElementById("review-text").value;

    const listeAvis = document.getElementById("reviews-list");
    listeAvis.innerHTML = `
        <div class="review-item" style="background: #faf8f5; padding: 10px 15px; border-radius: 6px; margin-bottom: 10px;">
            <div style="font-weight: bold; font-size: 14px;">${nom} <span style="color: #f39c12;">${note}</span></div>
            <p style="font-size: 13px; color: #555; margin-top: 4px;">${commentaire}</p>
        </div>
    ` + listeAvis.innerHTML;

    document.getElementById("review-name").value = "";
    document.getElementById("review-text").value = "";
    alert("Merci ! Votre avis a été publié avec succès.");
}

document.addEventListener("DOMContentLoaded", () => {
    const grillePopulaire = document.getElementById("popular-products-grid");
    if (grillePopulaire) {
        grillePopulaire.innerHTML = genererHTMLProduits(produits.slice(0, 4));
    }
});