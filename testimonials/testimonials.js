const testimonialsContainer = document.getElementById("testimonials-list");

fetch("data/testimonials.json")
  .then((response) => response.json())

  .then((data) => {
    const testimonials = data.testimonials || [];

    if (testimonials.length === 0) {
      testimonialsContainer.innerHTML = `
        <p>No testimonials available yet.</p>
      `;
      return;
    }

    testimonialsContainer.innerHTML = testimonials
      .map((item) => {
        return `
          <details class="testimonial-item">

            <summary>
              <span>${item.name}</span>
              <span>+</span>
            </summary>

            <div class="testimonial-content">

              ${
                item.role
                  ? `
                    <p class="testimonial-role">
                      ${item.role}
                    </p>
                  `
                  : ""
              }

              ${
                item.highlight
                  ? `
                    <p class="testimonial-highlight">
                      "${item.highlight}"
                    </p>
                  `
                  : ""
              }

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

  .catch((error) => {
    console.error(error);

    testimonialsContainer.innerHTML = `
      <p>Unable to load testimonials.</p>
    `;
  });