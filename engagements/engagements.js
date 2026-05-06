const engagementsContainer = document.getElementById("engagements-list");

fetch("data/engagements.json")
  .then((response) => response.json())
  .then((data) => {
    const engagementMonths = data.engagements || [];

    if (engagementMonths.length === 0) {
      engagementsContainer.innerHTML = `
        <div class="empty-state">
          <h2>Recent Engagements Coming Soon</h2>
          <p>Volunteer work, events, and speaking engagements will appear here.</p>
        </div>
      `;
      return;
    }

    engagementsContainer.innerHTML = engagementMonths
      .map((monthGroup, index) => {
        const items = monthGroup.items || [];

        return `
          <details class="engagement-month" ${index === 0 ? "open" : ""}>
            <summary>
              <span>${monthGroup.month}</span>
              <span>+</span>
            </summary>

            <div class="engagement-content">
              ${
                items.length > 0
                  ? items
                      .map((item) => {
                        return `
                          <div class="engagement-entry">
                            <p class="engagement-type">${item.type || ""}</p>
                            <h3>${item.title || ""}</h3>
                            ${
                              item.organization
                                ? `<p>${item.organization}</p>`
                                : ""
                            }
                            ${item.date ? `<small>${item.date}</small>` : ""}
                            ${
                              item.description
                                ? `<p>${item.description}</p>`
                                : ""
                            }
                          </div>
                        `;
                      })
                      .join("")
                  : `<p>No engagements listed for this month.</p>`
              }
            </div>
          </details>
        `;
      })
      .join("");
  })
  .catch((error) => {
    engagementsContainer.innerHTML = `
      <p>Unable to load engagements.</p>
    `;
    console.error(error);
  });