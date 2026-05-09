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
          <p>The publication you are looking for could not be found.</p>
        </div>

        <a href="../literature.html" class="btn">Back to Literature</a>
      `;
      return;
    }

    document.title = `${post.title} | Literature`;

    postContainer.innerHTML = `
      <header class="research-header">

        ${post.date ? `<p class="research-date">${post.date}</p>` : ""}

        <h1>${post.title}</h1>

        ${
          post.authors && post.authors.length
            ? `
              <p class="research-meta">
                <strong>Authors:</strong> ${post.authors.join(", ")}
              </p>
            `
            : ""
        }

        ${
          post.affiliations && post.affiliations.length
            ? `
              <p class="research-meta">
                <strong>Affiliations:</strong> ${post.affiliations.join(", ")}
              </p>
            `
            : ""
        }

      </header>

      ${
        post.image
          ? `
            <img 
              src="${post.image}" 
              alt="${post.title}" 
              class="post-hero-image research-image"
            >
          `
          : ""
      }

      ${
        post.introduction
          ? `
            <section class="research-section">
              <h2>Introduction</h2>
              <p>${post.introduction}</p>
            </section>
          `
          : ""
      }

      ${
        post.abstract
          ? `
            <section class="research-section">
              <h2>Abstract</h2>
              <p>${post.abstract}</p>
            </section>
          `
          : ""
      }

      <section class="research-details">

        ${
          post.tools && post.tools.length
            ? `
              <div class="research-detail-row">
                <h3>Tools</h3>

                <div class="research-tags">
                  ${post.tools.map((tool) => `<span>${tool}</span>`).join("")}
                </div>
              </div>
            `
            : ""
        }

        ${
          post.status && post.status.length
            ? `
              <div class="research-detail-row">
                <h3>Status</h3>

                <ul>
                  ${post.status.map((item) => `<li>${item}</li>`).join("")}
                </ul>
              </div>
            `
            : ""
        }

      </section>

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