import { fetchAllLists, fetchListItem, fetchMyLists, getUser, incrementRecipeRating, decrementRecipeRating } from "../script/fetch-utils.js";




fetchAllLists();
getUser();
fetchMyLists();
fetchListItem(4);
decrementRecipeRating(6);