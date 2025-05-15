<template>
    <nav :class="{'scrolled-nav':scrollNav}"  >
        <div class="bg-blue-200 p-5 flex justify-between lg:px-60 fixed z-90 w-full">

        
        <div class=" font-mono logo text-blue-800 text-2xl flex">
            FACTGEN
        </div>
        <div v-if="mobile" class="icon flex h-full justify-center">
            <img @click="toggleNav" :class="{ 'icon-active':mobileNav}" src="../assets/8604bcf1-d9e9-4924-ab99-89e8a04d5de4.svg" alt="">
        </div>
        <div>
            <ul v-if="!mobile" class="flex h-full justify-center space-x-3 items-center text-center ">
                <li class="hover:underline" >about</li>
                <li class="hover:underline">customize</li>
                <button class=" transition duration-500 text-purple-300 p-3 border-purple-100 bg-blue-400 p-2 border- rounded-4xl hover:text-white hover:border-transparent hover:bg-blue-600 active:bg-blue-900">login/Registered</button>
                <button class="transition duration-500 text-blue-600 p-3 border-green-100 bg-green-400 p-2 border- rounded-4xl hover:text-black hover:border-transparent hover:bg-green-500 active:bg-green-900">login/Registered</button>
            </ul>
        </div>
        <transition name="mobile-nav" class="dropdown">
            <ul v-if="mobileNav" class=" h-full space-x-3 items-center text-center ">
                <li class="hover:underline" >about</li>
                <li class="hover:underline">customize</li>
                <button class="text-purple-300 border-purple-100 bg-blue-400 p-2 border- rounded hover:text-white hover:border-transparent hover:bg-purple-600 active:bg-purple-700">login/Registered</button>
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
            mobile:null,
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
        checkScreen(){
                this.WindowWidth = window.innerWidth;
                if (this.WindowWidth<=750) {
                    this.mobile = true;

                    return;
                    
                }
                this.mobile = false;
                this.mobileNav = false;
                return;
            },
            updateScroll(){
                const scrollPosition = window.scrollY;
                if (scrollPosition>50) {
                    this.scrollNav=true;
                    return;
                    
                }
                this.scrollNav = false;

            }
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