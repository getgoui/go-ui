<go-tabs fill>
  <go-tab label="First tab" icon-position="before">
    <go-icon name="home" slot="icon"></go-icon>
    <p>Tab 1 content</p>
  </go-tab>
  <go-tab label="Second tab" icon-position="after">
    <go-icon name="star" slot="icon"></go-icon>
    <p>
      Lorem ipsum dolor, sit <a href="#">lorem, ipsum</a> amet consectetur adipisicing elit. Repellendus, esse
      laboriosam tempore vel, deserunt nulla, corporis eaque dolore ad laudantium animi minima reprehenderit
      aliquam voluptate minus dolorem nobis fugiat molestiae.
    </p>
  </go-tab>
  <go-tab label="Third tab">
    <svg slot="icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g><circle cx="60" cy="50" r="4" fill="currentColor"><animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.67s"/><animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.67s"/></circle><circle cx="60" cy="50" r="4" fill="currentColor"><animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.33s"/><animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.33s"/></circle><circle cx="60" cy="50" r="4" fill="currentColor"><animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="0s"/><animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="0s"/></circle></g><g transform="translate(-15 0)"><path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="currentColor" transform="rotate(90 50 50)"/><path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="currentColor"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1"/></path><path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="currentColor"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1"/></path></g></svg>
    <!-- TODO: allow icon-active slot -->
    <go-icon name="star" slot="icon-active"></go-icon>
    <p>Tab 3 content</p>
  </go-tab>
</go-tabs>
