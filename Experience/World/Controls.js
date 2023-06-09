import * as THREE from "three";
import Experience from "../Experience.js";



import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll';

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room;

        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;
    
        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";

        this.timeline = null;

        
        
        //this.setSmoothScroll();
        //this.resources.on("ready", () => {
            this.setSmoothScroll();
            this.setScrollTrigger();
            
        //});
    }


    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.3,
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger() {

    if (this.experience.world.room) {

        this.room = this.experience.world.room.actualRoom;

    }

    this.room.children.forEach((child)=>{
        
        if(child.type === "RectAreaLight"){
            if(!this.rectLights){
                this.rectLights = [];
            }

            this.rectLights.push(child);
            
        }
    });

        ScrollTrigger.matchMedia({

            //Desktop
            "(min-width: 969px)": () => {

                this.room.scale.set(0.18, 0.18, 0.18);

                this.rectLights[0].width = 0.5;
                this.rectLights[0].height = 0.3;

                this.rectLights[1].width = 0.3;
                this.rectLights[1].height = 0.55;

                this.rectLights[2].width = 0.8;
                this.rectLights[2].height = 0.07;

                this.rectLights[3].width = 0.8;
                this.rectLights[3].height = 0.07;

                this.rectLights[4].width = 0.1;
                this.rectLights[4].height = 0.1;


                //Section 1 -------------------------------------------------------------*/
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub : 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: ()=>{
                        return this.sizes.width * -0.0015;
                    }
                });

                //Section 2 -------------------------------------------------------------*/

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub : 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.secondMoveTimeline.to(this.room.position, {
                    x: ()=>{
                        return 1
                    },
                    z: ()=>{
                        return this.sizes.height * -0.0032
                    }
                },"same");


                this.secondMoveTimeline.to(this.room.scale, {

                    x: 0.5,
                    y: 0.5,
                    z: 0.5,
            
                },"same");

                this.secondMoveTimeline.to(this.rectLights[0] , {

                    width: 0.5 * 3,
                    height: 0.3 * 2.5
            
                },"same");

                this.secondMoveTimeline.to(this.rectLights[1] , {

                    width: 0.3 * 2.5,
                    height: 0.55 * 2.5
            
                },"same");

                this.secondMoveTimeline.to(this.rectLights[2] , {

                    width: 0.8 * 2.5,
                    height: 0.07 * 2.5
            
                },"same");

                this.secondMoveTimeline.to(this.rectLights[3] , {

                    width: 0.7 * 2.5,
                    height: 0.1 * 2.5
            
                },"same");
                this.secondMoveTimeline.to(this.rectLights[4] , {

                    width: 0.1 * 2.5,
                    height: 0.1 * 2.5
            
                },"same");

                //Section 3 -------------------------------------------------------------*/
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub : 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
                    
                    y: -1.5,
                    x: 4.1,
                });



            },






            //Mobile
            "(max-width: 968px)": () => {
                //Resets

                this.room.scale.set(0.11, 0.11, 0.11);
                this.rectLights[0].width = 0.32;
                this.rectLights[0].height = 0.22;

                this.rectLights[1].width = 0.23;
                this.rectLights[1].height = 0.3;

                this.rectLights[2].width = 0.46;
                this.rectLights[2].height = 0.06;

                this.rectLights[3].width = 0.46;
                this.rectLights[3].height = 0.06;

                this.rectLights[4].width = 0.075;
                this.rectLights[4].height = 0.075;

                //Section 1 -------------------------------------------------------------*/
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub : 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale,{
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                });
                //Section 2 -------------------------------------------------------------*/

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub : 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale,{
                    x: 0.32,
                    y: 0.32,
                    z: 0.32
                },"same").to(this.rectLights[0] , {

                    width: 0.32 * 3,
                    height: 0.22 * 2.5
            
                },"same").to(this.rectLights[1] , {

                    width: 0.23 * 2,
                    height: 0.3 * 3
            
                },"same").to(this.rectLights[2] , {

                    width: 0.46 * 2.6,
                    height: 0.06 * 2.5
            
                },"same").to(this.rectLights[3] , {

                    width: 0.46 * 2.6,
                    height: 0.06 * 2.5
            
                },"same").to(this.room.position,{
                    x: -1.35,
                },"same").to(this.rectLights[4] , {

                    width: 0.075 * 2.5,
                    height: 0.075 * 2.5
            
                },"same")
                //Section 3 -------------------------------------------------------------*/
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub : 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.position,{
                    z: 4,
                    x: -0.8
                });
            },
              
            "all": ()=> {

                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section)=>{
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if(section.classList.contains("right")){
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger:{
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger:{
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }else{
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger:{
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger:{
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }

                    GSAP.from(this.progressBar,{
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });
                });

                 // First section -----------------------------------------
                 this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                    },
                }).to(this.circleFirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                });

                // Second section -----------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                    },
                })
                    .to(
                        this.circleSecond.scale,
                        {
                            x: 3,
                            y: 3,
                            z: 3,
                        },
                        "same"
                    ).to(this.room.position,
                    {
                        y: 0.7,
                    },
                    "same"
                    );
                    

                // Third section -----------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                    },
                }).to(this.circleThird.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                });






            //Mobile

                //Plateform ----------------------------------------//

                this.secondPartTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        
                    },
                });


                this.room.children.forEach((child)=>{

                    if(child.name === "Table001"){
                    
                       this.first = GSAP.to(child.position, {
                            x:0,
                            z:0,
                            duration: 0.7
                        });
                    }

                    if(child.name === "Table002"){

                        this.second = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.5
                        });
                    }
                    if(child.name === "Table007"){

                        this.eight = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        });
                    }
                    if(child.name === "Table008"){

                        this.ninth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        });
                    }
                    if(child.name === "Table009"){

                       this.tenth =  GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        });
                    }
                    if(child.name === "Circle"){

                        this.fourth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        });
                    }
                    if(child.name === "Cylinder"){

                        this.third = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        });
                    }
                    if(child.name === "Books"){

                        this.fifth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        });
                    }
                    if(child.name === "Book"){

                        this.senventh = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        });
                    }
                    
                });
                this.secondPartTimeline.add(this.first);
                this.secondPartTimeline.add(this.second);
                this.secondPartTimeline.add(this.third);
                this.secondPartTimeline.add(this.fourth);
                this.secondPartTimeline.add(this.fifth);
                this.secondPartTimeline.add(this.senventh);
                this.secondPartTimeline.add(this.eight);
                this.secondPartTimeline.add(this.ninth);
                this.secondPartTimeline.add(this.tenth);
            }
              
          });
          

    }

    resize() {}

    update() {

    }


}