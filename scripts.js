const navDialog = document.getElementById('nav-dialog');
function handleMenu() {
    navDialog.classList.toggle('hidden');
}

const intialtranslateLTR = -48*4;
const intialtranslateRTL = 36*4;

function setupsectionObserver(element,isLTR,speed){

    const intersectionCallback = (entries) =>{
        const isIntersecting = entries[0].isIntersecting;
        if(isIntersecting){
            document.addEventListener('scroll',scrollHandler);
        }
        else{
            document.removeEventListener('scroll',scrollHandler);
           } 
        }
const intersectionObserver = new IntersectionObserver(intersectionCallback); 

intersectionObserver.observe(element);

function scrollHandler(){
    const translateX = (window.innerHeight - element.getBoundingClientRect().top )* speed;

  let totalTranslate = 0;
  if(isLTR){
    totalTranslate = translateX + intialtranslateLTR;
  }  else{
    totalTranslate = -(translateX + intialtranslateRTL);
  }
  element.style.transform = `translateX(${totalTranslate}px)`;
 }
    }

    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');

setupsectionObserver(line1,true,0.15);
setupsectionObserver(line2,false,0.15);
setupsectionObserver(line3,true,0.15);  
