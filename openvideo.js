function openVideo() {
    
    const videoId = localStorage.getItem("videoid");
    const videoUrl = 'https://www.youtube.com/embed/' + videoId; // Replace with your YouTube video URL

    // Set the video URL as the src of the iframe
    const videoFrame = document.getElementById('video-frame');
    videoFrame.src = videoUrl;
}

openVideo();