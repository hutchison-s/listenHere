
// @desc Converts base64 string with encoding prefix to mp3 encoded blob
export const base64toBlob = (base64Data) => {
    const base64EncodedString = base64Data.split(';base64,')[1];
    const binaryData = atob(base64EncodedString);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    const blobData = new Blob([arrayBuffer], { type: 'audio/mpeg3' });

    return blobData
  }

export const convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});

// @desc Converts toString() timestamp to readable time-date string
export const timestampToString = (timestamp) => {
    const date = new Date(timestamp)
    if (date.toLocaleTimeString() == 'Invalid Date') {
      console.log("could not convert", timestamp, "to date object")
    }
    return `${date.toLocaleTimeString()} ${date.toDateString()}`
  }

export const isSignificant = (threshold, oldLoc, newLoc) => {
  let x = Math.abs(oldLoc.lat - newLoc.lat)
  let y = Math.abs(oldLoc.lng - newLoc.lng)
  let h = Math.sqrt((x ** 2) + (y ** 2))
  return h > threshold
}

export const initAudio = () => {
  let silentSound = new Audio("./silence.mp3");
  silentSound.autoplay="";
  silentSound.muted="";
  silentSound.playsinline=""
  silentSound.load();
  return silentSound
}