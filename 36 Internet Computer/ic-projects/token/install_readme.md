# Installation 
## dfx.json 
dfx.json to have the following 
```
    "dfx": "0.9.3",`
```
## package.json 
package.json to have the following 
```
  "devDependencies": {
    "@dfinity/agent": "^0.10.4",
    "@dfinity/candid": "^0.10.4",
    "@dfinity/principal": "^0.10.4",
    ...
    "webpack-cli": "^4.10.0",    
  }
```
webpack-cli version 4.10.0 is necessary on Ubuntu22 LTS on WSL2.  
This was not needed to Ubuntu24 LTS native PC. 





