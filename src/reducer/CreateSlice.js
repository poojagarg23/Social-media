import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../Service/firebase.config";
const user = auth.currentUser;
console.log(user, "userauthcurrentuser");
const socialSlice = createSlice({
  name: "social",
  initialState: {
    like: [],
  },

  reducers: {
    addtoLike: (state, action) => {
      const itemInCart = state.like.find(
        (item) => item?.id == action.payload.id
      );
      console.log(action.payload, "action");

      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.like.push({ ...action.payload, quantity: 1 });
      }
    },
  },
});

export const likeReducer = socialSlice.reducer;

export const { addtoLike } = socialSlice.actions;
