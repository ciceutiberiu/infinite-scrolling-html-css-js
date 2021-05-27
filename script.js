const box = document.querySelector(".box-container");
const loading = document.querySelector(".loading");

let limit = 6;
let page = 1;

const getPosts = async () => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const showPosts = async () => {
  const posts = await getPosts();
  console.log(posts);
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.body}</p>
    `;

    box.appendChild(postElement);
  });
};

showPosts();

const showLoading = () => {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      ++page;
      showPosts();
    });
  }, 1000);
};

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});
