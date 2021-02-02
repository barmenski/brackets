module.exports = function check(str, bracketsConfig) {
  let stack = [];
  let openBr=[];
  let closeBr=[];
  let openIndex;
  let closeIndex;
  let strArr=[];
  let strSame=[];

  bracketsConfig.forEach(element => {
    openBr.push(element[0]);
    closeBr.push(element[1]);    
  });

  for(let i=0; i<=openBr.length-1; i++){
    if(openBr[i]===closeBr[i]){
      strSame.push(openBr[i]);
    }
  }
  
  if (strSame.length>0){
    for(let i=0; i<=closeBr.length-1; i++){
      for(let j=0; j<=strSame.length-1; j++){
        if(closeBr[i]===strSame[j]){
          closeBr[i]=String.fromCodePoint(65+i);
        }
      }
    }
    
    for(let i=0; i<str.length; i++){
      if(strSame.includes(str[i])){
        openIndex=openBr.indexOf(str[i]);
        if(openIndex===stack[stack.length-1]){
          strArr.push(closeBr[openIndex]);
          stack.pop();
        } else {
          strArr.push(str[i]);
          stack.push(openIndex);
        }                   
      } else {
        strArr.push(str[i]);
      }
    }
    str=strArr.join("");

  }

  for (let i = 0; i <str.length; i++) {
     openIndex = openBr.indexOf(str[i]);
     if (openIndex !== -1) {
         stack.push(openIndex);
         continue;
     }

     closeIndex = closeBr.indexOf(str[i]);
     if (closeIndex !== -1) {
         openIndex = stack.pop();
         if (closeIndex !== openIndex) {
             return false;
         }
     }
  }

  if (stack.length !== 0) {
      return false;
  }

  return true;
}
