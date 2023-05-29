let videosData = [];

const apiKey = "AIzaSyCn4U2ZpR1TLjlTN3pnE9J3eFejfrb9-DI";
let index = 0;
let page = 1;

function searchVideos() {
  const searchInput = document.getElementById("search-input").value;
  const maxResults = 23; // Set the desired number of results (e.g., 12)
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=${searchInput}&maxResults=${maxResults}`;
  videosData = [];

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      GetVideosData(data.items);
      DisplayVideos(videosData);
    })
    .catch((error) => console.log(error));

  // DisplayVideos(videosData)
}

// Display video results
function GetVideosData(videos) {
  videos.forEach((video) => {
    const thumbnail = video.snippet.thumbnails.medium.url;
    let title = video.snippet.title;
    const views = "" + Math.floor(Math.random() * 1000000); // Random number for demonstration purposes
    const uploader = video.snippet.channelTitle;
    const videoid = video.id.videoId

    if (title.length > 60)
      title = title.split("").slice(0, 55).join("") + " ...";

    let data = {
      thumbnail: thumbnail,
      title: title,
      views: views,
      uploader: uploader,
      videoid: videoid
    };

    videosData.push(data);
  });
}

function DisplayVideos(VideosData) {
  const pageVideoData = VideosData.slice(index, index + 4);
  console.log(pageVideoData)

  const videoContainer = document.getElementsByClassName("video-container")[0];
  videoContainer.innerHTML = "";

  pageVideoData.forEach((data) => {

    videoContainer.innerHTML += `<a class="video-main-container" href="#" onclick="(function(e){
        e.preventDefault(); 
        console.log('tahir');
        uploadData('${data.videoid}');
        window.location.href = 'openvideo.html';
      })(event)"><div class="video">
            <div class="video-img">
              <img src="${data.thumbnail}" alt="">
            </div>
            <div class="img-data">
              <div class="title">
                ${data.title}
              </div>
              <span class="creater-name"> ${data.uploader} </span>
              <div class="logo-container">
                <div class="youtube-logo">
                  <img
                    src="https://img.freepik.com/free-icon/youtube_318-566773.jpg"
                    alt=""
                  />
                  <span> youtube.com </span>
                </div>
                <span class="creater-name"> ${data.views} views </span>
              </div>
            </div>
          </div></a>`;

  });
}

function uploadData(data){
  localStorage.setItem("videoid", data)
}


function changeNextPage() {
  if (videosData.length) {
    if (index + 4 < videosData.length) {
      index += 4;
      page++;
    }

    DisplayVideos(videosData);

    if (page === 2) {
      const container = document.getElementsByClassName(
        "pagination-container"
      )[0];
      container.innerHTML = `
        <button class="prev-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="next-arrow"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
            prev
          </button>
    
          <div class="page-number">${page}</div>
    
          <button class="next-btn">
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="next-arrow"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </button>`;
      const nextButton = document.getElementsByClassName("next-btn")[0];
      nextButton.addEventListener("click", changeNextPage);

      const prevButton = document.getElementsByClassName("prev-btn")[0];
      prevButton.addEventListener("click", changePrevPage);
    } else {
      const pageNumber = document.getElementsByClassName("page-number")[0];
      pageNumber.innerHTML = "" + page;
    }
  }
}

function changePrevPage() {
  if (index - 4 >= 0) {
    index -= 4;
    page--;
  }
  DisplayVideos(videosData);

  if (page == 1) {
    const container = document.getElementsByClassName(
      "pagination-container"
    )[0];
    container.innerHTML = `<button class="next-btn">
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="next-arrow"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
        </svg>
      </button>`;
    const nextButton = document.getElementsByClassName("next-btn")[0];
    nextButton.addEventListener("click", changeNextPage);
  } else {
    const pageNumber = document.getElementsByClassName("page-number")[0];
    pageNumber.innerHTML = "" + page;
  }
}

// Attach event listener to the search button
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", searchVideos);

const nextButton = document.getElementsByClassName("next-btn")[0];
nextButton.addEventListener("click", changeNextPage);

function LoadContent() {
  searchVideos();
}
