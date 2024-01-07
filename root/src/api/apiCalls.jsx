import axios from "axios"

const baseURL = 'https://listen-here-api.onrender.com/'
const pinsURL = baseURL+'pins/'
const usersURL = baseURL+'users/'

export const togglePinLike = (pin, profile, isLiked, setIsLiked)=>{
    if (isLiked) {
        if (profile.liked.includes(pin._id)) {
            axios.put(pinsURL+pin._id+"/unlike", {userId: profile._id})
                .then(res => {
                    console.log(res.data)
                    setIsLiked(false)
                }).catch(err => {
                    console.log("Error unliking pin:", err)
                })
        }
      
    } else {
        if (!profile.liked.includes(pin._id)) {
            console.log("attempting like")
            axios.post(pinsURL+pin._id+"/like", {userId: profile._id})
                .then(res => {
                    console.log(res.data)
                    setIsLiked(true)
                 }).catch(err => {
                    console.log("Error liking pin:", err)
                })
        }
  }
}

export const getUser = (id, callback)=>{
    axios.get(usersURL+id)
        .then(res => {
            callback(res.data)
        }).catch(err => {
            console.log(err)
        })
}

export const getPin = (id, callback)=>{
    axios.get(pinsURL+id)
        .then(res => {
            callback(res.data)
        }).catch(err => {
            console.log(err)
        })
}

export const getAllPins = (callback) => {
    axios.get(pinsURL)
        .then(res => {
            callback(res.data)
        }).catch(err => {
            console.log("Error retrieving pins from API:", err)
        })
}

export const createPin = (newPin, callback) => {
    axios.post(pinsURL, newPin)
        .then(res => {
            callback(res.data)
        }).catch(err => {
            console.log("Error creating pin:", err)
        })
}

export const deletePin = (id, callback) => {
    axios.delete(pinsURL+id)
        .then(res => {
            callback(res.data)
        }).catch(err => {
            console.log("Error creating pin:", err)
        })
}

export const connect = (id1, id2, update) => {
    axios.post(usersURL+id1+"/connect", {userId: id2})
        .then(res => {
            console.log(res.status, "successful connection")
            update()
        }).catch(err => {
            console.log(err)
        })
}

export const disconnect = (id1, id2, update) => {
    axios.put(usersURL+id1+"/disconnect", {userId: id2})
        .then(res => {
            console.log(res.status, "successful disconnect")
            update()
        }).catch(err => {
            console.log(err)
        })
}
