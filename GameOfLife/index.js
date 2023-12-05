// console.log("Hello Node");

// OS module

// var os = require("os")

// var message = "This platform is  "

// function main(){
     
//    console.log( message +   os.platform());
        
// }

// main()


////FS MODULE

var fs = require('fs');
var dummyText = "Apple yep";

function main() {
   fs.writeFileSync("dummytext.txt", dummyText);
   var text = fs.readFileSync("dummytext.txt").toString();
   console.log(dummyText == text);
   console.log(text);
   fs.writeFileSync("undummytext.txt",
       text.replace("Apple", "Microsoft")
   );
}
main();