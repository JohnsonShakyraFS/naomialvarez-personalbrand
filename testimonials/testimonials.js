const testimonialsContainer = document.getElementById("testimonials-list");

fetch("data/testimonials.json")
  .then((response) => response.json())

  .then((data) => {
    const testimonials = data.testimonials || [];

    /* ================================
       EMPTY STATE
    ================================= */

    if (testimonials.length === 0) {
      testimonialsContainer.innerHTML = `
        <p>No testimonials available yet.</p>
      `;
      return;
    }

    /* ================================
       RENDER TESTIMONIALS
    ================================= */

    testimonialsContainer.innerHTML = testimonials
      .map((item) => {
        return `
          <details class="testimonial-item">

            <!-- ACCORDION HEADER -->

            <summary>

              <span class="testimonial-summary-text">

                <!-- NAME -->

                <strong>
                  ${item.name || ""}
                </strong>

                <!-- UNDERLINED PREVIEW QUOTE -->

                ${
                  item.highlight
                    ? `
                      <em>
                        ${item.highlight}
                      </em>
                    `
                    : ""
                }

              </span>

              <!-- TOGGLE -->

              <span class="testimonial-toggle">
                +
              </span>

            </summary>

            <!-- DROPDOWN CONTENT -->

            <div class="testimonial-content">

              <!-- ROLE -->

              ${
                item.role
                  ? `
                    <p class="testimonial-role">
                      ${item.role}
                    </p>
                  `
                  : ""
              }

              <!-- FULL TESTIMONIAL -->

              ${
                item.content
                  ? `
                    <blockquote>
                      ${item.content}
                    </blockquote>
                  `
                  : ""
              }

            </div>

          </details>
        `;
      })

      .join("");
  })

  /* ================================
     ERROR STATE
  ================================= */

  .catch((error) => {
    console.error(error);

    testimonialsContainer.innerHTML = `
      <p>Unable to load testimonials.</p>
    `;
  });