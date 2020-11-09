import React from 'react'
import database from '@react-native-firebase/database'

const USER_ROUTE = "/User/"
const USER_ID_ROUTE = "/User"
const TRAVEL_ROUTE = "/Moprim/"
const TRAVEL_ID_ROUTE = "/Moprim"
const MEDIA_ROUTE = "/Media/"
const MEDIA_ID_ROUTE = "/Media"
const COMMENT_ID_ROUTE = "/Comment"
const COMMENT_ROUTE = "/Comment/"

// Get all = "/"
// Get single = "/id"
const dbUserGET = async (id) => {
    return await database()
        .ref(USER_ID_ROUTE + id)
        .once("value")
}

// Insert single user, data in JSON
const dbUserINSERT = async (data) => {
    return await database()
        .ref(USER_ROUTE + data.id)
        .set(data)
}

// Update user rating
const dbUserUPDATE = async (userId) => {
    const user = await dbUserGET("/" + userId)
    const rating = user.val().rating + 1
    return await database()
        .ref(USER_ROUTE + userId)
        .update({
            rating: rating
        })
}

// Get all = "/"
// Get single = "/id"
const dbAllMoprimGET = async (id) => {
    return await database()
        .ref(TRAVEL_ID_ROUTE + id)
        .once("value")
}

// Get all user travel data
const dbMoprimGET = async (userId) => {
    return await database()
        .ref(TRAVEL_ROUTE)
        .orderByChild("userId")
        .equalTo(userId)
        .once("value")
}

// Insert travel data, data in JSON
const dbMoprimINSERT = async (data) => {
    return await database()
        .ref(TRAVEL_ROUTE + data.id)
        .set(data)
}

// Update travel rating
const dbMoprimUPDATE = async (id, data) => {
    return await database()
        .ref(TRAVEL_ROUTE + id)
        .update({
            rating: {
                speed: data.speed,
                cleanness: data.cleanness,
                comfort: data.comfort
            }
        })
}

// Get rating average
const dbMoprimAVERAGE = async (id) => {
    const rating = await database()
        .ref(TRAVEL_ROUTE + id)
        .child("rating")
        .once("value")
    return (rating.child("cleanness").val() + rating.child("comfort").val() + rating.child("speed").val()) / 3
}

// Insert media data, data in JSON
const dbMediaINSERT = async (data) => {
    return await database()
        .ref(MEDIA_ROUTE + data.id)
        .set(data)
}

// Get all = "/"
// Get single = "/id"
const dbAllMediaGET = async (id) => {
    return await database()
        .ref(MEDIA_ID_ROUTE + id)
        .once("value")
}

// Get all user media
const dbMediaGET = async (userId) => {
    return await database()
        .ref(MEDIA_ROUTE)
        .orderByChild("userId")
        .equalTo(userId)
        .once("value")
}

// Get media for specific travel chain
const dbMediaMoprimGET = async (moprimId) => {
    return await database()
        .ref(MEDIA_ROUTE)
        .orderByChild("moprimId")
        .equalTo(moprimId)
        .once("value")
}

// Get all = "/"
// Get single = "/id"
const dbAllCommentGET = async (id) => {
    return await database()
        .ref(COMMENT_ID_ROUTE + id)
        .once("value")
}

// Get all user comments
const dbCommentUserGET = async (userId) => {
    return await database()
        .ref(COMMENT_ROUTE)
        .orderByChild("userId")
        .equalTo(userId)
        .once("value")
}

// Get all travel chain comments
const dbCommentMoprimGET = async (moprimId) => {
    return await database()
        .ref(COMMENT_ROUTE)
        .orderByChild("moprimId")
        .equalTo(moprimId)
        .once("value")
}

// Insert comment data, data in JSON
const dbCommentINSERT = async (data) => {
    return await database()
        .ref(COMMENT_ROUTE + data.id)
        .set(data)
}

export default {
    dbUserGET,
    dbUserINSERT,
    dbUserUPDATE,
    dbAllMoprimGET,
    dbMoprimINSERT,
    dbMoprimGET,
    dbMoprimUPDATE,
    dbMoprimAVERAGE,
    dbMediaINSERT,
    dbAllMediaGET,
    dbMediaGET,
    dbMediaMoprimGET,
    dbAllCommentGET,
    dbCommentUserGET,
    dbCommentINSERT,
    dbCommentMoprimGET
}
