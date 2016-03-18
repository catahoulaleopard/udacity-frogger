function Person(lastName, firstName){ 

  this.lastName = lastName; 

  this.firstName = firstName; 

} 

// define our Book() constructor 

function Book(title, pages, price){ 

  this.title = title; 

  this.pages = pages; 

  this.price = price; 

  this.authors = new Array(arguments.length-3); 

  for(i=0;i<arguments.length-3;i++){ 

    this.authors[i] = arguments[i+3]; 

  } 

} 

//define our Library() constructor 

function Library(){ 

  this.books = new Array(arguments.length); 

  for(i=0;i<arguments.length;i++){ 

    this.books[i] = arguments[i]; 

  } 

   

  this.totalPrice = function(){ 

    var totalCost = new Number(0); 

    for(i=0;i<this.books.length;i++){ 

      totalCost += this.books[i].price; 

    } 

  return totalCost; 

  } 

   

  this.averagePrice = new Function("return  

this.totalPrice()/this.books.length"); 

   

  this.addBook = new  

Function("book","this.books.push(book)"); 

   

  this.getAuthors = function(){ 

    var toSay = "Your favorite authors are:n"; 

    for i=0;i<this.books.length;i++){ 

      for(j=0;j<this.books[i].authors.length;j++){ 

        var authName =  

        this.books[i].authors[j].firstName + " " +  

        this.books[i].authors[j].lastName; 

        if(toSay.indexOf(authName)!=- 

1)continue; 

        toSay+="nt"+authName; 

      } 

    } 

  return toSay; 

  } 

} 

// create some Person objects 

DnnyGdmn = new Person("Goodman","Danny"); 

DvdFlngn = new Person("Flanagan","David"); 

TmMyrs = new Person("Myers","Tom"); 

AlxNkmvsky = new Person("Nakhimovsky","Alexander"); 

// create some Book objects 

  JavaNut = new Book("Java Foundation Classes in a  

Nutshell",731,29.95,DvdFlngn); 

  JSTDR = new Book("Javascript: The Definitive Guide (3rd 

Edition)",776,39.95,DvdFlngn); 

  JSBible = new Book("Javascript Bible, 4th  

Edition",1200,49.99,DnnyGdmn); 

  DHTMLTDR = new Book("Dynamic Html: The Definitive  

Reference",1073,44.95,DnnyGdmn); 

  JSObj = new Book("JavaScript 

Objects",450,39.99,TmMyrs,AlxNkmvsky); 

// create a Library object 

myLib = new Library(JavaNut,JSTDR,JSBible,DHTMLTDR);