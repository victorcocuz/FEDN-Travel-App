var Client=function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";e.exports=n(2)},function(e,t){const n=new Date,a=[];for(let e=0;e<2;e++)a[e]=document.querySelector(".calendar-month-current-"+e),window.addEventListener("load",()=>{document.querySelector(".logo").src=Client.logo,a[e].setAttribute("data-year",n.getFullYear()),a[e].setAttribute("data-month",n.getMonth()),r(Client.CURRENT,e)}),document.querySelector(".calendar-month-previous-"+e).addEventListener("click",()=>{r(Client.PREVIOUS,e)}),document.querySelector(".calendar-month-next-"+e).addEventListener("click",()=>{r(Client.NEXT,e)}),document.querySelector("#calendar-"+e).addEventListener("click",t=>{document.querySelector(".selected-"+e)&&document.querySelector(".selected-"+e).classList.remove("selected-"+e);const n=document.querySelector("#date-"+e),a=t.target;a.classList.add("selected-"+e),n.setAttribute("day-"+e,a.getAttribute("data-day")),n.setAttribute("month-"+e,a.getAttribute("data-month")),n.setAttribute("year-"+e,a.getAttribute("data-year"))});function r(e,t){Client.loadCalendar(parseInt(a[t].getAttribute("data-year")),parseInt(a[t].getAttribute("data-month")),e,t)}document.querySelector("#town-submit").addEventListener("click",e=>{e.preventDefault();const t={town:document.querySelector("#town").value,startDay:document.querySelector("#date-0").getAttribute("day-0"),startMonth:document.querySelector("#date-0").getAttribute("month-0"),startYear:document.querySelector("#date-0").getAttribute("year-0"),endDay:document.querySelector("#date-1").getAttribute("day-1"),endMonth:document.querySelector("#date-1").getAttribute("month-1"),endYear:document.querySelector("#date-1").getAttribute("year-1")};Client.validateTown(t.town)&&Client.validateDates(t)&&(async()=>{let e=await o("/getLocation",t.town);Client.updateLocation(e);const n=Client.filterStartDateForWeather(t),a=Client.filterEndDateForWeather(t),r={lat:e.lat,lng:e.lng,startDay:t.startDay,startMonth:parseInt(t.startMonth)+1,startyear:t.startYear,endDay:t.endDay,endMonth:parseInt(t.endMonth)+1,endYear:t.endYear};let d;n<16&&(d=await o("/getWeatherDaily",r));let c=await o("/getWeatherNormal",r);Client.updateWeather(d,c,n,a);let i=await o("/getPhotos",t.town);Client.updatePhotos(i)})()});const o=async(e,t)=>{const n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({data:t})});try{return await n.json()}catch(e){console.log("error",e)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Calendar=function(){function e(e){var t=void 0===e?{}:e,n=t.startDate,a=t.endDate,r=void 0===a?null:a,o=t.siblingMonths,d=void 0!==o&&o,c=t.weekNumbers,i=void 0!==c&&c,s=t.weekStart,u=void 0===s?0:s;this.startDate=void 0===n?null:n,this.endDate=r,this.siblingMonths=d,this.weekNumbers=i,this.weekStart=u}var t=e.prototype;return t.getCalendar=function(t,n){var a=new Date(Date.UTC(t,n,1,0,0,0,0));t=a.getUTCFullYear(),n=a.getUTCMonth();for(var r,o,d,c,i=[],s=a.getUTCDay(),u=-(7-this.weekStart+s)%7,l=e.daysInMonth(t,n),f=(l-u)%7,h=e.daysInMonth(t,n-1),p=u,y=!1,m=null,g=l-p+(0!==f?7-f:0)+u;p<g;)r=((p<1?7+p:p)+s)%7,(o=p+1)<1||o>l?this.siblingMonths?(o<1?(c=t,(d=n-1)<0&&(d=11,c--),o=h+o):o>l&&(c=t,(d=n+1)>11&&(d=0,c++),o=p-l+1),void 0!==d&&void 0!==c&&(y={day:o,weekDay:r,month:d,year:c,siblingMonth:!0})):y=!1:y={day:o,weekDay:r,month:n,year:t},y&&this.weekNumbers&&(null===m?m=e.calculateWeekNumber(y):1===r&&52===m?m=1:1===r&&m++,y.weekNumber=m),y&&this.startDate&&(y.selected=this.isDateSelected(y)),i.push(y),p++;return i},t.isDateSelected=function(e){return!(!this.startDate||(e.year!==this.startDate.year||e.month!==this.startDate.month||e.day!==this.startDate.day)&&(!this.endDate||e.year===this.startDate.year&&e.month===this.startDate.month&&e.day<this.startDate.day||e.year===this.endDate.year&&e.month===this.endDate.month&&e.day>this.endDate.day||e.year===this.startDate.year&&e.month<this.startDate.month||e.year===this.endDate.year&&e.month>this.endDate.month||e.year<this.startDate.year||e.year>this.endDate.year))},t.setStartDate=function(e){this.startDate=e},t.setEndDate=function(e){this.endDate=e},t.setDate=function(e){return this.setStartDate(e)},e.diff=function(e,t){var n=new Date(Date.UTC(e.year,e.month,e.day,0,0,0,0)),a=new Date(Date.UTC(t.year,t.month,t.day,0,0,0,0));return Math.ceil((n.getTime()-a.getTime())/864e5)},e.interval=function(t,n){return Math.abs(e.diff(t,n))+1},e.compare=function(e,t){if("object"!=typeof e||"object"!=typeof t||null===e||null===t)throw new TypeError("dates must be objects");return e.year<t.year?-1:e.year>t.year?1:e.month<t.month?-1:e.month>t.month?1:e.day<t.day?-1:e.day>t.day?1:0},e.daysInMonth=function(e,t){return new Date(e,t+1,0).getDate()},e.isLeapYear=function(e){return e%4==0&&e%100!=0||e%400==0},e.calculateWeekNumber=function(e){var t=new Date(Date.UTC(e.year,e.month,e.day,0,0,0,0)),n=new Date(t.valueOf()),a=(t.getUTCDay()+6)%7;n.setUTCDate(n.getUTCDate()-a+3);var r=n.valueOf();return n.setUTCMonth(0,1),4!==n.getUTCDay()&&n.setUTCMonth(0,1+(4-n.getUTCDay()+7)%7),1+Math.ceil((r-n.getTime())/6048e5)},e}()},function(e,t,n){},function(e,t,n){"use strict";n.r(t),n.d(t,"removeCalendar",(function(){return r})),n.d(t,"loadCalendar",(function(){return a})),n.d(t,"validateTown",(function(){return s})),n.d(t,"validateDates",(function(){return u})),n.d(t,"filterStartDateForWeather",(function(){return l})),n.d(t,"filterEndDateForWeather",(function(){return f})),n.d(t,"updateLocation",(function(){return h})),n.d(t,"updateWeather",(function(){return p})),n.d(t,"updatePhotos",(function(){return y})),n.d(t,"formatDay",(function(){return w})),n.d(t,"Calendar",(function(){return g})),n.d(t,"months",(function(){return b})),n.d(t,"days",(function(){return C})),n.d(t,"PREVIOUS",(function(){return D})),n.d(t,"CURRENT",(function(){return S})),n.d(t,"NEXT",(function(){return v})),n.d(t,"logo",(function(){return M})),n.d(t,"icons",(function(){return _}));n(1);function a(e,t,n,a){const r=new Client.Calendar({siblingMonths:!0,weekStart:!0});Client.removeCalendar(a);let d,c,i=t+n;switch(d=i-1,c=i+1,i){case-1:i=11,d=i-1,e+=n;break;case 0:d=11;break;case 11:c=0;break;case 12:i=0,c=i+1,e+=n}const s=document.querySelector(".calendar-month-previous-"+a),u=document.querySelector(".calendar-month-current-"+a),l=document.querySelector(".calendar-month-next-"+a);s.textContent=Client.months[d],u.textContent=`${Client.months[i]} ${e}`,u.setAttribute("data-month",i),u.setAttribute("data-year",e),l.textContent=Client.months[c];const f=document.createDocumentFragment();for(const e of Client.days){const t=document.createElement("li");t.className="calendar-week-day",t.innerText=e,f.appendChild(t)}const h=r.getCalendar(e,i).length;28==h&&o(f,r,e,i,Client.PREVIOUS),o(f,r,e,i,Client.CURRENT),h<42&&o(f,r,e,i,Client.NEXT);document.querySelector(".calendar-days-"+a).appendChild(f)}function r(e){document.querySelector(".calendar-days-"+e).innerHTML=""}function o(e,t,n,a,r){const o=t.getCalendar(n,a+r);let c,i;switch(r){case Client.PREVIOUS:c=o.length-7,i=o.length;break;case Client.CURRENT:c=0,i=o.length;break;case Client.NEXT:o[0].siblingMonth?(c=7,i=14):(c=0,i=7)}for(let t=c;t<i;t++)o[t]&&e.appendChild(d(o[t],r))}function d(e,t){const n=document.createElement("li");return t==Client.PREVIOUS||t==Client.NEXT||e.siblingMonth?n.className="calendar-day sibling-month":n.className="calendar-day",n.setAttribute("data-day",e.day),n.setAttribute("data-month",e.month),n.setAttribute("data-year",e.year),n.innerHTML=e.day,n}var c=n(0);const i=new Date;function s(e){return!!e||(alert("No location has been provided"),!1)}function u(e){return e.startYear&&e.startMonth&&e.startDay&&e.endYear&&e.endMonth&&e.endDay?c.Calendar.diff({year:e.startYear,month:e.startMonth,day:e.startDay},{year:i.getFullYear(),month:i.getMonth(),day:i.getDate()})<0?(alert("Start date of your trip cannot be in the past!"),!1):!(c.Calendar.diff({year:e.endYear,month:e.endMonth,day:e.endDay},{year:e.startYear,month:e.startMonth,day:e.startDay})<1)||(alert("End date of your trip cannot be before the trip begins!"),!1):(alert("Trip dates are incomplete"),!1)}function l(e){return c.Calendar.diff({year:e.startYear,month:e.startMonth,day:e.startDay},{year:i.getFullYear(),month:i.getMonth(),day:i.getDate()})}function f(e){return c.Calendar.diff({year:e.endYear,month:e.endMonth,day:e.endDay},{year:i.getFullYear(),month:i.getMonth(),day:i.getDate()})}function h(e){document.querySelector("#trip-location").innerHTML="";const t=document.createDocumentFragment();["City: "+e.toponymName,"Country: "+e.countryName,"Country Code: "+e.countryCode,"Population: "+e.population,"Latitude: "+e.lat,"Longitude: "+e.lng].forEach(e=>{const n=document.createElement("li");n.className="trip-location-details",n.innerText=e,t.appendChild(n)}),document.querySelector("#trip-location").appendChild(t)}function p(e,t,n,a){const r=document.querySelector("#trip-weather");r.innerHTML="";const o=document.createDocumentFragment();if(n<16){for(let t=n;t<Math.min(a,16);t++){const n=m(e,t,!0);o.appendChild(n)}if(a>=16)for(let e=16-n;e<t.length;e++){const n=m(t,e,!1);o.appendChild(n)}}else for(let e=0;e<t.length;e++){const n=m(t,e,!1);o.appendChild(n)}r.appendChild(o)}function y(e){const t=document.querySelector("#trip-photos");t.innerHTML="";const n=document.createDocumentFragment();for(const t of e){const e=document.createElement("img");e.src=t,n.appendChild(e)}t.appendChild(n)}function m(e,t,n){const a=Client.icons,r=document.createElement("div");r.classList.add("weather-card");const o=document.createElement("div");o.classList.add("weather-month"),o.textContent=n?`${Client.months[parseInt(e[t].datetime.split("-")[1])-1]} ${Client.formatDay(parseInt(e[t].datetime.split("-")[2]))}`:`${Client.months[parseInt(e[t].month)-1]} ${Client.formatDay(parseInt(e[t].day))}`,r.appendChild(o);const d=document.createElement("img");d.classList.add("weather-icon");const c=document.createElement("div");c.classList.add("weather-description"),n?(d.src=a["icon_"+e[t].weather.icon],d.alt=e[t].weather.description,c.textContent=e[t].weather.description):(d.src=a.icon_c02d,d.alt="Not Applicable",c.textContent="Historic Data"),r.appendChild(d),r.appendChild(c);const i=document.createElement("div");i.classList.add("weather-temp"),i.textContent=`${e[t].temp}${String.fromCharCode(176)}C`,r.appendChild(i);const s=document.createElement("div");return s.classList.add("weather-temp-range"),s.textContent=`${e[t].min_temp}${String.fromCharCode(176)}C - ${e[t].max_temp}${String.fromCharCode(176)}C`,r.appendChild(s),r}const g=n(0).Calendar,b=["January","February","March","April","May","June","July","August","September","October","November","December"],C=["Mo","Tu","We","Th","Fr","Sa","Su"],D=-1,S=0,v=1;function w(e){switch(e%10){case 1:return"11"==e?e+"th":e+"st";case 2:return e+"nd";case 3:return e+"rd";default:return e+"th"}}n(3);var M=n.p+"ca8a26657aed75695d9d08e51ca30a58.png";const _={icon_a01d:n.p+"10081789f5c47348c79fa1eadb45ca57.png",icon_a02d:n.p+"10081789f5c47348c79fa1eadb45ca57.png",icon_a03d:n.p+"10081789f5c47348c79fa1eadb45ca57.png",icon_a04d:n.p+"10081789f5c47348c79fa1eadb45ca57.png",icon_a05d:n.p+"10081789f5c47348c79fa1eadb45ca57.png",icon_a06d:n.p+"10081789f5c47348c79fa1eadb45ca57.png",icon_c01d:n.p+"cff6171132681d28b012241763a0bc3c.png",icon_c02d:n.p+"0f94bab2b608227e7d2a58fe8009a709.png",icon_c03d:n.p+"f8eab722312a2de3de8a3d465f5e3543.png",icon_c04d:n.p+"43f7e0039e2b460b85b0843ec68fd2d3.png",icon_d01d:n.p+"741efb5074d38dfd01d8a51a0b614095.png",icon_d02d:n.p+"741efb5074d38dfd01d8a51a0b614095.png",icon_d03d:n.p+"741efb5074d38dfd01d8a51a0b614095.png",icon_f01d:n.p+"a2cde58ee4d7c9efffcc0428973a0946.png",icon_r01d:n.p+"a2cde58ee4d7c9efffcc0428973a0946.png",icon_r02d:n.p+"a2cde58ee4d7c9efffcc0428973a0946.png",icon_r03d:n.p+"7260db34116db68575029b7bfa2ddd3f.png",icon_r04d:n.p+"a2cde58ee4d7c9efffcc0428973a0946.png",icon_r05d:n.p+"f6f9ae9fd3afc44ee528db41049cb7cf.png",icon_r06d:n.p+"a2cde58ee4d7c9efffcc0428973a0946.png",icon_s01d:n.p+"e0b5680372f5a2ab532a62e9df957103.png",icon_s02d:n.p+"c2487408ae0e41b69276d681cb9e2f44.png",icon_s03d:n.p+"c2487408ae0e41b69276d681cb9e2f44.png",icon_s04d:n.p+"e0b5680372f5a2ab532a62e9df957103.png",icon_s05d:n.p+"98c29fd334d729fcc1760baf1a4ae2b5.png",icon_s06d:n.p+"fe370b91e79f770e81eabf65311189cc.png",icon_t01d:n.p+"4c539116631c34634df8ec21565459e1.png",icon_t02d:n.p+"4c539116631c34634df8ec21565459e1.png",icon_t03d:n.p+"4c539116631c34634df8ec21565459e1.png",icon_t04d:n.p+"d33e53113f4985752ea3cb3a7670df0f.png",icon_t05d:n.p+"d33e53113f4985752ea3cb3a7670df0f.png",icon_u00d:n.p+"a2cde58ee4d7c9efffcc0428973a0946.png"}}]);
//# sourceMappingURL=main.js.map