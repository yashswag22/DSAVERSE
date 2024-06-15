async function displayResult(resultElement, result) {
    for(var i=0;i<=5;i++){
    const titleElem = document.createElement('h3');
    titleElem.textContent = result.web.results[i].title;
    resultElement.appendChild(titleElem);

    // const descriptionElem = document.createElement('p');
    // descriptionElem.textContent = result.web.results[1].description || 'No description available';
    // resultElement.appendChild(descriptionElem);

    const urlElem = document.createElement('a');
    urlElem.textContent = result.web.results[i].url;
    urlElem.href = result.web.results[i].url;
    urlElem.target = '_blank';
    resultElement.appendChild(urlElem);
    }
}

function displaySearchResults(results, count) {
    const result1 = document.getElementById('result1');
    const result2 = document.getElementById('result2');
    const result3 = document.getElementById('result3');

     changeResult = true;

   
   
   

    console.log(count);
   

    if (count === 1) {
        result1.innerHTML = '';
        displayResult(result1, results);
    } else if (count === 2) {
        result2.innerHTML = '';
        displayResult(result2, results);
    } else if (count === 3) {
        result3.innerHTML = '';
        displayResult(result3, results);
    } else {
        console.log(`Count ${count} is not valid`);
    }
}

async function searchOnGoogle(query) {
    try {
        const response = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.web.results[1].title + " " + data.web.results[1].url);
        return data; // Return the data from the API
    } catch (error) {
        console.error('Error:', error);
        return null; // Return null on error
    }
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function performSearch() {
    const userInput = document.getElementById('userInput').value.trim();
    if (userInput === '') {
        alert('Please enter some text to search');
        return;
    }
    for(var i=1;i<=3;i++){
    var count ;
    var results;
    if(i=== 1){
    results= await searchOnGoogle(`${userInput} leetcode practice`);
    count =1;
    if (results) {
        displaySearchResults(results, count);
    } else {
        alert('Failed to fetch search results');
    }
    }
    if(i=== 2){
        results= await searchOnGoogle(`${userInput} geeksforgeeks`);
        count =2 ;
        if (results) {
            displaySearchResults(results, count);
        } else {
            alert('Failed to fetch search results');
        }
    }
        if(i=== 3){
            results= await searchOnGoogle(`${userInput} coding ninjas`);
            count =3;
            if (results) {
                displaySearchResults(results, count);
            } else {
                alert('Failed to fetch search results');
            }
            }
   
    await delay(1000);
 }
}

//document.getElementById('searchButton').onclick = performSearch();
