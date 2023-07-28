const videoCardContainer = document.querySelector(".video-container");

let api_key = "AIzaSyCSBD6TKPpWHaHyoGhbXfDsXgEqsI3snjU";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
  video_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 100,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));

const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
      makeVideoCard(video_data);
    });
};

const makeVideoCard = (data) => {
  videoCardContainer.innerHTML += `
  <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
  </div>
  `;
};

// Search Bar
const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
const result = document.getElementById("result");
const navbar = document.querySelector(".navbar");

const listItems = [];
let counter = 0;

let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener("click", () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
});

searchInput.addEventListener("click", listAppear);

searchInput.addEventListener("click", (e) => {
  console.log(e.target);

  const li = document.createElement("li");
  listItems.push(li);
  counter++;
  console.log(counter);

  li.innerHTML = `
        <li class="flexed">
          <h4>Javascript</h4>
          <a href="#">Remove</a>        
        </li>
        
        <li class="flexed">
          <h4>How to perform squat</h4>
          <a href="#">Remove</a>        
        </li>
        
        <li class="flexed">
          <h4>Are Aliens real</h4>
          <a href="#">Remove</a>        
        </li>
        
        <li class="flexed">
          <h4>Ancient Indian texts</h4>
          <a href="#">Remove</a>        
        </li>
        
        <li class="flexed">
          <h4>Latest Hip hop songs</h4>
          <a href="#">Remove</a>        
        </li>
        
        <li class="flexed">
          <h4>Funny cat videos</h4>
          <a href="#">Remove</a>        
        </li>
        
        <li class="flexed">
          <h4>Programming tips and tricks</h4>
          <a href="#">Remove</a>        
        </li>
        
        <li class="flexed">
          <h4>Front end dev future</h4>
          <a href="#">Remove</a>        
        </li>
  `;

  if (2 > counter >= 1) {
    result.appendChild(li);
  } else if (counter > 2) {
    return;
  }
});

function listAppear() {
  result.classList.toggle("hide");
}
