const postContainer = document.getElementById("post-container");

const params = new URLSearchParams(window.location.search);
const slug = params.get("post");

fetch("../data/posts.json")
  .then((response) => response.json())

  .then((data) => {
    console.log(data);

    const posts = data.posts || [];

    const post = posts.find((item) => item.slug === slug);

    // ================================
    // POST NOT FOUND
    // ================================
    if (!post) {
      postContainer.innerHTML = `
        <div class="page-title">
          <h1>Post Not Found</h1>

          <p>
            The publication you are looking for could not be found.
          </p>
        </div>

        <a href="../literature.html" class="btn">
          Back to Literature
        </a>
      `;

      return;
    }

    // ================================
    // PAGE TITLE
    // ================================
    document.title = `${post.title} | Literature`;

    // ================================
    // RENDER POST
    // ================================
    postContainer.innerHTML = `

      <!-- ================================
           RESEARCH HEADER
      ================================= -->
      <header class="research-header">

        ${
          post.date
            ? `
              <p class="research-date">
                ${post.date}
              </p>
            `
            : ""
        }

        <h1>${post.title}</h1>

        ${
          post.authors
            ? `
              <p class="research-meta">
                <strong>Authors:</strong>

                ${
                  Array.isArray(post.authors)
                    ? post.authors.join(", ")
                    : post.authors
                }
              </p>
            `
            : ""
        }

        ${
          post.affiliations
            ? `
              <p class="research-meta">
                <strong>Affiliations:</strong>

                ${
                  Array.isArray(post.affiliations)
                    ? post.affiliations.join(", ")
                    : post.affiliations
                }
              </p>
            `
            : ""
        }

      </header>

      <!-- ================================
           FEATURED IMAGE
      ================================= -->
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

      <!-- ================================
           INTRODUCTION
      ================================= -->
      ${
        post.introduction
          ? `
            <section class="research-section">

              <h2>Introduction</h2>

              <p>
                ${post.introduction}
              </p>

            </section>
          `
          : ""
      }

      <!-- ================================
           ABSTRACT
      ================================= -->
      ${
        post.abstract
          ? `
            <section class="research-section">

              <h2>Abstract</h2>

              <p>
                ${post.abstract}
              </p>

            </section>
          `
          : ""
      }

      <!-- ================================
           RESEARCH DETAILS
      ================================= -->
      <section class="research-details">

        <!-- TOOLS -->
        ${
          post.tools
            ? `
              <div class="research-detail-row">

                <h3>Tools</h3>

                <div class="research-tags">

                  ${
                    Array.isArray(post.tools)
                      ? post.tools
                          .map((tool) => `<span>${tool}</span>`)
                          .join("")
                      : `<span>${post.tools}</span>`
                  }

                </div>

              </div>
            `
            : ""
        }

        <!-- STATUS -->
        ${
          post.status
            ? `
              <div class="research-detail-row">

                <h3>Status</h3>

                <ul>

                  ${
                    Array.isArray(post.status)
                      ? post.status
                          .map((item) => `<li>${item}</li>`)
                          .join("")
                      : `<li>${post.status}</li>`
                  }

                </ul>

              </div>
            `
            : ""
        }

      </section>

      <!-- ================================
           BACK LINK
      ================================= -->
      <a href="../literature.html" class="text-link">
        ← Back to Literature
      </a>

    `;
  })

  // ================================
  // ERROR STATE
  // ================================
  .catch((error) => {
    console.error(error);

    postContainer.innerHTML = `
      <div class="page-title">

        <h1>Error Loading Post</h1>

        <p>
          Please try again later.
        </p>

      </div>
    `;
  });