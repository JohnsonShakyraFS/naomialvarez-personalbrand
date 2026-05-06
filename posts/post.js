const postContainer = document.getElementById("post-container");
const params = new URLSearchParams(window.location.search);
const slug = params.get("post");

fetch("../data/posts.json")
  .then((response) => response.json())
  .then((data) => {
    const post = data.posts.find((item) => item.slug === slug);

    if (!post) {
      postContainer.innerHTML = `
        <div class="page-title">
          <h1>Post Not Found</h1>
          <p>The article you are looking for could not be found.</p>
        </div>

        <a href="../literature.html" class="btn">Back to Literature</a>
      `;
      return;
    }

    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    document.title = `${post.title} | Literature`;

    postContainer.innerHTML = `
      <div class="page-title">
        <h1>${post.title}</h1>
        <p>${formattedDate}${post.category ? " · " + post.category : ""}</p>
      </div>

      ${
        post.image
          ? `<img src="${post.image}" alt="${post.title}" class="post-hero-image">`
          : ""
      }

      <div class="post-content">
        ${post.content
          .split("\n")
          .filter((paragraph) => paragraph.trim() !== "")
          .map((paragraph) => `<p>${paragraph}</p>`)
          .join("")}
      </div>

      <a href="../literature.html" class="text-link">← Back to Literature</a>
    `;
  })
  .catch((error) => {
    postContainer.innerHTML = `
      <div class="page-title">
        <h1>Error Loading Post</h1>
        <p>Please try again later.</p>
      </div>
    `;

    console.error(error);
  });