import dbWeb from "./connect-web";
import dbE2E from "./connect-e2e";

let db;

if(process.env.E2E_TEST){
    db = dbWeb;
}else{
    db = dbE2E;
}    

export default db;
