module.exports.dateParser = date => {
    let newDate = new Date(date).toLocaleDateString('fr-FR', {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    })
    newDate = newDate.split("/")
    newDate = `${newDate[2]}-${newDate[1]}-${newDate[0]}`
    return newDate;
}
// foire la somme des champs d'un tableau
module.exports.somTable = (elements, champ) => {
    let result = 0;
    elements.forEach(element => {
        isNaN(parseInt(element[champ])) ? element[champ] = 0 :
            result += element[champ];
    });
    return result;
}
// THEME APPLICATION {DARK - LIGHT}
module.exports.darkTheme = () => {
    document.documentElement.style.setProperty('--background', '#1d1e24')
    document.documentElement.style.setProperty('--backgroundWhite', '#27282f')
    document.documentElement.style.setProperty('--primary', '#3b3b3b')
    document.documentElement.style.setProperty('--ecriture', '#e9e9e9')
    localStorage.setItem("theme", "dark")
}
module.exports.lightTheme = () => {
    document.documentElement.style.setProperty('--background', '#eff5ff')
    document.documentElement.style.setProperty('--backgroundWhite', '#ffffff')
    document.documentElement.style.setProperty('--primary', '#247BA0')
    document.documentElement.style.setProperty('--ecriture', '#131523')
    localStorage.setItem("theme", "light")
}

module.exports.paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

module.exports.monaie = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    maximumFractionDigits: 2,
})

module.exports.getPeriode = (selected) => {
    switch (selected) {
        case 1: return "du 16 fevrier au 15 mars";
        case 2: return "du 16 mars au 15 avril";
        case 3: return "du 16 avril au 15 mai";
        case 4: return "du 16 mai au 15 juin";
        case 5: return "du 16 juin au 15 juillet";
        case 6: return "du 16 juillet au 15 aougt";
        case 7: return "du 16 aougt au 15 septembre";
        case 8: return "du 16 septembre au 15 octobre";
        case 9: return "du 16 octobre au 15 novembre";
        case 10: return "du 16 novembre au 15 descembre";
        case 11: return "du 16 descembre au 15 janvier";
        case 12: return "du 16 janvier au 15 fevrier";
        default:
            return "période invalide !"
    }
}

module.exports.submitAllInputs = (classInputs) => {
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            document.querySelectorAll(classInputs).forEach(element => {
                element.click();
            });
        }
    });
}
