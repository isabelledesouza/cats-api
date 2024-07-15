console.log("hello")
const apiKey = "live_u7sHInO46sBqedNjiU6wrvCRWTppub7rDtzMDFF1YmzUIR2TQDGLTK2V6eR0uVwt";
const URL = 'https://api.thecatapi.com/v1/images/search?limit=3';
const URL_FAVOURITIES = 'https://api.thecatapi.com/v1/favourites';
const button = document.getElementById('random'); 
async function getImage() {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');

    try {
        const response = await fetch(URL,{
            headers: {
                'x-api-key': apiKey
            }
        });
        const data = await  response.json();
        console.log(data);
        img1.src = data[0].url;
        img1.parentElement.querySelector(".save-favourites").dataset.id = data[0].id;
        img2.src = data[1].url;
        img2.parentElement.querySelector(".save-favourites").dataset.id = data[1].id;

        
    }catch(error) {
        console.error('Error al cargar la imagen del gato:', error);
    }
}

async function getFavouritesCats () {
    const img3 = document.getElementById('img3');
   

    try {
        const response = await fetch(URL_FAVOURITIES ,{
            headers: {
                'x-api-key': apiKey
            }
        });
        const data = await  response.json();
        console.log(data.length)
        if (data.length) {
            const section = document.getElementById("favoritesMichis");
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('voy entender');
            img3.src = data[0].image.url;
            section.appendChild(img);
            section.appendChild(btn);
            btn.appendChild(btnText); 
        }
       
        
    }catch(error) {
        console.error('Error al cargar la imagen del gato:', error);
    }
}

async function saveFavouritesCats (e) {
    console.log(e)
    const img3 = document.getElementById('img3');
    var rawBody = JSON.stringify({ 
        "image_id": e.target.dataset.id,
        "sub_id": "isa"
         });

    try {
        const response = await fetch(URL_FAVOURITIES,{
            method: 'POST',
            headers: {
                "content-type":"application/json",
                'x-api-key': apiKey
            },
            body: rawBody
        });
        console.log("este", rawBody)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`${response.status} ${response.statusText}: ${errorData.message}`);
        }
        const data = await response.json();
        console.log('Imagen guardada como favorita:', data);
        } catch (error) {
        console.log('Error al guardar la imagen favorita del gato:', error);
        }}
      
        /*const data = await  response.json();
        if (data.message == "SUCCESS") {
            // muestras mensaje de guardado
        } else {
            // muestras mensaje de error
        }
    }catch(error){
        console.error('Error al cargar la imagen del gato:',error);
    }
}*/

document.addEventListener("DOMContentLoaded", () => {
   
    const buttonGetFav = document.getElementById("get-favourites");
    const buttonsSaveFav = document.querySelectorAll('.save-favourites');
    /*button.addEventListener("click", getImage);*/
    buttonGetFav.addEventListener("click", getFavouritesCats);
    buttonsSaveFav.forEach(btn => btn.addEventListener("click", saveFavouritesCats));
    
   getImage();
   
})
// saveFavouritesCats ()
/*fetch(URL)
.then(response=> response.json())
.then (data => {
    const img = document.querySelector('img');
    img.src = data[0].url;
});*/
