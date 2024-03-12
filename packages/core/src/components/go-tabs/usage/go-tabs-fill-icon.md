<go-tabs fill>
  <go-tab label="Icon tab" icon-position="before">
    <go-icon name="home" slot="icon"></go-icon>
    <p>
      You can use <code>slot="icon"</code> to add an icon to tab (by default, icon is placed before the label
      text)
    </p>
  </go-tab>
  <go-tab label="Icon tab" icon-position="after">
    <go-icon name="star" slot="icon-active"></go-icon>
    <p>
      <code>icon-position="after"</code> puts icon after the label, you can use <code>slot="icon-active"</code> to
      specify the icon that will be shown when the tab is active
    </p>
  </go-tab>
  <go-tab label="Third tab">
    <svg fill="currentColor" width="2rem" height="2rem" slot="icon" viewBox="0 0 500 500">
      <path
        d="M302.5 131.9c-29.3-28.1-69.1-45.3-112.9-45.3-90.3 0-163.4 73.1-163.4 163.4s73.2 163.4 163.4 163.4c43.8 0 83.6-17.2 112.9-45.3L184.1 250l118.4-118.1zm-171.2 24.6c0-20.8 16.9-37.7 37.7-37.7s37.7 16.9 37.7 37.7c0 20.8-16.9 37.7-37.7 37.7s-37.7-16.8-37.7-37.7z" />
      <path
        d="M141.3 156.5c.2-11.4 7-21.8 17.8-25.9 11.2-4.3 24.2-.7 31.7 8.7 15.5 19.5-2 49-26.6 44.6-13.3-2.4-22.7-14-22.9-27.4-.2-12.9-20.2-12.9-20 0 .4 20.3 12.8 38 31.9 45 18.4 6.7 40.3.6 52.5-14.6 12.4-15.4 14.6-37.2 4.5-54.5-10.3-17.6-30.8-26.3-50.6-22.7-22.3 4.1-37.9 24.6-38.3 46.7-.3 13 19.7 13 20 .1z" />
      <path
        d="M309.6 124.8c-42.2-40-102.1-56.7-158.9-43.8-48.1 10.9-90.4 43.3-113.7 86.7C12.8 212.6 9.4 267.8 28.8 315c19.1 46.3 57.1 82.5 104.4 99 53.1 18.5 114.6 9.1 159.6-24.8 5.8-4.4 11.4-9 16.7-14 3.9-3.7 3.7-10.4 0-14.1-34.5-34.6-69.1-69.1-103.8-103.6-4.9-4.8-9.7-9.7-14.6-14.5v14.1c34.6-34.5 69.2-69.1 103.8-103.6 4.9-4.8 9.7-9.7 14.6-14.5 9.1-9.1-5-23.2-14.1-14.1-34.6 34.5-69.2 69.1-103.8 103.6-4.9 4.8-9.7 9.7-14.6 14.5-3.8 3.8-3.8 10.3 0 14.1 34.6 34.5 69.2 69.1 103.8 103.6 4.9 4.8 9.7 9.7 14.6 14.5v-14.1c-37.1 35.1-90.2 50-140.1 38.5-43.1-9.9-80.2-38.4-101.1-77.3-21.5-39.9-23.6-88.2-6.8-130.2 16-40.2 50.4-72.7 91.2-86.9C186.5 88.5 240 96.7 281 126.6c5.1 3.7 9.9 7.9 14.5 12.3 9.3 8.9 23.5-5.2 14.1-14.1z" />
      <circle cx="290.7" cy="250" r="22.6" />
      <path
        d="M303.3 250c-.2 6.9-5.5 12.6-12.6 12.6-6.9 0-12.6-5.7-12.6-12.6 0-6.7 5.3-12.2 11.9-12.6 7.4-.4 13.1 5.5 13.3 12.6.4 12.8 20.4 12.9 20 0-.4-13.7-8.5-25.8-21.5-30.6-12.6-4.7-27.3-.8-35.9 9.5-8.8 10.5-10.4 25.7-3.4 37.6 7 12 20.7 17.8 34.2 15.5 15.5-2.6 26.1-16.7 26.6-32 .4-12.9-19.6-12.9-20 0z" />
      <circle cx="375.1" cy="250" r="22.6" />
      <path
        d="M387.7 250c-.2 6.9-5.5 12.6-12.6 12.6-6.9 0-12.6-5.7-12.6-12.6 0-6.7 5.3-12.2 11.9-12.6 7.3-.4 13.1 5.5 13.3 12.6.4 12.8 20.4 12.9 20 0-.4-13.7-8.5-25.8-21.5-30.6-12.6-4.7-27.3-.8-35.9 9.5-8.8 10.5-10.4 25.7-3.4 37.6 7 12 20.7 17.8 34.2 15.5 15.5-2.6 26.1-16.7 26.6-32 .4-12.9-19.6-12.9-20 0z" />
      <circle cx="457.7" cy="250" r="22.6" />
      <path
        d="M470.3 250c-.2 6.9-5.5 12.6-12.6 12.6-6.9 0-12.6-5.7-12.6-12.6 0-6.7 5.3-12.2 11.9-12.6 7.4-.4 13.1 5.5 13.3 12.6.4 12.8 20.4 12.9 20 0-.4-13.7-8.5-25.8-21.5-30.6-12.6-4.7-27.3-.8-35.9 9.5-8.8 10.5-10.4 25.7-3.4 37.6 7 12 20.7 17.8 34.2 15.5 15.5-2.6 26.1-16.7 26.6-32 .4-12.9-19.6-12.9-20 0z" />
    </svg>
    <svg fill="currentColor" width="2rem" height="2rem" slot="icon-active" viewBox="0 0 100 100">
      <path
        d="M38.917 34.167v-4.538a4.538 4.538 0 1 0 3.209 1.33l-3.209 3.208zM61.084 34.167v-4.538a4.538 4.538 0 1 0 3.209 1.33l-3.209 3.208z" />
      <path
        d="M50 8.25c-14.98 0-27.125 12.145-27.125 27.125v47.126a8.75 8.75 0 0 0 8.75 8.75c3.219 0 6.021-1.744 7.538-4.334h.01c.363-.503.951-.834 1.619-.834s1.256.331 1.619.834h.01c1.518 2.59 4.319 4.334 7.538 4.334 3.218 0 6.021-1.744 7.537-4.334h.01c.363-.503.951-.834 1.619-.834s1.256.331 1.619.834h.011c1.517 2.59 4.319 4.334 7.537 4.334a8.75 8.75 0 0 0 8.75-8.75c0-3.523.083-47.126.083-47.126C77.125 20.395 64.98 8.25 50 8.25zM30.667 34.167a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-8.25 8.25 8.25 8.25 0 0 1-8.25-8.25zM50 56.667c-6.269 0-11.453-4.637-12.316-10.667h24.633C61.453 52.03 56.27 56.667 50 56.667zm11.084-14.25a8.25 8.25 0 1 1 0-16.5c4.557 0 8.249 3.694 8.249 8.25s-3.692 8.25-8.249 8.25z" />
    </svg>
    <p>You can use <code>slot="icon"</code> and <code>slot="icon-active"</code> together!</p>
  </go-tab>
</go-tabs>