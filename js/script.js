var count = document.querySelector(".out");

fetch('https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json')
.then(response => {
  return response.json();
}).then(data => {
  let out="";
  for(key in data){
    data[key].forEach(function (el){
      out+=`<li> ${el.name} </li>`
    })
  } 
 count.innerHTML = out;
}).catch(err => {
  console.log('Fetch Error :-S', err);
});