<template>
    <nav :class="{'scrolled-nav':scrollNav}"  >
        <div class="bg-blue-900 p-5 top-0 left-0 h- flex justify-between lg:px-40 fixed z-90 w-full shadow">

        
        <div class=" w-20 font-bold logo text-blue-600 text-3xl flex">
            <router-link to="/"> <span class="text-white">FACT</span>GEN</router-link>
           
        </div>
        <div class="lg:hidden icon flex h-full justify-center items-center top-0">
            <img @click="toggleNav" :class="{ 'icon-active':mobileNav}" src="../assets/8604bcf1-d9e9-4924-ab99-89e8a04d5de4.svg" alt="">
        </div>
        <div >
            <ul v-if="!mobile" class=" hidden lg:flex h-full justify-center space-x-10 items-center text-center ">
                <li class="hover:text-blue-500 ease-in duration-200" ><router-link to="/FacTure">Facture</router-link></li>
                <li class="hover:text-blue-500 ease-in duration-200">customize</li>
                <li class="hover:text-blue-500 ease-in duration-200"><router-link to="/clientFact">client</router-link></li>
                <button class="capitalize transition duration-500 text-purple-300 p-3 border-purple-100 bg-blue-400 p-2 border- rounded-xl hover:text-white hover:border-transparent hover:bg-blue-600 active:bg-blue-900"><router-link to="/login">login</router-link></button>
                <button class="transition duration-500 text-blue-600 p-3 border-green-100 bg-green-400 p-2 border- rounded-xl hover:text-black hover:border-transparent hover:bg-green-500 active:bg-green-900">Registered</button>
            </ul>
        </div>
        <transition name="mobile-nav" class="dropdown">
            <ul v-if="mobileNav" class=" h-full space-x-3 items-center text-center ">
                <div class="absolute">X</div>
                <li class="hover:underline" ><router-link to="/FacTure">Facture</router-link></li>
                <li class="hover:underline">customize</li>
                <li class="hover:underline"><router-link to="/clientFact">client</router-link></li>
                <li class="">login/Registered</li>
            </ul>
        </transition>
    </div>
    </nav>
</template>

<script>
export default{
    data() {
        return {
            scrollNav:null,
            // mobile:null,
            mobileNav:null,
            WindowWidth: null,
        }
    },
    created(){
        window.addEventListener("resize", this.checkScreen)
        this.checkScreen

    },
    mounted() {
            window.addEventListener("scroll", this.updateScroll);
        },

    methods:{
        toggleNav(){
            this.mobileNav = ! this.mobileNav
        },
        // checkScreen(){
        //         this.WindowWidth = window.innerWidth;
        //         if (this.WindowWidth<=750) {
        //             this.mobile = true;

        //             return;
                    
        //         }
        //         this.mobile = false;
        //         this.mobileNav = false;
        //         return;
        //     },
        //     updateScroll(){
        //         const scrollPosition = window.scrollY;
        //         if (scrollPosition>50) {
        //             this.scrollNav=true;
        //             return;
                    
        //         }
        //         this.scrollNav = false;

        //     }
    }
}

</script>

<style>
@import "tailwindcss";
   
    .icon{
        position: absolute;
        right: 0;
        cursor: pointer;
        transition: 500ms ease all;

        img{
            width: 30px;
            height: 70px;
        }
        
    }
    .icon-active{
        transition: 500ms ease all;
        transform: rotate(90deg);
    }
    .dropdown{
        flex-direction: column;
        justify-content: flex-start;
        text-align: start;
        position: fixed;
        width: 100%;
        max-width: 250px;
        height: 100%;
        padding-left: 30px;
        background-color: #fff;
        top: 0;
        left: 0;
        transition: 500ms ease all;

         li{
            list-style-type: none;
            margin: 10px;
            color: black ;
         }

    }
    .mobile-nav-enter-active,
         .mobile-nav-leave-active {
            transition: 1s ease all;
         }

         .mobile-nav-enter-from,
         .mobile-nav-leave-to{
            transform: translateX(-250px);
         }
         .mobile-nav-enter-to {
            transform: translateX(0);
         }
         .scrolled-nav {
            
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06);

        .logo{
            font-size: x-small;
        
            
        
        }
        .bg-blue-200{
            background-color: rgb(111, 187, 223);

        }
        .icon img{
            width: 20px;
            height: 30px;
        }
       
}
        
</style>