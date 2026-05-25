const lists = document.querySelectorAll(".icons-list");

  lists.forEach((list) => {
 let position = 0;
function animate(){
    position -=1;
    if( position <= -list.offsetWidth){
        position = 0 ;
    }
    list.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
}
animate();
});

const hiddenEl= document.querySelectorAll(".hidden");

const observer =new IntersectionObserver((entries) => 
{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

hiddenEl.forEach((el)=>{
    observer.observe(el);
});

document.addEventListener("mousemove",(e)=>{
    const x =e.clientX / window.innerWidth;
    const y=e.clientY / window.innerHeight;
    document.querySelectorAll(".parallax").forEach((item)=>{
        item.style.transform= `translate(
        ${ x * 20}px,
        ${y * 20}px)`;
    });
});