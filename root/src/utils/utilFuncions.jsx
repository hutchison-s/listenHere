
// Converts base64 string with encoding prefix to mp4 encoded blob
export const base64toBlob = (base64Data) => {
    console.log(base64Data.slice(0, 20))
    const base64EncodedString = base64Data.split(';base64,')[1];
    const binaryData = atob(base64EncodedString);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    const blobData = new Blob([arrayBuffer], { type: 'audio/mp4; codecs=mp4a.40.2' });

    return blobData
  }

  // Converts blob to base64 string
export const convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});

// Converts toString() timestamp to readable time-date string
export const timestampToString = (timestamp) => {
    const date = new Date(timestamp)
    if (date.toLocaleTimeString() == 'Invalid Date') {
      console.log("could not convert", timestamp, "to date object")
    }
    return `${date.toLocaleTimeString()} ${date.toDateString()}`
  }

  // measures whether new location is farther than the threshold away from the old location via pythagoras
export const isSignificant = (threshold, oldLoc, newLoc) => {
  let x = Math.abs(oldLoc.lat - newLoc.lat)
  let y = Math.abs(oldLoc.lng - newLoc.lng)
  let h = Math.sqrt((x ** 2) + (y ** 2))
  return h > threshold
}