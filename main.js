"use strict";

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

// Make navbar transparent when it is on the top
document.addEventListener('scroll', ()=>{
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    } else{
        navbar.classList.remove('navbar--dark');
    }
})


//Handle scrolling when tapping on the navbar menu
function scrollIntoView(selector){
    const target = document.querySelector(`#${selector}`);
    target.scrollIntoView({behavior:"smooth",block:"center"});
    if(navbarMenu.classList.contains('visible')){
        navbarMenu.classList.remove('visible');
    }
}

const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event)=>{
    const menu = event.target;
    const data = menu.dataset.name;
    if(data == null){
        return;
    } 
    scrollIntoView(data);
    const active = document.querySelector('.navbar__menu__item.active');
    active.classList.remove('active');
    menu.classList.add('active');
})

//When click toggle btn, show navbar menu
const toggleBtn = document.querySelector('.navbar__toggle');
console.log(navbarMenu);
toggleBtn.addEventListener('click', ()=>{
    navbarMenu.classList.toggle('visible');
})

//Handle Contact me button
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click',()=>{
    scrollIntoView('contact');
})


//Transparent home when scrolling 
const home = document.querySelector('.home__container');
const homeSize = home.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{
    home.style.opacity = 1-window.scrollY/homeSize;
})


//Show arrow up btn when scrolling down
const arrow = document.querySelector('.arrow');
document.addEventListener('scroll',()=>{
    if(window.scrollY > homeSize/2){
        arrow.classList.add('visible');
    } else{
        arrow.classList.remove('visible');
    }
})
arrow.addEventListener('click',()=>{
    scrollIntoView('home');
})

//Project filtering & animation
const category = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
category.addEventListener('click',(event)=>{
    const filter = event.target.dataset.filter;
    if(filter == null){
        return;
    } 

    //Remove selection from the previous item and select btn
    const active = document.querySelector('.category__btn.active');
    active.classList.remove('active');
    const target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
    target.classList.add('active');

    //Animating project container
    projectContainer.classList.add('anim-out');
    setTimeout(()=>{
        for(let project of projects){
            const data = project.dataset.target;
            if(filter === 'all'){
                project.classList.remove('invisible');
            } else if(!(filter === data)){
                project.classList.add('invisible');
            } else{
                project.classList.remove('invisible');
            }
        }
        projectContainer.classList.remove('anim-out');
    },300);
})

