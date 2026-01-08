import { defineStore } from 'pinia'
// import Swal from "sweetalert2";
import instance from "../../api/api";
export const useListeFavoris = defineStore('liste_favoris', {
    state: () => ({
        verfIfStudentExistInWishlist:[],
        myListOfFavoris:[],
    }),
    actions: {
       
        async handleListeFavoris(token) {
            if (token) {
             await instance
                .get("getAllWishlist")
                .then((response) => {
                  console.log("WISHLIST", response);
                  this.myListOfFavoris = response?.data?.data?.wishlists
                  response?.data?.data?.wishlists.forEach((item) => {
                    this.verfIfStudentExistInWishlist.push(item.user_id);
                  });
                })
                .catch((error) => {
                  console.log("error2",error);
                });
            } else {
              return;
            }
          },

    },
  })