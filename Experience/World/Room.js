import * as THREE from "three";
import Experience from "../Experience.js"
import GSAP from "gsap";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

export default class Room{
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.time = this.experience.time;
        this.roomChildren = {}

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        };

        this.setModel();
        this.onMouseMove();
    }

    setModel(){
        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true ;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true ;
                });
            }


            // if(child.name === "Computer"){
            //     child.children[2].material = new THREE.MeshBasicMaterial({
            //         map: this.resources.items.screen,
                     
            //     });
                 
            // }

            if(child.name === "Table001"){
                child.position.x = -5 ;
                child.position.z = 5 ;             
            }

            // if(child.name === "Table002" ||
            // child.name ==="Table007" ||
            // child.name ==="Table008"||
            // child.name ==="Table009"||
            // child.name ==="Cylinder"||
            // child.name ==="Circle"||
            // child.name ==="Books"||
            // child.name ==="Book"){ 

            //     child.scale.set(0,0,0);
                
                     
            // }

            child.scale.set(0,0,0);
            if (child.name === "Cube") {
                //child.scale.set(1, 1, 1);
                child.position.set(0, 0.5, 0);
                child.rotation.y = Math.PI / 4;
            }

            this.roomChildren[child.name.toLowerCase()] = child;

        });

        const width_Screen1 = 0.5;
        const height_Screen1 = 0.3;
        const intensity_Screen1 = 4;
        const rectLight_Screen1 = new THREE.RectAreaLight( 0xffffff, intensity_Screen1,  width_Screen1, height_Screen1);
        rectLight_Screen1.position.set( 4.8, 4.5, 0.25   );//4.86741   0.121904
        rectLight_Screen1.rotation.y = Math.PI / 4;
        this.actualRoom.add( rectLight_Screen1 )
        this.roomChildren["rectLight_Screen1"] = rectLight_Screen1;
    

        const width_Screen2 = 0.3;
        const height_Screen2 = 0.55;
        const intensity_Screen2 = 4;
        const rectLight_Screen2 = new THREE.RectAreaLight( 0xffffff, intensity_Screen2,  width_Screen2, height_Screen2 );
        rectLight_Screen2.position.set( 6.27, 4.5, -1.5   );//4.86741   0.121904
        rectLight_Screen2.rotation.y = Math.PI /2.8;
        this.actualRoom.add( rectLight_Screen2 )
        this.roomChildren["rectLight_Screen2"] = rectLight_Screen2;

        // const width_Led1 = 0.8;
        // const height_Led1 = 0.07;
        // const intensity_Led1 = 7;
        // const rectLight_Led1 = new THREE.RectAreaLight( 0xffffff, intensity_Led1,  width_Led1, height_Led1 );
        // rectLight_Led1.position.set( 6.2, 6.7, -0.25   );//4.86741   0.121904
        // rectLight_Led1.rotation.y = Math.PI /4;
        // this.actualRoom.add( rectLight_Led1 )

        const width_Led2 = 0.8;
        const height_Led2 = 0.07;
        const intensity_Led2 = 7;
        const rectLight_Led2 = new THREE.RectAreaLight( 0xffffff, intensity_Led2,  width_Led2, height_Led2 );
        rectLight_Led2.position.set( 6, 6.7, 0.2   );//4.86741   0.121904
        rectLight_Led2.rotation.y = Math.PI /4;
        this.actualRoom.add( rectLight_Led2 )
        this.roomChildren["rectLight_Led2"] = rectLight_Led2;

        const width_LedTop = 0.7;
        const height_LedTop = 0.1;
        const intensity_LedTop = 7;
        const rectLight_LedTop = new THREE.RectAreaLight( 0xffffff, intensity_LedTop,  width_LedTop, height_LedTop );
        rectLight_LedTop.position.set( 6 , 10, 0.2  );//4.86741   0.121904
        rectLight_LedTop.rotation.y = Math.PI /4;
        this.actualRoom.add( rectLight_LedTop )
        this.roomChildren["rectLight_LedTop"] = rectLight_LedTop;

        const width_Lamp = 0.1;
        const height_Lamp = 0.1;
        const intensity_Lamp = 2;
        const rectLight_Lamp = new THREE.RectAreaLight( 0xffffff, intensity_Lamp,  width_Lamp, height_Lamp);
        rectLight_Lamp.position.set( 3, 2.3, -10   );//4.86741   0.121904
        rectLight_Lamp.rotation.x = 5;
        this.actualRoom.add( rectLight_Lamp )
        this.roomChildren["rectLight_Lamp"] = rectLight_Lamp;




        // const rectLightHelper_Screen2 = new RectAreaLightHelper( rectLight_Screen2 );
        // rectLight_Screen2.add( rectLightHelper_Screen2 );

        //   const rectLightHelper_Screen1 = new RectAreaLightHelper( rectLight_Screen1 );
        //   rectLight_Screen1.add( rectLightHelper_Screen1 );

        //   const rectLightHelper = new RectAreaLightHelper( rectLight_LedTop );
        //   rectLight_LedTop.add( rectLightHelper );

        //   const rectLightHelper_Led2 = new RectAreaLightHelper( rectLight_Led2 );
        //   rectLight_Led2.add( rectLightHelper_Led2 );

        //   const rectLightHelper_Lamp = new RectAreaLightHelper( rectLight_Lamp );
        //   rectLight_Lamp.add( rectLightHelper_Lamp );

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.18, 0.18, 0.18);



        
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e)=>{
            this.rotation =
                ((e.clientX - window.innerWidth /2)*2)/window.innerWidth;
                this.lerp.target = this.rotation*0.1;

        })
    }


    resize() {
       
    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
        
    }

}
