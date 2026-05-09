const literatureContainer = document.getElementById("literature-posts");

fetch("data/posts.json")
  .then((response) => response.json())
  .then((data) => {
    const posts = data.posts || [];

    if (posts.length === 0) {
      literatureContainer.innerHTML = `
        <div class="empty-state">
          <h2>Literature Coming Soon</h2>
          <p>Future publications, commentary, and white papers will appear here.</p>
        </div>
      `;
      return;
    }

    literatureContainer.innerHTML = posts
      .map((post) => {
        function formatMonthYear(dateValue) {
  if (!dateValue) return "";

  const parsedDate = new Date(dateValue);

  if (!isNaN(parsedDate)) {
    return parsedDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    });
  }

  return dateValue;
}

const formattedDate = formatMonthYear(post.date);
        });

        return `
          <article class="literature-item">
            <span class="literature-date">${formattedDate}</span>

            <div class="literature-content">
              <h2>${post.title}</h2>
              <p>${post.preview}</p>

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