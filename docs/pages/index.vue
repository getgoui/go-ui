<template>
  <main class="page-home">
    <ClientOnly>
      <!-- hero -->
      <div class="container">
        <div class="hero">
          <img class="hero__logo" src="~/assets/img/logo.svg" alt="Go UI logo" />
          <div class="hero__text">
            <h1 class="hero__title">{{ siteConfig.name }}</h1>
            <div class="hero__subtitle text-size-1">{{ siteConfig.tagline }}</div>
            <p>
              Go UI provides a toolkit for teams to build beautiful web applications that are responsive, adaptive and
              accessible.
            </p>
            <div class="mt-4">
              <GoCenter>
                <GoButtonGroup block="mobile">
                  <NuxtLink custom to="/guides/getting-started" v-slot="{ href, navigate }">
                    <GoButton variant="primary" :href="href" @click="navigate">
                      <span> Get started </span>
                      <GoIcon slot="suffix" icon-set="bx" size="1.5rem" name="right-arrow-alt"></GoIcon>
                    </GoButton>
                  </NuxtLink>
                  <GoButton v-bind="repoLinkProps" variant="secondary" outline-fill>
                    <GoIcon slot="prefix" size="1.5rem" icon-set="bxl" name="github"></GoIcon>
                    Github
                  </GoButton>
                </GoButtonGroup>
              </GoCenter>
            </div>
          </div>
        </div>
      </div>

      <!-- features -->
      <section class="features" v-if="featureList?.length">
        <div class="container">
          <div
            v-for="({ title, description, img, link, linkText }, i) in featureList"
            :key="i"
            :class="{ 'feature': true, 'feature-alt': i % 2 == 0 }">
            <div class="feature__img" v-if="img">
              <img :src="img" :alt="title + ' illustration'" loading="lazy" />
            </div>
            <div class="feature__text">
              <h2>{{ title }}</h2>
              <p>{{ description }}</p>
              <br />
              <NuxtLink custom :to="link" v-slot="{ href, navigate }">
                <GoLink v-if="link" :href="href" @click.prevent="navigate">{{ linkText }}</GoLink>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
      <!-- {/* call to action */} -->
    </ClientOnly>
  </main>
</template>

<script lang="ts" setup>
import { GoButton, GoLink, GoIcon, GoButtonGroup, GoCenter } from '@go-ui/vue';
const repoLinkProps = {
  target: '_blank',
  href: siteConfig.repoLink.url,
  rel: 'noopener noreferrer nofollow',
};

const featureList = [
  {
    title: 'Framework agnostic',
    description: `Have multiple front-end stack in your organisation and need a consistent look and feel? Go UI utilise modern browser features such as Web Components and CSS custom properties so that they can be used in any front-end tech stack.`,
    img: '/img/hero/dev.png',
    link: '/guides/web-components',
    linkText: 'See framework integration',
  },
  {
    title: 'Pattern first',
    description: `Teams spend a lot of time on enhancing the end user experience. We encapsulate many of the common web design patterns and make them easy to use. Allowing both design and development teams to focus on delivering the product.`,
    img: '/img/hero/patterns.png',
    link: '/docs/patterns',
    linkText: 'See our patterns',
  },
  {
    title: 'Accessibility focused',
    description: `We make sure that our components are accessible and easy to use. We reference the best practice guidelines wherever possible. Our patterns and components go through automated accessibility testing to ensure they meet the WCAG 2.1 AA standard.`,
    img: '/img/hero/a11y.png',
  },
  {
    title: 'Adaptive',
    description: `Go UI makes it easy for developers to build adaptive web applications, this means out-of-the-box, your application support dark mode and reduced motion preferences from the user's operating system.`,
    img: '/img/hero/adaptive.png',
  },
];
</script>
<style lang="scss">
.page-home {
  .hero {
    flex-direction: column;
    text-align: center;
    background: transparent;
    padding: 1rem;
    @include tablet {
      padding: 2rem 4rem;
    }
    @include desktop {
      padding: 4rem 8rem;
    }
    pre code.hljs {
      padding: 1.5rem;
    }
    .hero__logo {
      width: 12rem;
    }
    .hero__title {
      margin-top: 1rem;
      font-size: 4rem;
    }
    .hero__text {
      width: 100%;
    }
    .Typewriter {
      font-style: italic;
      display: inline-block;
      color: var(--ifm-color-success-light);
      margin-left: 0.5ch;
    }
  }

  .features {
    width: 100%;

    .feature {
      padding: 4rem 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;

      @include tablet {
        padding: 2rem 4rem;
      }

      @include desktop {
        flex-direction: row;
      }
      &.feature-alt {
        @include desktop {
          flex-direction: row-reverse;
        }
      }
      .feature__img {
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
