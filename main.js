// const lists = document.querySelectorAll(".icons-list");

//   lists.forEach((list) => {
//  let position = 0;
// function animate(){
    
//     position -=1;
//     if( position <= -list.offsetWidth){
//         position = 0 ;
//     }
//     list.style.transform = `translateX(${position}px)`;
    
//     requestAnimationFrame(animate);
// }
// animate();
// });

// // const hiddenEl= document.querySelectorAll(".hidden");

// // const observer =new IntersectionObserver((entries) => 
// // {
// //     entries.forEach((entry)=>{
// //         if(entry.isIntersecting){
// //             entry.target.classList.add("show");
// //         }
// //     });
// // });

// // hiddenEl.forEach((el)=>{
// //     observer.observe(el);
// // });

// // document.addEventListener("mousemove",(e)=>{
// //     const x =e.clientX / window.innerWidth;
// //     const y=e.clientY / window.innerHeight;
// //     document.querySelectorAll(".parallax").forEach((item)=>{
// //         item.style.transform= `translate(
// //         ${ x * 20}px,
// //         ${y * 20}px)`;
// //     });
// // });

// // const rocket =document.querySelector(".rocket");
// // const computer =document.querySelector(".computer");

// // function animate(){
// //     const time =Date.now() * 0.001;
// //     /* rocket*/

// //     const rocketX =Math.sin(time * 1.2) * 20;
// //     const rocketY =Math.cos(time * 1.5) * 15;

// //     rocket.style.transform = `translate(${rocketX}px, ${rocketY}px) rotate(-10deg)`;
// //     requestAnimationFrame(animate);

// //      /* computer*/

// //     const computerX =Math.sin(time * 0.8) * -15;
// //     const computerY =Math.cos(time * 1.1) * 20;

// //     computer.style.transform = `translate(${computerX}px, ${computerY}px) rotate(6deg)`;
// //     requestAnimationFrame(animate);
// // }
// //   animate();


/* -----ELEMENTS -------*/
const rocket =document.querySelector(".rocket");

const computer =document.querySelector(".computer");

const rows =document.querySelector(".icon-list");

const glow =document.querySelector(".cursor-glow");

const parallaxItems =document.querySelectorAll(".parallax");

/* -----MOUSE -------*/
 let mouseX = window.innerWidth / 2;
 let mouseY = window.innerHeight / 2;

 let currentGlowX = mouseX;
 let currentGlowY = mouseY;

 document.addEventListener("mousemove", (e)=>{

    mouseX = e.clientX;
    mouseY = e.clientY;
 });

 /* -----SCROLL REVEAL -------*/

 const hiddenElements = document.querySelectorAll(".hidden");

 const observer= new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{
          if(entry.isIntersecting){
        entry.target.classList.add("show");
       }
    });
 });

 hiddenElements.forEach((el)=>{
    observer.observe(el);
 });

  /* ----- MARQUEE POSITIONS -------*/

  const marqueePosittons =[];

  rows.forEach((row, index)=>{
    marqueePosittons[index]=index % 2 === 0 ? 0 : -row.scrollWidth / 2;
  });

   /* -----MAIN ANIMATION LOOP -------*/

   function animate(){
    const time = Date.now() * 0.001;

     /* -----ROCKET -------*/

     if (rocket){
        const x = Math.sin(time *1.1) * 25 + Math.cos(time * 0.7) * 15;

        const y =  Math.sin(time *1.3) * 20 + Math.cos(time * 0.5) * 10;
        
        const rotate = Math.sin(time) * 8;

        rocket.style.transform = `translate(${x}px, ${y}px) 
        rotate(${rotate}deg)`;
     }

     /* -----COMPUTER -------*/

     if(computer){
         const x = Math.sin(time * 0.8) * -20 + Math.cos(time * 0.4) * 12;

        const y =  Math.sin(time *1.1) * 18 + Math.cos(time * 0.6) * 15;
        
        const rotate = Math.cos(time * 0.7 ) * 5;

        computer.style.transform = `translate(${x}px, ${y}px) 
        rotate(${rotate}deg)`;
     }

      /* -----COMPUTER -------*/

      rows.forEach((row, index)=>{
        if(index % 2 === 0) {
            marqueePosittons[index] -= 0.35;
            if(
                marqueePosittons[index] <= -row.scrollWidth / 2
            ){
                marqueePosittons[index] = 0;
            }
        }else{
            marqueePosittons[index] += 0.35;
            if(
                marqueePosittons[index] >= 0
            ){
                marqueePosittons[index] =-row.scrollWidth / 2;
            }
        }
        row.style.transform =`translateX(${marqueePosittons[index]}px)`;
      });

       /* -----CURSOR GLOW SMOOTH -------*/
       
       currentGlowX += (mouseX - currentGlowX) * 0.08;

       currentGlowY += (mouseY - currentGlowY) * 0.08;

       if(glow){
        glow.style.left = `${currentGlowX}px`;

        glow.style.top = `${currentGlowY}px`;
       }

       /* ----- PARALLAX -------*/

       parallaxItems.forEach((item, index) => {
        const speed = (index + 1) * 1.5;
        const x =((mouseX / window.innerWidth) - 0.5) * speed * 10;
        const y =((mouseY / window.innerHeight) - 0.5) * speed * 10;

        item.style.translate = `${x}px ${y}px`;
       });
       requestAnimationFrame(animate);
   }
   animate();