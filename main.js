document.getElementById('scanButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file && file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = function(e) {
            const typedarray = new Uint8Array(e.target.result);
            scanDocument(typedarray);
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Por favor, sube un archivo PDF válido.');
    }
});

const scanDocument = (typedarray) => {
    pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
        let textContent = '';
        const numPages = pdf.numPages;

        const loadPageText = (pageNum) => {
            return pdf.getPage(pageNum).then(page => {
                return page.getTextContent().then(text => {
                    text.items.forEach(item => {
                        textContent += item.str + ' ';
                    });
                });
            });
        };

        const loadAllPages = () => {
            let promises = [];
            for (let i = 1; i <= numPages; i++) {
                promises.push(loadPageText(i));
            }
            return Promise.all(promises);
        };

        loadAllPages().then(() => {
            const keywords = ["En", "cumplimiento", "del", "régimen", "de", "protección", "de", "datos", "personales","AAAAAAAAAAAAAAAAAAAAAAAA"];
            const foundKeywords = findKeywords(textContent, keywords);
            displayResults(foundKeywords);
        });
    });
};

const findKeywords = (text, keywords) => {
    const foundKeywords = [];
    keywords.forEach(keyword => {
        if (text.includes(keyword)) {
            foundKeywords.push(keyword);
        }
    });
    return foundKeywords;
};

const displayResults = (foundKeywords) => {
    const resultsDiv = document.getElementById('results');
    if (foundKeywords.length > 0) {
        resultsDiv.innerHTML = 'Palabras clave encontradas: ' + foundKeywords.join(', ');
    } else {
        resultsDiv.innerHTML = 'No se encontraron palabras clave.';
    }
};
