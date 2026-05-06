const literatureContainer = document.getElementById("literature-posts");

fetch("data/posts.json")
  .then((response) => response.json())
  .then((data) => {

    literatureContainer.innerHTML = data.posts
      .map((post) => {

        const formattedDate = new Date(post.date).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric"
          }
        );

        return `
          <article class="literature-item">

            <span class="literature-date">
              ${formattedDate}
            </span>

            <div class="literature-content">

              <h2>
                ${post.title}
              </h2>

              <p>
                ${post.preview}
              </p>

              <a
                href="posts/post.html?post=${post.slug}"
                class="literature-link"
              >
                Read More →
              </a>

            </div>

          </article>
        `;
      })
      .join("");

  })
  .catch((error) => {

    literatureContainer.innerHTML = `
      <p>Unable to load posts.</p>
    `;

    console.error(error);

  });