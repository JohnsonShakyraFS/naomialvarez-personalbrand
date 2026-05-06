const literatureContainer = document.getElementById("literature-posts");

fetch("data/posts.json")
  .then((response) => response.json())
  .then((data) => {
    literatureContainer.innerHTML = data.posts
      .map((post) => {
        const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        });

        return `
          <article class="literature-card">
            ${
              post.image
                ? `<img src="${post.image}" alt="${post.title}">`
                : `<div class="literature-card-placeholder"></div>`
            }

            <div class="literature-card-content">
              <p class="literature-date">${formattedDate}</p>
              <h2>${post.title}</h2>
              <p>${post.preview}</p>
              <a href="posts/post.html?post=${post.slug}">Read More →</a>
            </div>
          </article>
        `;
      })
      .join("");
  })
  .catch((error) => {
    literatureContainer.innerHTML = "<p>Unable to load posts.</p>";
    console.error(error);
  });