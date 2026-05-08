const engagementsContainer = document.getElementById("engagements-list");

fetch("data/engagements.json")
  .then((response) => response.json())
  .then((data) => {
    const engagementGroups = data.engagements || [];

    // EMPTY STATE
    if (engagementGroups.length === 0) {
      engagementsContainer.innerHTML = `
        <div class="empty-state">
          <h2>Recent Engagements Coming Soon</h2>
          <p>
            Volunteer work, speaking engagements, academic collaborations,
            and advisory work will appear here.
          </p>
        </div>
      `;
      return;
    }

    // RENDER ENGAGEMENT GROUPS
    engagementsContainer.innerHTML = engagementGroups
      .map((group) => {
        const groupTitle =
          group.quarter || group.month || "Engagements";

        const items = group.items || [];

        return `
          <details class="engagement-month">

            <!-- ACCORDION HEADER -->
            <summary>
              <span>${groupTitle}</span>
              <span>+</span>
            </summary>

            <!-- TIMELINE CONTENT -->
            <div class="engagement-content">

              ${
                items.length > 0
                  ? items
                      .map((item) => {
                        return `
                          <div class="engagement-entry">

                            <!-- CATEGORY -->
                            ${
                              item.category
                                ? `
                                  <p class="engagement-category">
                                    ${item.category}
                                  </p>
                                `
                                : ""
                            }

                            <!-- TITLE -->
                            <h3>
                              ${item.title || ""}
                            </h3>

                            <!-- META INFO -->
                            <div class="engagement-meta">

                              ${
                                item.role
                                  ? `
                                    <span class="engagement-role">
                                      ${item.role}
                                    </span>
                                  `
                                  : ""
                              }

                              ${
                                item.date
                                  ? `
                                    <span>
                                      ${item.date}
                                    </span>
                                  `
                                  : ""
                              }

                              ${
                                item.location
                                  ? `
                                    <span>
                                      ${item.location}
                                    </span>
                                  `
                                  : ""
                              }

                            </div>

                          </div>
                        `;
                      })
                      .join("")
                  : `
                      <p>No engagements listed for this section.</p>
                    `
              }

            </div>

          </details>
        `;
      })
      .join("");
  })

  // ERROR STATE
  .catch((error) => {
    engagementsContainer.innerHTML = `
      <p>Unable to load engagements.</p>
    `;

    console.error(error);
  });