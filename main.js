var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/pets-data.json');
ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
        // This is where we'll do something with the retrieved data
        var data = ourRequest.responseText;
       // data.replace(/}([^}]*)$/,'$1')
        var pos = data.lastIndexOf('}');
        data = data.substring(0,pos)
        console.log(data);

        data += ', "a": {"pets": 123}} ';
        console.log(data);
        data = JSON.parse(data);

        console.log("hi");
        createHTML(data);
    } else {
        console.log("We connected to the server, but it returned an error.");
    }
};

ourRequest.onerror = function() {
    console.log("Connection error");
};

ourRequest.send();

Handlebars.registerHelper("calculateAge", function (birthYear) {
   var age = new Date().getFullYear() - birthYear;
   return age > 0 ? age+' years old':"less than a year old";
});

function createHTML(petsData) {
    //loop through array 'pets'
    var rawTemplate = document.getElementById('petsTemplate').innerHTML;//access template content
    var compiledTemplate = Handlebars.compile(rawTemplate);//is a template function
    var ourGeneratedHTML = compiledTemplate(petsData);//return string of HTML

    var petsContainer = document.getElementById('pets-container');
    petsContainer.innerHTML = ourGeneratedHTML;
}