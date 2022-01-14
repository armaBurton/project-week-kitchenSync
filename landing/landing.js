import { fetchAllLists, fetchListItem, fetchMyLists, getUser } from "../script/fetch-utils.js";




fetchAllLists();
getUser();
fetchMyLists();
fetchListItem(4);