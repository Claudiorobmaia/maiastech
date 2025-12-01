
fetch("https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLib4gB-NB8nhx9YnFM4XxzQly0lUVi9Gtbb79jz3_6nB08JkVkKTqU5cTjCXqX7V5vkiN3UmftLX8VNMNTen6_ADVnHN3tfd60FOKGGhdh4fXtRoL_BK3vDyT7A-_ArRtOjrPMoSi4q6bKx0W5adR7FQurBdSgKh3LnHfQEnBDGWQ5mmTR2yb4rncUIbFoxAIHF2AWQUCVUyX9FuUV9_wiBJvPlgJeZ2VZMXQgr1TZxq0P6kL6HmMFQ_YqvT7QsCsLy2fWAwHoRLmiIACtjx0GXJxibsm3HSg_kxBE-&lib=Mv7EnEuUGMAiK1hBlhr26h8mSUAaZU9Z8")
  .then(r => r.json())
  .then(dados => console.log("RETORNO DA PLANILHA:", dados))
  .catch(err => console.log("ERRO:", err));


async function loadProducts() {
    const url = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLiO6Xn2q-OCzDuJ6f27u7OUiXaxdzpFmwp9XWbVhLEghHXUuHgkyqeZA7v1QmWLIh-BFasJzEAhH4xHp5eIczslfBRM-Jg0TYNUJov0nglSJ4l1neAFk5iYlgXDBD3-YGPf0rpxOHtkV6-jcFu-XrakJBTrzN-ECTp2hLGN8ZQLyih5aJY9XLxX3VsgJLc6b_6-NO7f-DfVbmPgmyEgUr-etU4zp-zqrlwzlk8VJtCAPK5YX_qcEDkDzBYu4eqa85Q6wi-eRtktOWt77iSXpxhgnDV4om-ndxMZJnqd&lib=Mv7EnEuUGMAiK1hBlhr26h8mSUAaZU9Z8";

    try {
        const response = await fetch(url);
        const dados = await response.json();

        console.log("RETORNO DA PLANILHA:", dados);

        // AQUI ESTÁ O ARRAY CORRETO
        return dados.saida;

    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        return [];
    }
}




// função para formatar o preço / format

function formatPrice(price) {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}



// criar os cards de produtos / create
function createProductCard(product) {

    return `
                <div class="product-card">
                        <img src="${product.image}" alt="${product.title}" class="product-image">
                            <h3 class="product-title">${product.title}</h3> 
                            <div class="product-price">${formatPrice(product.price)}</div>
                            <div class="product-discount">${product.discount}% Off</div> 
                </div>
            `

}

// colocar os produtos na tela / renderizar

function renderProduct(products) {
    const grid = document.getElementById('productsGrid')
    grid.innerHTML = products.map(createProductCard).join('')
    // innerHTML -- injetar o conteudo HTML dentro do elemento grid
    // map -- para cada produto, criar um card do produto, mapeiando a lista de produtos, pegando cada produto e criando um card
    // join('') -- juntar todos os cards em uma unica string
}

function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase()

    const filteredProducts = products.filter(products => products.title.toLowerCase().includes(searchInput))
    renderProduct(filteredProducts)

    // filter -- filtrar a lista de produtos 
    // includes -- verificar se o titulo do produto inclui o texto digitado no input de busca
}

document.addEventListener('DOMContentLoaded', async () => {

    // Carrega produtos da planilha
    window.products = await loadProducts();

    // Exibe os produtos na tela
    renderProduct(products);

    // Botão de busca
    document.getElementById('searchBtn').addEventListener('click', searchProducts);
});
