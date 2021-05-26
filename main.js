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
}

const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event)=>{
    const menu = event.target;
    const data = menu.dataset.name;
    if(data == null){
        return;
    } 
    scrollIntoView(data);

    for(let i of navbarMenu.children){
        if(i.classList.contains('active')){
            i.classList.remove('active');
        }
    }
    menu.classList.add('active');
    
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

    projectContainer.classList.add('anim-out');

    for(let i of category.children){
        if(i.classList.contains('active')){
            i.classList.remove('active');
        }
    }
    event.target.classList.add('active');
    
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