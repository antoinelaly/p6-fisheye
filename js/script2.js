var count = document.querySelector(".out");
//const url = "https://raw.githubusercontent.com/aZolo77/citiesBase/master/cities.json";
const url = "https://choisirsontheme.com/formation/ocr/p6-fisheye-fetch/js/fisheyedatafr.json";
//const url = "https://github.com/antoinelaly/p6-fisheye/blob/main/js/fisheyedatafr.json";
//const url = "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json";

fetch(url)
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